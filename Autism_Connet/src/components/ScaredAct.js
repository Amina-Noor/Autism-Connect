import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { useLocation, useNavigate } from "react-router-dom";

export default function ScaredAct() {
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
    u.rate = 0.9; // slower, calming voice
    synth.speak(u);
  };

  useEffect(() => {
    const message =
      "It’s okay to feel scared sometimes. Let’s do some gentle and fun activities to feel brave and safe.";
    setBotText(message);
    speak(message);

    // 🎵 play scared background music
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
      title: "Teddy Hug 🧸",
      desc:
        "Pick up your favorite teddy and give it a big hug. Feel safe and warm… you are brave!",
      img: "/scared1.png",
    },
    {
      title: "Peek-a-Boo 👀",
      desc:
        "Play peek-a-boo with a blanket or your hands. Hide… and then show! Scary feelings go away slowly.",
      img: "/scared2.png",
    },
    {
      title: "Shadow Play 🌙",
      desc:
        "Make gentle shadow shapes on the wall with your hands. Watch them dance… it’s fun and magical.",
      img: "/scared3.png",
    },
  ];

  const runActivity = (act) => {
    setBotText(act.desc);
    speak(act.desc);

    // Gentle confetti animation
    setConfetti(true);
    setTimeout(() => setConfetti(false), 8000);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url("/bgscared.jpg")`,
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
      <audio ref={bgAudioRef} src="/scared.mp3" loop />

      {confetti && (
        <Confetti numberOfPieces={200} recycle={false} gravity={0.2} />
      )}

      {/* Speak Button */}
      <button
        onClick={() => speak(botText)}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          background: "#1976d2",
          padding: "10px 18px",
          borderRadius: "20px",
          border: "none",
          color: "#fff",
          fontFamily: "'Comic Sans MS'",
          fontSize: "18px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
        }}
      >
        🔊 Speak
      </button>

      {/* Back Button */}
      <button
        onClick={() => {
          if (bgAudioRef.current) {
            bgAudioRef.current.pause();
            bgAudioRef.current.currentTime = 0;
          }
          navigate(-1);
        }}
        style={{
          alignSelf: "flex-start",
          background: "#42a5f5",
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
          fontSize: "38px",
          color: "#1565c0",
        }}
      >
        Scared Activities
      </h1>

      <h2
        style={{
          marginTop: "2px",
          fontFamily: "'Comic Sans MS'",
          fontSize: "22px",
          color: "#64b5f6",
        }}
      >
        You are safe and brave 💙
      </h2>

      {/* Activities */}
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
              background: "rgba(227,242,253,0.95)",
              padding: "15px",
              borderRadius: "20px",
              cursor: "pointer",
              width: "220px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
              fontFamily: "'Comic Sans MS'",
              transition: "0.2s",
              textAlign: "center",
              border: "2px solid #90caf9",
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
            <b style={{ color: "#0d47a1", fontSize: "19px" }}>{act.title}</b>
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
          background: "rgba(227,242,253,0.97)",
          border: "2px solid #90caf9",
          borderRadius: "20px",
          fontWeight: "bold",
          fontSize: "17px",
          maxWidth: "85%",
          textAlign: "center",
          fontFamily: "'Comic Sans MS'",
          color: "#0d47a1",
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
        }}
      >
        {botText}
      </div>
    </div>
  );
}
