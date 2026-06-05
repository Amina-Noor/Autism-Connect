import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AgeScreen() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  let lastTap = 0;

  const handleTap = () => {
    const now = Date.now();
    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video || !audio) return;

    if (now - lastTap < 300) {
      video.pause();
      audio.pause();
      setVideoPlaying(false);
    } else {
      if (!videoPlaying) {
        video.muted = false;
        video.play().catch((e) => console.log("Video play blocked:", e));
        audio.play().catch((e) => console.log("Audio play blocked:", e));
        setVideoPlaying(true);
      }
    }
    lastTap = now;
  };

  return (
    <div
      onClick={handleTap}
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#87ceeb",
        cursor: "pointer",
        zIndex: 1,   // ✅ FIX 1: layering issue fixed
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src="/vid.mp4"
        loop
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          pointerEvents: "none", // ✅ FIX 2: prevents UI blocking
        }}
      />

      {/* Audio */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/light_music.mp3" type="audio/mpeg" />
      </audio>

      {/* Home Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate("/");
        }}
        style={homeButtonStyle}
      >
        Home
      </button>

      {/* Footer Buttons */}
      <div style={footerContainerStyle}>
        <InteractiveButton onClick={() => navigate("/emotion-bot-0-5")} colors={["#87cefa","#b0e0e6"]}>
          3–9 Years
        </InteractiveButton>

        <InteractiveButton onClick={() => navigate("/Activities")} colors={["#fff176","#ffe57f"]}>
          Activities
        </InteractiveButton>

        <InteractiveButton onClick={() => navigate("/emotion-bot-10-15")} colors={["#ffffff","#f0f0f0"]}>
          10–15 Years
        </InteractiveButton>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const footerContainerStyle = {
  display: "flex",
  gap: "20px",
  position: "absolute",
  bottom: "40px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 10,   // ✅ FIX 3: ensures buttons stay on top
};

const homeButtonStyle = {
  position: "absolute",
  top: "20px",
  left: "20px",
  padding: "12px 26px",
  borderRadius: "20px",
  border: "none",
  background: "linear-gradient(135deg, #87ceeb, #fdfd96)",
  color: "#444",
  fontWeight: "600",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
  transition: "all 0.2s ease",
  zIndex: 10,   // ✅ FIX 4: home button always visible
};

/* ================= COMPONENT ================= */

const InteractiveButton = ({ children, onClick, colors }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        padding: "16px 36px",
        borderRadius: "25px",
        border: "none",
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        color: "#444",
        fontWeight: "600",
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.filter = "brightness(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.filter = "brightness(1)";
      }}
    >
      {children}
    </button>
  );
};