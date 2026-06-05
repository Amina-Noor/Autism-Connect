import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

export default function EmotionBotForToddlers() {
  const navigate = useNavigate();
  const [botText, setBotText] = useState("");
  const [confettiActive, setConfettiActive] = useState(false);
  const [animateImages, setAnimateImages] = useState(true); // for stopping sway after 5s
  const bgMusicRef = useRef(null); // 🎵 reference for background music

  const emotions = [
    { name: "Happy", img: "/happy.png" },
    { name: "Sad", img: "/sad.png" },
    { name: "Angry", img: "/angry.png" },
    { name: "Scared", img: "/scared.png" },
    { name: "Bored", img: "/bored.png" },
    { name: "Tired", img: "/tired.png" },
    { name: "Shy", img: "/shy.png" },
    { name: "Confused", img: "/confused.png" },
  ];

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel(); // stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    synth.speak(utterance);
  };

  useEffect(() => {
    const welcomeMessage =
      "Hello little friend! I’m EmotiBuddy! I’m so happy to see you today. Tap on a face that shows how you feel and let’s have some fun together!";
    setBotText(welcomeMessage);
    speakText(welcomeMessage);

    // Start background music
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = 0.3;
      bgMusicRef.current.play().catch(() => {});
    }

    // Stop images animation after 5 seconds
    const timer = setTimeout(() => setAnimateImages(false), 5000);

    // Cleanup: stop speech & music if component unmounts
    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleEmotionClick = (emotion) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel(); // stop speech before navigating

    // Stop background music
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    }

    const friendlyMessage = `Oh! You are feeling ${emotion}. Let’s try some fun activities to make your day brighter!`;
    setBotText(friendlyMessage);
    speakText(friendlyMessage);

    // Show confetti for 10 seconds
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 10000);

    // Navigate to the correct activity page
    const pathMap = {
      Happy: "/happy",
      Sad: "/sad",
      Angry: "/angry",
      Scared: "/scared",
      Bored: "/bored",
      Tired: "/tired",
      Shy: "/shy",
      Confused: "/confused",
    };

    navigate(pathMap[emotion]);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflowY: "auto",
      }}
    >
      {/* Background music */}
      <audio ref={bgMusicRef} src="/sounds/background.mp3" loop />

      {/* Full-screen background video */}
      <video
        src="/videos/background1.mp4"
        autoPlay
        loop
        muted
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      {confettiActive && <Confetti recycle={false} numberOfPieces={300} />}

      {/* Back Button */}
      <button
        onClick={() => {
          if (bgMusicRef.current) {
            bgMusicRef.current.pause();
            bgMusicRef.current.currentTime = 0;
          }
          navigate("/age");
        }}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 20px",
          borderRadius: "10px",
          border: "none",
          background: "#ff5555",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        }}
      >
        Back
      </button>

      {/* Speak Button */}
      <button
        onClick={() => speakText(botText)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          borderRadius: "10px",
          border: "none",
          background: "#55aaFF",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        }}
      >
        Speak
      </button>

      {/* Header text */}
      <div
        style={{
          marginTop: "40px",
          marginBottom: "50px",
          padding: "15px 30px",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "white",
            fontFamily: "'Comic Sans MS', sans-serif",
            fontSize: "48px",
            fontWeight: "bold",
            textAlign: "center",
            margin: 0,
            textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          What are you feeling now?
        </h1>
      </div>

      {/* Emotion Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "50px",
          justifyItems: "center",
          alignItems: "center",
          paddingBottom: "150px",
        }}
      >
        {emotions.map((emo, index) => (
          <div
            key={emo.name}
            onClick={() => handleEmotionClick(emo.name)}
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              animation: animateImages
                ? `sway ${1.5 + index * 0.2}s ease-in-out infinite alternate`
                : "none",
            }}
          >
            <img
              src={emo.img}
              alt={emo.name}
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "30px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                transition: "transform 0.2s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
              }}
            />
          </div>
        ))}
      </div>

      {/* Bot message */}
      {botText && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "12px 18px",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            fontWeight: "bold",
            fontSize: "18px",
            maxWidth: "90%",
            textAlign: "center",
          }}
        >
          {botText}
        </div>
      )}

      <style>{`
        @keyframes sway {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(10px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
