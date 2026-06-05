import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const sounds = [
  { name: "Rain 🌧️", file: "/sounds/rain.crdownload", img: "/images/rain.jpg", video: "/videos/rain.mp4", particle: "rain", desc: "Soft rain falling gently." },
  { name: "Ocean 🌊", file: "/sounds/ocean.mp3", img: "/images/ocean.jpg", video: "/videos/ocean.mp4", particle: "waves", desc: "Calm ocean waves." },
  { name: "Forest 🍃", file: "/sounds/forest.mp3", img: "/images/forest.jpg", video: "/videos/forest.mp4", particle: "leaves", desc: "Peaceful forest sounds." },
  { name: "Fire 🔥", file: "/sounds/fire.crdownload", img: "/images/fire.jpg", video: "/videos/fire.mp4", particle: "embers", desc: "Warm crackling fire." },
  { name: "Wind 🌬️", file: "/sounds/wind.mp3", img: "/images/wind.jpg", video: "/videos/wind.mp4", particle: "wind", desc: "Gentle wind breeze." },
  { name: "Night ✨", file: "/sounds/night.mp3", img: "/images/night.jpg", video: "/videos/night.mp4", particle: "stars", desc: "Quiet peaceful night." },
  { name: "Chimes 🎐", file: "/sounds/chimes.mp3", img: "/images/chimes.jpg", video: "/videos/chimes.mp4", particle: "sparkles", desc: "Soft wind chimes." },
  { name: "Thunder ⛈️", file: "/sounds/thunder.mp3", img: "/images/thunder.jpg", video: "/videos/thunder.mp4", particle: "thunder", desc: "Distant thunder rumble." },
  { name: "Cafe ☕", file: "/sounds/cafe.mp3", img: "/images/cafe.jpg", video: "/videos/cafe.mp4", particle: "cafe", desc: "Cozy cafe ambience." },
  { name: "River 🏞️", file: "/sounds/river.mp3", img: "/images/river.jpg", video: "/videos/river.mp4", particle: "waves", desc: "Flowing river water." },
];

export default function SoundBoardPage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [currentSound, setCurrentSound] = useState(null);
  const [volume, setVolume] = useState(0.3);

  // 🔥 Only one sound plays at a time
  useEffect(() => {
    if (!audioRef.current || !currentSound) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.src = currentSound.file;
    audioRef.current.volume = volume;
    audioRef.current.load();
    audioRef.current.play().catch(() => {});
  }, [currentSound]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={styles.container}
    >
      {/* Back Button */}
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      {/* Fullscreen Video */}
      {currentSound?.video && (
        <video
          src={currentSound.video}
          autoPlay
          loop
          muted
          playsInline
          style={styles.video}
        />
      )}

      <div style={styles.overlay} />

      <h1 style={styles.title}>🎧 Calm Soundboard</h1>

      {/* Sound Buttons */}
      <div style={styles.buttons}>
        {sounds.map((s) => (
          <button
            key={s.name}
            style={styles.soundBtn}
            onClick={() => setCurrentSound(s)}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Sound Card */}
      {currentSound && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={styles.card}
        >
          <img src={currentSound.img} alt="" style={styles.image} />
          <p>{currentSound.desc}</p>
          <div>
            🔊 Volume
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>
          <audio ref={audioRef} loop />
        </motion.div>
      )}
    </motion.div>
  );
}

const styles = {
  container: { minHeight: "100vh", padding: 30, color: "#fff", position: "relative", overflow: "hidden" },
  video: { position: "fixed", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: -2 },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: -1 },
  title: { textAlign: "center", fontSize: "2.2rem", marginBottom: 20 },
  buttons: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 },
  soundBtn: { padding: "12px 18px", borderRadius: 14, border: "none", cursor: "pointer" },
  card: { margin: "30px auto", maxWidth: 300, padding: 18, borderRadius: 22, background: "rgba(255,255,255,0.15)", textAlign: "center" },
  image: { width: "140px", borderRadius: 16, marginBottom: 10 },
  backBtn: { position: "absolute", top: 20, left: 20, padding: "8px 14px", borderRadius: 12, border: "none", cursor: "pointer", zIndex: 10 },
};
