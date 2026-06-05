import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideo = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause(); // ⏸ stop on second click
    } else {
      videoRef.current.play(); // ▶ play on first click
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div
      onClick={toggleVideo}
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* Cropped Fullscreen Video */}
      <video
        ref={videoRef}
        loop
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover", // ✅ CROPPED
        }}
      >
        <source src="/background_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Start Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent play/pause toggle
          navigate("/login");
        }}
        style={{
          position: "absolute",
          top: "25px",
          right: "25px",
          padding: "14px 26px",
          fontSize: "16px",
          background: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
          color: "#2f2f2f",
          fontWeight: "600",
          border: "none",
          borderRadius: "14px",
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          zIndex: 2,
        }}
      >
        Login
      </button>
    </div>
  );
}
