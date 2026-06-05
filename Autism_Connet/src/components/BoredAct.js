import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { useLocation, useNavigate } from "react-router-dom";

export default function BoredAct() {
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
    u.rate = 1; // normal playful voice
    synth.speak(u);
  };

  useEffect(() => {
    const message =
      "Feeling bored? Let’s have some fun and play exciting little games together!";
    setBotText(message);
    speak(message);

    // 🎵 play bored background music
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
      title: "Spin Around 🌪️",
      desc: "Spin slowly in a circle… then stop! Feel dizzy and giggly! Fun, right?",
      img: "/bored1.png",
    },
    {
      title: "Clap Your Hands 👏",
      desc: "Clap your hands fast… then slow… keep the rhythm going! Great job!",
      img: "/bored2.png",
    },
    {
      title: "Doodle Time ✏️",
      desc: "Grab paper and crayons! Draw shapes, smiley faces… be creative!",
      img: "/bored3.png",
    },
  ];

  const runActivity = (act) => {
    setBotText(act.desc);
    speak(act.desc);

    // Playful confetti
    setConfetti(true);
    setTimeout(() => setConfetti(false), 8000);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url("/boredbg.jpg")`,
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
      <audio ref={bgAudioRef} src="/sounds/bored.mp3" loop />

      {confetti && <Confetti numberOfPieces={250} recycle={false} />}

      {/* Speak Button */}
      <button
        onClick={() => speak(botText)}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          background: "#fbc02d",
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
          background: "#ffeb3b",
          border: "none",
          padding: "10px 18px",
          borderRadius: "15px",
          color: "#000",
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
          color: "#f9a825",
        }}
      >
        Bored Activities
      </h1>

      <h2
        style={{
          marginTop: "2px",
          fontFamily: "'Comic Sans MS'",
          fontSize: "22px",
          color: "#fdd835",
        }}
      >
        Let’s have some fun together! 💛
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
              background: "rgba(255,249,196,0.95)",
              padding: "15px",
              borderRadius: "20px",
              cursor: "pointer",
              width: "220px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
              fontFamily: "'Comic Sans MS'",
              transition: "0.2s",
              textAlign: "center",
              border: "2px solid #fff176",
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
            <b style={{ color: "#f57f17", fontSize: "19px" }}>{act.title}</b>
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
          background: "rgba(255,249,196,0.97)",
          border: "2px solid #fff176",
          borderRadius: "20px",
          fontWeight: "bold",
          fontSize: "17px",
          maxWidth: "85%",
          textAlign: "center",
          fontFamily: "'Comic Sans MS'",
          color: "#f57f17",
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
        }}
      >
        {botText}
      </div>
    </div>
  );
}
