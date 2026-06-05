import React, { useState } from "react";

export default function EmotionBotScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const activities = ["Coloring", "Exercise", "Storytime", "Music", "Breathing"];

  const handleSend = () => {
    if (!inputText) return;
    setMessages([...messages, { type: "user", text: inputText }]);
    setInputText("");
    // Mock bot response
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text: "Great! Let's do this activity!" }]);
    }, 500);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url("/bot_background.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ color: "white", textAlign: "center" }}>Emotion Bot</h2>

      {/* Activities Buttons */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px", justifyContent: "center" }}>
        {activities.map((act) => (
          <button
            key={act}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(90deg, #800080, #1e3a8a, #ffdd00)",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => setMessages([...messages, { type: "bot", text: `Start ${act} activity!` }])}
          >
            {act}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          backgroundColor: "rgba(0,0,0,0.3)",
          padding: "10px",
          borderRadius: "10px",
          color: "white",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: "5px 0", textAlign: msg.type === "user" ? "right" : "left" }}>
            <span style={{ background: msg.type === "user" ? "#1e90ff" : "#800080", padding: "5px 10px", borderRadius: "10px" }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Text Input */}
      <div style={{ display: "flex", marginTop: "10px", gap: "10px" }}>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "none" }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(90deg, #800080, #1e3a8a, #ffdd00)",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
