import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import ParentInfo from "./ParentInfo";
import { getCaretakerResponse } from "./CaretakerResponses";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Calming cards
const calmingCards = [
  { title: "Breathe 🌬️", text: "Breathe in slowly… breathe out gently." },
  { title: "Grounding 🌿", text: "Notice 3 things you can see around you." },
  { title: "Stretch 🤸", text: "Stretch your arms slowly." },
];

// Emotion UI for 10 emotions
const emotionUI = {
  joy: { bg: "#fef9c3", emoji: "😊", sound: "/sounds/happy.mp3", avatar: "/avatars/joy.jpg" },
  excitement: { bg: "#fff7d6", emoji: "🤩", sound: "/sounds/excitement.mp3", avatar: "/avatars/excitement.jpg" },
  shy: { bg: "#fff9e5", emoji: "😌", sound: "/sounds/shy.mp3", avatar: "/avatars/shy.jpg" },
  bliss: { bg: "#fffde7", emoji: "🥰", sound: "/sounds/bliss.mp3", avatar: "/avatars/bliss.jpg" },
  sadness: { bg: "#e0f2fe", emoji: "🌧️", sound: "/sounds/sad.mp3", avatar: "/avatars/sad.jpg" },
  loneliness: { bg: "#ccfbf1", emoji: "😔", sound: "/sounds/sad.mp3", avatar: "/avatars/lonely.jpg" },
  disappointment: { bg: "#fce7f3", emoji: "😞", sound: "/sounds/disappointed.mp3", avatar: "/avatars/disappointment.jpg" },
  frustration: { bg: "#ffe4e6", emoji: "😤", sound: "/sounds/anger.mp3", avatar: "/avatars/frustration.png" },
  anxiety: { bg: "#ede9fe", emoji: "😨", sound: "/sounds/disappointed.mp3", avatar: "/avatars/anxiety.png" },
  fear: { bg: "#e9d5ff", emoji: "😱", sound: "/sounds/fear.mp3", avatar: "/avatars/fear.jpg" },
  anger: { bg: "#fee2e2", emoji: "🔥", sound: "/sounds/anger.mp3", avatar: "/avatars/anger.jpg" },
  confusion: { bg: "#f3f4f6", emoji: "😕", sound: "/sounds/confused.mp3", avatar: "/avatars/confusion.jpg" },
  sleepy: { bg: "#f0f5f9", emoji: "😪", sound: "/sounds/sleepy.mp3", avatar: "/avatars/sleepy.jpg" },
  tired: { bg: "#fdf6f0", emoji: "🥱", sound: "/sounds/sleepy.mp3", avatar: "/avatars/tired.jpg" },
  boredom: { bg: "#f0f0f0", emoji: "😐", sound: "/sounds/bored.mp3", avatar: "/avatars/bored.jpg" },
  joyless: { bg: "#f5f5f5", emoji: "😶", sound: "/sounds/light_music.crdownload", avatar: "/avatars/joyless.jpg" },
  pride: { bg: "#fff0f6", emoji: "😎", sound: "/sounds/shy.mp3", avatar: "/avatars/pride.jpg" },
  hope: { bg: "#e0ffe0", emoji: "🌱", sound: "/sounds/hope.mp3", avatar: "/avatars/hope.jpg" },
  love: { bg: "#ffe0f0", emoji: "❤️", sound: "/sounds/love.mp3", avatar: "/avatars/love.png" },
  relief: { bg: "#e0fff7", emoji: "😌", sound: "/sounds/hope.mp3", avatar: "/avatars/relief.jpg" },
  default: { bg: "#f0f8ff", emoji: "💬", sound: null, avatar: "/avatars/default.jpg" },
};
export default function EmotionBot10_15({ age = 10, autismMode = false }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [distressCount, setDistressCount] = useState(0);
  const [showCalming, setShowCalming] = useState(false);
  const [showParentAlert, setShowParentAlert] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [currentEmotion, setCurrentEmotion] = useState("default");
  const [emotionStats, setEmotionStats] = useState({});
  const chatEndRef = useRef(null);

  const ui = emotionUI[currentEmotion] || emotionUI.default;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speak = (text) => {
    if (!text) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = autismMode ? 0.9 : 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const playSound = (src) => {
    if (!src) return;
    const audio = new Audio(src);
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const handleSend = async (textInput) => {
    const text = textInput?.trim();
    if (!text) return;

    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await getCaretakerResponse(text, messages, age);

      const botMsg = { sender: "bot", text: response.text, type: response.type };
      setMessages((prev) => [...prev, botMsg]);

      const emotion = response.detectedEmotion || "default";
      setCurrentEmotion(emotion);

      setEmotionStats((prev) => ({
        ...prev,
        [emotion]: (prev[emotion] || 0) + 1,
      }));

      if (["danger", "distress"].includes(response.type)) setShowCalming(true);
      else setShowCalming(!!calmingCards.length);

      speak(response.text);
      playSound(emotionUI[emotion]?.sound);
    } catch (err) {
      console.error("Error in CaretakerResponse:", err);
    } finally {
      setInput("");
    }
  };

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert("Voice input not supported in this browser");

    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setSpokenText("");
    };

    recognition.onresult = (event) => {
      const spoken = Array.from(event.results).map((r) => r[0].transcript).join("");
      setSpokenText(spoken);
      if (event.results[0].isFinal) handleSend(spoken);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.start();
  };

  const downloadCSV = () => {
    const rows = [["Emotion", "Count"]];
    Object.entries(emotionStats).forEach(([k, v]) => rows.push([k, v]));
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emotion-report.csv";
    a.click();
  };

  const chartData = {
    labels: Object.keys(emotionStats),
    datasets: [
      {
        label: "Emotions count",
        data: Object.values(emotionStats),
        backgroundColor: Object.keys(emotionStats).map((k) => emotionUI[k]?.bg || "#ccc"),
      },
    ],
  };

  return (
    <div style={{ padding: 20, height: "100vh", background: ui.bg, transition: "background 0.5s ease", fontFamily: "Arial, sans-serif", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>{ui.emoji} Caretaker Companion</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setShowParentAlert(true)} style={{ borderRadius: 20, padding: "6px 14px", background: "#f87171", color: "#fff", border: "none", cursor: "pointer" }}>Parent Info</button>
          <button onClick={downloadCSV} style={{ borderRadius: 20, padding: "6px 14px", background: "#4ade80", color: "#fff", border: "none", cursor: "pointer" }}>📥 CSV</button>
        </div>
      </div>

      {/* Chat */}
      <div style={{ height: "45vh", overflowY: "auto", background: "#fff", padding: 10, borderRadius: 12, margin: "10px 0" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === "user" ? "right" : "left", marginBottom: 5 }}>
            <span style={{ display: "inline-block", padding: 10, borderRadius: 12, background: m.sender === "user" ? "#dbeafe" : "#e9d5ff", maxWidth: "75%" }}>
              {m.text}
            </span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Avatar */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <img src={emotionUI[currentEmotion]?.avatar} alt="avatar" width={80} style={{ borderRadius: "50%" }} />
      </div>

      {/* Calming cards */}
      {showCalming && (
        <div style={{ display: "flex", gap: 10, marginBottom: 10, overflowX: "auto" }}>
          {calmingCards.map((c, i) => (
            <div key={i} style={{ minWidth: 140, padding: 10, borderRadius: 12, background: "#e0f7fa", cursor: "pointer" }} onClick={() => alert(`Try: ${c.text}`)}>
              <strong>{c.title}</strong>
              <p style={{ fontSize: 12 }}>{c.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Input + Mic */}
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <button onClick={startListening} style={{ borderRadius: 12, padding: "10px", background: "#4b0082", color: "#fff", border: "none" }}>🎤</button>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Talk to me...`} style={{ flex: 1, borderRadius: 12, padding: 10, border: "1px solid #ccc" }} />
        <button onClick={() => handleSend(input)} style={{ borderRadius: 12, padding: "10px", background: "#d63384", color: "#fff", border: "none" }}>Send</button>
      </div>

      {/* Parent Modal */}
      {showParentAlert && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ width: "95%", maxWidth: 1200, maxHeight: "90%", overflowY: "auto", background: "#fff", borderRadius: 15, padding: 30, position: "relative" }}>
            <button onClick={() => setShowParentAlert(false)} style={{ position: "absolute", top: 15, right: 15, background: "transparent", border: "none", fontSize: 24, cursor: "pointer", fontWeight: "bold" }}>×</button>
            <ParentInfo distressCount={distressCount} emotionStats={emotionStats} onDownload={downloadCSV} />
            <div style={{ marginTop: 20 }}>
              <h3>Daily Emotion Timeline 📅</h3>
              <Bar data={chartData} />
            </div>
          </div>
        </div>
      )}

      {/* Voice overlay */}
      {isListening && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(255,255,255,0.85)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ width: 120, height: 120, borderRadius: "50%", background: "#d63384", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 40, color: "#fff", marginBottom: 10 }}>🎤</div>
          <p>Listening… {spokenText}</p>
        </div>
      )}

      <div className={`party-pop ${currentEmotion === "joy" ? "show" : ""}`}></div>

      <style>{`
        .party-pop {
          position: fixed;
top: 0; left: 0; width: 100%; height: 100%;
pointer-events: none;
}
.party-pop.show::before {
content: '🎉';
font-size: 50px;
position: absolute;
animation: pop 1s ease-in-out infinite;
}
@keyframes pop {
0% {transform: translateY(0) rotate(0deg);}
50% {transform: translateY(-100px) rotate(180deg);}
100% {transform: translateY(0) rotate(360deg);}
}
`}</style>
</div>
);
}
