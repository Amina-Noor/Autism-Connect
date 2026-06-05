import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { useLocation, useNavigate } from "react-router-dom";

export default function TiredAct() {
  const emotion = new URLSearchParams(useLocation().search).get("emotion");
  const navigate = useNavigate();
  const [botText, setBotText] = useState("");
  const [confetti, setConfetti] = useState(false);

  // 🔊 Background audio reference
  const bgAudioRef = useRef(null);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9; // slow calming voice
    synth.speak(u);
  };

  useEffect(() => {
    const message =
      "You look a little tired. Let’s do some gentle activities to relax and feel cozy.";
    setBotText(message);
    speak(message);

    // 🎵 Play background music
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = 0.3;
      bgAudioRef.current.play().catch(() => {});
    }

    // Stop sound on exit
    return () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  const activities = [
    {
      title: "Slow Stretch 🌿",
      desc:
        "Stretch your arms slowly up… now down. Take a deep breath… nice and calm.",
      img: "/tired1.png",
    },
    {
      title: "Cozy Blanket 🛌",
      desc:
        "Wrap yourself in a soft blanket and hug it gently. Feel warm and safe.",
      img: "/tired2.png",
    },
    {
      title: "Pretend Sleep 😴",
      desc:
        "Close your eyes and pretend to sleep. Take slow breaths… you are calm and relaxed.",
      img: "/tired3.png",
    },
  ];

  const runActivity = (act) => {
    setBotText(act.desc);
    speak(act.desc);

    // Soft confetti (gentle, like stars)
    setConfetti(true);
    setTimeout(() => setConfetti(false), 8000);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url("/tiredbg.jpg")`,
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
      <audio ref={bgAudioRef} src="/sounds/tired.mp3" loop />

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
          background: "#66bb6a",
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
          background: "#81c784",
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
          color: "#2e7d32",
        }}
      >
        Tired Activities
      </h1>

      <h2
        style={{
          marginTop: "2px",
          fontFamily: "'Comic Sans MS'",
          fontSize: "22px",
          color: "#a5d6a7",
        }}
      >
        Let’s relax and feel cozy 🌿
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
              background: "rgba(220,237,200,0.95)",
              padding: "15px",
              borderRadius: "20px",
              cursor: "pointer",
              width: "220px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
              fontFamily: "'Comic Sans MS'",
              transition: "0.2s",
              textAlign: "center",
              border: "2px solid #a5d6a7",
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
            <b style={{ color: "#388e3c", fontSize: "19px" }}>{act.title}</b>
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
          background: "rgba(220,237,200,0.97)",
          border: "2px solid #a5d6a7",
          borderRadius: "20px",
          fontWeight: "bold",
          fontSize: "17px",
          maxWidth: "85%",
          textAlign: "center",
          fontFamily: "'Comic Sans MS'",
          color: "#388e3c",
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
        }}
      >
        {botText}
      </div>
    </div>
  );
}
