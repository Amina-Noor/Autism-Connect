import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { useLocation, useNavigate } from "react-router-dom";

export default function ConfusedAct() {
  const emotion = new URLSearchParams(useLocation().search).get("emotion");
  const navigate = useNavigate();
  const [botText, setBotText] = useState("");
  const [confetti, setConfetti] = useState(false);

  const bgAudioRef = useRef(null);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.95;
    synth.speak(u);
  };

  useEffect(() => {
    const message =
      "Feeling a bit confused? Let’s do some fun activities to think and explore!";
    setBotText(message);
    speak(message);

    // Play background sound
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = 0.3;
      bgAudioRef.current.play().catch(() => {});
    }

    return () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  const activities = [
    {
      title: "Match the Shapes 🔷",
      desc:
        "Look at the shapes and try to find the matching ones. Can you match them all?",
      img: "/confused1.png",
    },
    {
      title: "Color Sorting 🎨",
      desc:
        "Sort the blocks by colors. Red with red, blue with blue… feel smart and calm!",
      img: "/confused2.png",
    },
    {
      title: "What Comes Next? 🔢",
      desc:
        "Look at the pattern and guess what comes next. Take your time… you can do it!",
      img: "/confused3.png",
    },
  ];

  const runActivity = (act) => {
    setBotText(act.desc);
    speak(act.desc);

    setConfetti(true);
    setTimeout(() => setConfetti(false), 8000);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url("/conbg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Audio */}
      <audio ref={bgAudioRef} src="/sounds/confused.mp3" loop />

      {confetti && <Confetti numberOfPieces={200} recycle={false} gravity={0.2} />}

      {/* Speak Button */}
      <button
        onClick={() => speak(botText)}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          background: "#b0bec5",
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
          background: "#90a4ae",
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
          color: "#607d8b",
        }}
      >
        Confused Activities
      </h1>

      <h2
        style={{
          marginTop: "2px",
          fontFamily: "'Comic Sans MS'",
          fontSize: "22px",
          color: "#b0bec5",
        }}
      >
        Let’s explore and have fun together 🤔
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
              background: "rgba(224,224,224,0.95)",
              padding: "15px",
              borderRadius: "20px",
              cursor: "pointer",
              width: "220px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
              fontFamily: "'Comic Sans MS'",
              transition: "0.2s",
              textAlign: "center",
              border: "2px solid #b0bec5",
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
            <b style={{ color: "#455a64", fontSize: "19px" }}>{act.title}</b>
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
          background: "rgba(224,224,224,0.97)",
          border: "2px solid #b0bec5",
          borderRadius: "20px",
          fontWeight: "bold",
          fontSize: "17px",
          maxWidth: "85%",
          textAlign: "center",
          fontFamily: "'Comic Sans MS'",
          color: "#455a64",
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
        }}
      >
        {botText}
      </div>
    </div>
  );
}
