import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AgeScreenWithButtons() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  let lastTap = 0;

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true; // allow autoplay in Edge/Chrome
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setVideoLoaded(true))
          .catch((e) => console.log("Autoplay blocked", e));
      }
    }
  }, []);

  const handleTap = () => {
    const now = Date.now();
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    if (now - lastTap < 300) {
      // double tap → pause both
      video.pause();
      audio.pause();
    } else {
      // single tap → play both
      video.muted = false;
      video.play().catch((e) => console.log("Video play blocked:", e));
      audio.play().catch((e) => console.log("Audio play blocked:", e));
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
        backgroundColor: "#87ceeb", // fallback sky color
        cursor: "pointer",
      }}
    >
      {/* Video Background */}
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
          display: videoLoaded ? "block" : "none",
        }}
        onLoadedData={() => setVideoLoaded(true)}
      />

      {/* Background Music */}
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
        <InteractiveButton
          onClick={() => navigate("/emotion-bot-0-5")}
          colors={["#87cefa", "#b0e0e6"]}
        >
          3–9 Years
        </InteractiveButton>
        <InteractiveButton
          onClick={() => navigate("/Activities")}
          colors={["#fff176", "#ffe57f"]}
        >
          Activities
        </InteractiveButton>
        <InteractiveButton
          onClick={() => navigate("/emotion-bot-10-15")}
          colors={["#ffffff", "#f0f0f0"]}
        >
          10–15 Years
        </InteractiveButton>
      </div>
    </div>
  );
}

/* Footer container style */
const footerContainerStyle = {
  display: "flex",
  gap: "20px",
  position: "absolute",
  bottom: "40px",
  left: "50%",
  transform: "translateX(-50%)",
};

/* Home button style */
const homeButtonStyle = {
  position: "absolute",
  top: 20,
  left: 20,
  padding: "12px 26px",
  borderRadius: 20,
  border: "none",
  background: "linear-gradient(135deg, #87ceeb, #fdfd96)",
  color: "#444",
  fontWeight: 600,
  fontSize: 16,
  cursor: "pointer",
  boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
  transition: "all 0.2s ease",
};

/* Interactive footer button component */
const InteractiveButton = ({ children, onClick, colors }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        padding: "16px 36px",
        borderRadius: 25,
        border: "none",
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        color: "#444",
        fontWeight: 600,
        fontSize: 16,
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
