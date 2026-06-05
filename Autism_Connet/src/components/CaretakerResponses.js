import { predictEmotion } from "../services/emotionApi";

/* -----------------------------
   LOCAL KEYWORD MAP (fallback)
----------------------------- */
const localEmotions = {
  joy: ["happy", "excited", "yay", "fun", "cheerful"],
  sadness: ["sad", "unhappy", "down", "depressed", "tearful", "worst day"],
  anger: ["angry", "mad", "frustrated", "furious"],
  anxiety: ["anxious", "nervous", "worried", "scared"],
  loneliness: ["lonely", "alone", "isolated"],
  joyless: ["empty", "numb", "nothing feels good"],
  disgust: ["disgusted", "gross", "sick"],
  surprise: ["surprised", "shocked", "amazed"],
  fear: ["fearful", "terrified", "afraid"],
  calm: ["relaxed", "peaceful", "content"],
  default: []
};

/* -----------------------------
   🧠 AGENT MEMORY (persistent)
----------------------------- */
let emotionMemory = [];

function updateEmotionMemory(emotion) {
  emotionMemory.push(emotion);
  if (emotionMemory.length > 5) emotionMemory.shift();
}

function isDistressEscalating() {
  return emotionMemory.filter(e => e === "sadness").length >= 3;
}

/* -----------------------------
   🧠 REASONING AGENT
----------------------------- */
function reasonEmotion(text, apiEmotion, localEmotion) {
  const t = text.toLowerCase();

  // HARD OVERRIDES (agent authority)
  if (["unhappy", "sad", "down", "worst day", "depressed", "lonely"].some(w => t.includes(w))) {
    return "sadness";
  }

  if (["angry", "furious", "mad", "frustrated"].some(w => t.includes(w))) {
    return "anger";
  }

  // Prefer API > local > default
  return apiEmotion || localEmotion || "default";
}

/* -----------------------------
   🎯 DECISION AGENT
----------------------------- */
function decideType(emotion) {
  if (isDistressEscalating()) return "danger";
  if (emotion === "sadness" || emotion === "anger" || emotion === "fear") return "distress";
  return "normal";
}

/* -----------------------------
   🤖 MAIN CARETAKER AGENT
----------------------------- */
export async function getCaretakerResponse(message, history = [], age = 10) {
  const text = String(message || "").toLowerCase().trim();

  /* -------- Boundary / Refusal -------- */
  const refusalWords = ["no","stop","shut up","shutup","leave me","dont talk","don't talk","go away","i can't","i wont"];
  if (refusalWords.some(w => text.includes(w))) {
    return {
      type: "boundary",
      text: age <= 10
        ? "Okay. I’ll stay quiet. I’m here when you want."
        : "Alright. I’ll give you space. I’m here when you’re ready.",
      detectedEmotion: "default"
    };
  }

  /* -------- Self-harm Safety -------- */
  const selfHarmKeywords = ["kill myself","hurt myself","end my life","cut myself","i want to die","i dont want to live"];
  if (selfHarmKeywords.some(k => text.includes(k))) {
    return {
      type: "danger",
      text: "I’m really concerned about you. Please tell a trusted adult or call your local emergency number right now.",
      detectedEmotion: "default"
    };
  }

  /* -------- Local Emotion Detection -------- */
  const detectLocalEmotion = msg => {
    for (const [emotion, keys] of Object.entries(localEmotions)) {
      if (keys.some(k => msg.includes(k))) return emotion;
    }
    return "default";
  };

  const localEmotion = detectLocalEmotion(text);

  /* -------- API Emotion Detection -------- */
  let apiEmotion = null;
  try {
    const apiResult = await predictEmotion(text);
    if (apiResult?.emotions?.length) {
      apiEmotion = apiResult.emotions[0];
    }
  } catch (err) {
    console.warn("API failed, using agent reasoning only");
  }

  /* -------- 🧠 AGENT REASONING -------- */
  const currentEmotion = reasonEmotion(text, apiEmotion, localEmotion);

  updateEmotionMemory(currentEmotion);

  const type = decideType(currentEmotion);

  /* -------- RESPONSE SELECTION -------- */
  const usedPrompts = history.filter(h => h.sender === "bot").map(h => h.text);

  const responses = {
    joy: ["Yay! That’s wonderful!", "I’m so happy for you!", "That sounds exciting!"],
    sadness: [
      "I hear your sadness. I’m here with you.",
      "That sounds really hard. You don’t have to face it alone.",
      "I’m glad you told me. Your feelings matter."
    ],
    anger: [
      "I can hear how upset you are.",
      "It’s okay to feel angry. Let’s slow down together.",
      "That sounds frustrating. I’m here."
    ],
    anxiety: [
      "Take a slow breath with me.",
      "You’re safe right now. I’m here.",
      "It’s okay to feel nervous sometimes."
    ],
    loneliness: [
      "You’re not alone.",
      "I’m right here with you.",
      "I’m really glad you shared that."
    ],
    joyless: [
      "Feeling numb can happen. We can sit with it together.",
      "You don’t have to feel happy right now.",
      "I’m here, even if things feel empty."
    ],
    fear: [
      "I hear your fear. You’re safe with me.",
      "That sounds scary, but you’re not alone.",
      "I’m here with you."
    ],
    calm: [
      "That sounds peaceful.",
      "I’m glad you’re feeling calm.",
      "Enjoy this quiet moment."
    ],
    default: [
      "I’m listening. Take your time.",
      "You can share as much as you like.",
      "I’m here with you."
    ]
  };

  const pickPrompt = options => {
    const fresh = options.filter(o => !usedPrompts.includes(o));
    return fresh.length
      ? fresh[Math.floor(Math.random() * fresh.length)]
      : options[Math.floor(Math.random() * options.length)];
  };

  return {
    type,
    text: pickPrompt(responses[currentEmotion] || responses.default),
    detectedEmotion: currentEmotion
  };
}
