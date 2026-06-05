import React, { useRef, useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const options = [
  {
    id: 1,
    title: "🎵 Soundboard",
    img: "/images/soundboard_card.jpg",
    route: "/soundboard",
    color: "#ffb6c1", // pastel pink
  },
  {
    id: 2,
    title: "🎯 Mini-Games",
    img: "/images/mini_game_card.jpg",
    route: "/mini-game",
    color: "#fff9b6", // pastel yellow
  },
  {
    id: 3,
    title: "📖 Story Mode",
    img: "/images/story_mode_card.jpg",
    route: "/story-mode",
    color: "#d6b3ff", // pastel purple / lavender
  },
];

export default function EmotionBot5to10() {
  const navigate = useNavigate();
  const [sparkles, setSparkles] = useState([]);
  const audioRef = useRef(null);

  // Play background music
  useEffect(() => {
    const audio = new Audio("/sounds/music.mp3"); // use proper mp3 file
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(() => {});
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleClick = (route, x, y) => {
    // Stop background music on click
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const id = Date.now();
    setSparkles((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setSparkles((prev) => prev.filter((s) => s.id !== id)), 1000);
    navigate(route);
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", fontFamily: "'Fredoka One', cursive" }}>
      {/* Video Background */}
      <video
        src="/videos/background.crdownload"
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
          color: "#fff",
          textShadow: "2px 2px 10px #000",
          marginTop: 20,
        }}
      >
        🌈 Fun Activities 🌈
      </h1>

      {/* Horizontal Cards */}
      <div style={{ display: "flex", justifyContent: "center", gap: 50, marginTop: 60 }}>
        {options.map((opt) => (
          <motion.div
            key={opt.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: opt.id * 0.2 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 15 }}
          >
            {/* Card Image */}
            <motion.img
              src={opt.img}
              style={{
                width: 220,
                height: 160,
                borderRadius: 20,
                objectFit: "cover",
                border: `4px solid ${opt.color}`,
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleClick(opt.route, e.clientX, e.clientY)}
            />

            {/* Button */}
            <motion.button
              style={{
                padding: "15px 28px",
                fontSize: "18px",
                borderRadius: "14px",
                border: "none",
                cursor: "pointer",
                background: opt.color,
                fontWeight: "bold",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                outline: "none",
              }}
              whileHover={{ scale: 1.1, boxShadow: "0 10px 25px rgba(0,0,0,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleClick(opt.route, e.clientX, e.clientY)}
            >
              {opt.title}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Sparkle Effect */}
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.img
            key={s.id}
            src="/images/star1.png"
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 1.5, rotate: [0, 90, -90, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              left: s.x - 20,
              top: s.y - 20,
              width: 40,
              pointerEvents: "none",
              zIndex: 10,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Back Button */}
      <motion.button
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          padding: "10px 16px",
          borderRadius: 14,
          border: "none",
          cursor: "pointer",
          background: "#ffe6f0",
          fontWeight: "bold",
          zIndex: 10,
        }}
        whileHover={{ scale: 1.05, backgroundColor: "#ffcce6" }}
        onClick={() => {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          navigate(-1);
        }}
      >
        ⬅ Back
      </motion.button>
    </div>
  );
}
