// src/components/HappyAct.js 
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useLocation, useNavigate } from "react-router-dom";

export default function HappyAct() {
  const emotion = new URLSearchParams(useLocation().search).get("emotion");
  const navigate = useNavigate();
  const [botText, setBotText] = useState("");
  const [confetti, setConfetti] = useState(false);

  // 🔊 ADDED: Happy background sound
 const happyAudio = React.useRef(new Audio("/sounds/happy.mp3")).current;


  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    synth.speak(u);
  };

  useEffect(() => {
    const message =
      "Yay! You look happy today! Let’s do some super fun activities together!";
    setBotText(message);
    speak(message);

    // 🔊 ADDED: Play sound on enter
    happyAudio.loop = true;
   happyAudio.play().catch(() => {});

    // 🔊 ADDED: Stop sound on exit
    return () => {
      happyAudio.pause();
      happyAudio.currentTime = 0;
    };
  }, []);

  const activities = [
    {
      title: "Happy Clapping 👏",
      desc: "Clap your hands slowly… now faster! Yay! Great clapping!",
      img: "/happy1.png",
    },
    {
      title: "Jump with Joy 🐰",
      desc: "Jump up high like a happy bunny! Jump… jump… awesome!",
      img: "/happy2.png",
    },
    {
      title: "Big Smile Mirror 😊",
      desc: "Show me your biggest smile! Smile wide… you look amazing!",
      img: "/happy3.png",
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
        backgroundImage: `url("/bghappy.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {confetti && <Confetti numberOfPieces={350} recycle={false} />}

      <button
        onClick={() => speak(botText)}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          background: "#ffcc00",
          padding: "10px 18px",
          borderRadius: "20px",
          border: "none",
          color: "#fff",
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
        onClick={() => {
          happyAudio.pause();
          happyAudio.currentTime = 0;
          navigate(-1);
        }}
        style={{
          alignSelf: "flex-start",
          background: "#ffd966",
          border: "none",
          padding: "10px 18px",
          borderRadius: "15px",
          color: "#fff",
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
          color: "#ff9800",
        }}
      >
        Happy Activities
      </h1>

      <h2
        style={{
          marginTop: "2px",
          fontFamily: "'Comic Sans MS'",
          fontSize: "24px",
          color: "#ffb300",
        }}
      >
        Let’s enjoy together 💛
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
              background: "rgba(255,255,224,0.9)",
              padding: "15px",
              borderRadius: "20px",
              cursor: "pointer",
              width: "220px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              fontFamily: "'Comic Sans MS'",
              transition: "0.2s",
              textAlign: "center",
              border: "2px solid #ffcc80",
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
            <b style={{ color: "#f57c00", fontSize: "20px" }}>
              {act.title}
            </b>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "15px 20px",
          background: "rgba(255,255,224,0.95)",
          border: "2px solid #ffcc80",
          borderRadius: "20px",
          fontWeight: "bold",
          fontSize: "18px",
          maxWidth: "85%",
          textAlign: "center",
          fontFamily: "'Comic Sans MS'",
          color: "#f57c00",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        {botText}
      </div>
    </div>
  );
}
