import React, { useState } from "react";
import EmojiPicker from "./EmojiPicker";
import VoiceInput from "./VoiceInput";
import BotResponse from "./BotResponse";
import Reward from "./Reward";
import EmotionActivities from "./EmotionActivities";
import Confetti from "react-confetti";

// -------------------------
// Helper: bot speech
// -------------------------
function speakText(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel(); // stop any previous speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

// -------------------------
// Emotion Bot Screen
// -------------------------
export default function EmotionBotScreen() {
  const [botMessage, setBotMessage] = useState("");
  const [rewardMessage, setRewardMessage] = useState("");
  const [activityMessage, setActivityMessage] = useState("");
  const [emotion, setEmotion] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // -------------------------
  // Updated handleEmoji
  // -------------------------
  const handleEmoji = (emoji) => {
    setEmotion(emoji);

    let moodMessage = "";
    if (emoji === "😢") moodMessage = "I see you’re feeling sad 😢. Don’t worry! I have some fun activities to cheer you up.";
    else if (emoji === "😡") moodMessage = "I see you’re feeling angry 😡. Let’s calm down with some cool activities!";
    else if (emoji === "😨") moodMessage = "Feeling scared 😨? No problem, I have activities to make you feel brave!";
    else moodMessage = "You’re feeling happy 🙂! Let’s keep the fun going with some activities!";

    setBotMessage(moodMessage);
    speakText(moodMessage);

    setRewardMessage("Great job expressing yourself! 🎉");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // -------------------------
  // Updated handleVoice
  // -------------------------
  const handleVoice = (text) => {
    setEmotion(text);

    const lower = text.toLowerCase();
    let moodMessage = "";
    if (lower.includes("sad")) moodMessage = "I see you’re feeling sad 😢. Don’t worry! I have some fun activities to cheer you up.";
    else if (lower.includes("angry")) moodMessage = "I see you’re feeling angry 😡. Let’s calm down with some cool activities!";
    else if (lower.includes("scared") || lower.includes("nervous")) moodMessage = "Feeling scared 😨? No problem, I have activities to make you feel brave!";
    else moodMessage = "You’re feeling happy 🙂! Let’s keep the fun going with some activities!";

    setBotMessage(moodMessage);
    speakText(moodMessage);

    setRewardMessage("Thanks for sharing! 🌟");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // -------------------------
  // When activity clicked
  // -------------------------
  const handleActivity = (activity) => {
    setActivityMessage(activity.title);
    speakText(`Try this activity: ${activity.title}`);
  };

  return (
    <div style={{ fontFamily: "Comic Sans MS, sans-serif", textAlign: "center", padding: "30px" }}>
      <h1 style={{ fontSize: "2.5rem" }}>Kid Emotion Bot 🤖</h1>

      <EmojiPicker onSelectEmoji={handleEmoji} />
      <VoiceInput onResult={handleVoice} />

      <BotResponse message={botMessage} />

      {/* Activities based on emotion */}
      <EmotionActivities emotion={emotion} onOpenActivity={handleActivity} />

      <Reward message={rewardMessage} />

      {activityMessage && (
        <div style={{ marginTop: 12, fontSize: "1.2rem", color: "#555" }}>
          Try this activity: {activityMessage}
        </div>
      )}

      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
    </div>
  );
}
