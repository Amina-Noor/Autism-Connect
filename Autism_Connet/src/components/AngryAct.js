// src/components/AngryAct.js
import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { useLocation, useNavigate } from "react-router-dom";

export default function AngryAct() {
  const emotion = new URLSearchParams(useLocation().search).get("emotion");
  const navigate = useNavigate();
  const [botText, setBotText] = useState("");
  const [confetti, setConfetti] = useState(false);

  // 🔊 background sound ref
  const bgAudioRef = useRef(null);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    synth.speak(u);
  };

  useEffect(() => {
    const message =
      "It's okay to feel angry! Let's try fun calming activities together.";
    setBotText(message);
    speak(message);

    // 🎵 play angry background music
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = 0.3;
      bgAudioRef.current.play().catch(() => {});
    }

    // cleanup on exit
    return () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  const activities = [
    {
      title: "Blow the Angry Clouds Away 🌬️",
      desc: "Take a deep breath... now blow the clouds away!",
      img: "/angry1.png",
    },
    {
      title: "Hug the Soft Pillow 🤗",
      desc: "Pretend you’re hugging a soft pillow. Squeeze… squeeze… good job!",
      img: "/angry2.png",
    },
    {
      title: "Shake the Anger Out 🎶",
      desc: "Shake your hands like rockets! Shake-shake-shake!",
      img: "/angry3.png",
    },
  ];

  const runActivity = (act) => {
    setBotText(act.desc);
    speak(act.desc);

    setConfetti(true);
    setTimeout(() => setConfetti(false), 10000);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url("/bg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 🎵 Background Audio */}
      <audio ref={bgAudioRef} src="/sounds/anger.mp3" loop />

      {confetti && <Confetti numberOfPieces={300} recycle={false} />}

      {/* Speak Button */}
      <button
        onClick={() => speak(botText)}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          background: "#ff66b3",
          padding: "10px 18px",
          borderRadius: "20px",
          border: "none",
          color: "white",
          fontFamily: "'Comic Sans MS'",
          fontSize: "18px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        🔊 Speak
      </button>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          alignSelf: "flex-start",
          background: "#ff88c2",
          border: "none",
          padding: "10px 18px",
          borderRadius: "15px",
          color: "white",
          fontFamily: "'Comic Sans MS'",
          fontSize: "18px",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        ← Back
      </button>

      <h1
        style={{
          marginTop: "5px",
          fontFamily: "'Comic Sans MS'",
          fontSize: "40px",
          color: "#d11d76",
        }}
      >
        Angry Activities
      </h1>

      <h2
        style={{
          marginTop: "2px",
          fontFamily: "'Comic Sans MS'",
          fontSize: "24px",
          color: "#ff4d94",
        }}
      >
        Let’s calm down together ❤️
      </h2>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "25px",
        }}
      >
        {activities.map((act, index) => (
          <div
            key={index}
            onClick={() => runActivity(act)}
            style={{
              background: "rgba(255,240,245,0.85)",
              padding: "15px",
              borderRadius: "20px",
              cursor: "pointer",
              width: "220px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              fontFamily: "'Comic Sans MS'",
              transition: "0.2s",
              textAlign: "center",
              border: "2px solid #ff99cc",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img
              src={act.img}
              alt={act.title}
              style={{
                width: "100%",
                borderRadius: "15px",
                marginBottom: "10px",
              }}
            />
            <b style={{ color: "#c2185b", fontSize: "20px" }}>
              {act.title}
            </b>
          </div>
        ))}
      </div>

      {/* Bottom Bot Message */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "15px 20px",
          background: "rgba(255,240,245,0.95)",
          border: "2px solid #ff8ac6",
          borderRadius: "20px",
          fontWeight: "bold",
          fontSize: "18px",
          maxWidth: "85%",
          textAlign: "center",
          fontFamily: "'Comic Sans MS'",
          color: "#c2185b",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        {botText}
      </div>
    </div>
  );
}
