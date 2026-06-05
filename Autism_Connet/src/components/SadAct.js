import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useLocation, useNavigate } from "react-router-dom";

export default function SadAct() {
  const emotion = new URLSearchParams(useLocation().search).get("emotion");
  const navigate = useNavigate();
  const [botText, setBotText] = useState("");
  const [confetti, setConfetti] = useState(false);

  // 🔊 ADDED: Sad background sound
  const sadAudio = React.useRef(new Audio("/sounds/sad.mp3")).current;

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
      "It’s okay to feel sad sometimes. I’m here with you. Let’s do some calm and cozy activities together.";
    setBotText(message);
    speak(message);

    // 🔊 ADDED: Play sad sound on enter
    sadAudio.loop = true;
    sadAudio.play().catch(() => {});

    // 🔊 ADDED: Stop sound on exit
    return () => {
      sadAudio.pause();
      sadAudio.currentTime = 0;
    };
  }, []);

  const activities = [
    {
      title: "Pillow Hug House 🧸",
      desc:
        "Build a soft pillow house and give your pillow a big warm hug. Squeeze gently… feel safe and cozy.",
      img: "/sad1.png",
    },
    {
      title: "Slow Breathing Balloon 🎈",
      desc:
        "Breathe in slowly like blowing a balloon… and breathe out gently. You are doing great.",
      img: "/sad2.png",
    },
    {
      title: "Tear Wipe Game 💧",
      desc:
        "Pretend to wipe away tiny tears. Swipe… swipe… good job. You are strong and loved.",
      img: "/sad3.png",
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
        backgroundImage: `url("/bgsad.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {confetti && (
        <Confetti numberOfPieces={200} recycle={false} gravity={0.2} />
      )}

      <button
        onClick={() => speak(botText)}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          background: "#d32f2f",
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
          sadAudio.pause();
          sadAudio.currentTime = 0;
          navigate(-1);
        }}
        style={{
          alignSelf: "flex-start",
          background: "#ef5350",
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
          color: "#c62828",
        }}
      >
        Sad Activities
      </h1>

      <h2
        style={{
          marginTop: "2px",
          fontFamily: "'Comic Sans MS'",
          fontSize: "22px",
          color: "#e57373",
        }}
      >
        You are safe and cared for ❤️
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
              background: "rgba(255,235,238,0.95)",
              padding: "15px",
              borderRadius: "20px",
              cursor: "pointer",
              width: "220px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
              fontFamily: "'Comic Sans MS'",
              transition: "0.2s",
              textAlign: "center",
              border: "2px solid #ef9a9a",
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
            <b style={{ color: "#b71c1c", fontSize: "19px" }}>
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
          background: "rgba(255,235,238,0.97)",
          border: "2px solid #ef9a9a",
          borderRadius: "20px",
          fontWeight: "bold",
          fontSize: "17px",
          maxWidth: "85%",
          textAlign: "center",
          fontFamily: "'Comic Sans MS'",
          color: "#b71c1c",
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
        }}
      >
        {botText}
      </div>
    </div>
  );
}
