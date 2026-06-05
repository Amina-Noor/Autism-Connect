import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AgeScreenWithDropdown() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [selectedAge, setSelectedAge] = useState("");
  const [error, setError] = useState("");

  let lastTap = 0;

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
      setVideoLoaded(true);
    }
  }, []);

  const handleTap = () => {
    const now = Date.now();
    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video || !audio) return;

    if (now - lastTap < 300) {
      video.pause();
      audio.pause();
    } else {
      video.muted = false;
      video.play().catch(() => {});
      audio.play().catch(() => {});
    }
    lastTap = now;
  };

  const handleAgeChange = (e) => {
    const age = e.target.value;
    setSelectedAge(age);
    setError("");

    if (age === "3-9") navigate("/emotion-bot-0-5");
    else if (age === "10-15") navigate("/emotion-bot-10-15");
    else if (age !== "") setError("Please select the age correctly!");
  };

  return (
    <div
      onClick={handleTap}
      style={containerStyle}
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        src="/vid.mp4"
        loop
        playsInline
        style={videoStyle(videoLoaded)}
        onLoadedData={() => setVideoLoaded(true)}
      />

      {/* AUDIO */}
      <audio ref={audioRef} loop>
        <source src="/light_music.mp3" type="audio/mpeg" />
      </audio>

      {/* HOME BUTTON */}
      <button style={homeButtonStyle} onClick={(e) => {
        e.stopPropagation();
        navigate("/");
      }}>
        Home
      </button>

      {/* ACTIVITIES BUTTON */}
      <button style={activitiesButtonStyle} onClick={(e) => {
        e.stopPropagation();
        navigate("/Activities");
      }}>
        Activities
      </button>

      {/* ⭐ DASHBOARD BUTTON (NEW - UNDER ACTIVITIES) */}
      <button style={dashboardButtonStyle} onClick={(e) => {
        e.stopPropagation();
        navigate("/dashboard");
      }}>
        Dashboard 🏠
      </button>

      {/* AGE SELECT */}
      <div style={footerStyle}>
        <select value={selectedAge} onChange={handleAgeChange} style={dropdownStyle}>
          <option value="">Select your age</option>
          <option value="3-9">3–9 Years</option>
          <option value="10-15">10–15 Years</option>
        </select>

        {error && <span style={errorStyle}>{error}</span>}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const containerStyle = {
  width: "100vw",
  height: "100vh",
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
};

const videoStyle = (loaded) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: -1,
  display: loaded ? "block" : "none",
});

const homeButtonStyle = {
  position: "absolute",
  top: 20,
  left: 20,
  padding: "12px 26px",
  borderRadius: 20,
  border: "none",
  background: "linear-gradient(135deg, #87ceeb, #fdfd96)",
  fontWeight: 600,
  cursor: "pointer",
};

const activitiesButtonStyle = {
  position: "absolute",
  top: 20,
  right: 20,
  padding: "12px 26px",
  borderRadius: 20,
  border: "none",
  background: "linear-gradient(135deg, #fff176, #ffe57f)",
  fontWeight: 600,
  cursor: "pointer",
};

/* ⭐ NEW DASHBOARD BUTTON STYLE */
const dashboardButtonStyle = {
  position: "absolute",
  top: 70,
  right: 20,
  padding: "10px 22px",
  borderRadius: 20,
  border: "none",
  background: "linear-gradient(135deg, #81c784, #4caf50)",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
};

const footerStyle = {
  position: "absolute",
  bottom: 40,
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
};

const dropdownStyle = {
  padding: "12px 20px",
  borderRadius: 25,
  border: "none",
  background: "linear-gradient(135deg, #87cefa, #b0e0e6)",
  fontWeight: 600,
};

const errorStyle = {
  color: "#ff4444",
  fontSize: 14,
  fontWeight: 500,
};