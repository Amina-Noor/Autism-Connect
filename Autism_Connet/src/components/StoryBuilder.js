// src/components/StoryBuilder.js
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Reorder, motion } from "framer-motion";

// Themes & images
const THEMES = {
  space: {
    title: "🚀 Space Adventure",
    bg: "/images/space_bg.jpg",
    music: "/sounds/space.mp3",
    images: ["space_astronaut.jpg", "space_rocket.jpg", "space_planet.jpg", "space_alien.jpg"],
  },
  jungle: {
    title: "🌴 Jungle Journey",
    bg: "/images/jungle_bg.jpg",
    music: "/sounds/jungle.mp3",
    images: ["jungle_lion.jpg", "jungle_monkey.jpg", "jungle_tree.jpg", "jungle_river.jpg"],
  },
  aquatic: {
    title: "🌊 Aquatic World",
    bg: "/images/aquatic_bg.jpg",
    music: "/sounds/aquatic.mp3",
    images: ["aqua_fish.jpg", "aqua_whale.jpg", "aqua_submarine.jpg", "aqua_coral.jpg"],
  },
};

export default function StoryBuilder() {
  const navigate = useNavigate();
  const { theme } = useParams();
  const data = THEMES[theme];

  const [storyImages, setStoryImages] = useState([]);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef(null);

  useEffect(() => {
    if (!data) return;
    if (audioRef.current) audioRef.current.pause();

    const audio = new Audio(data.music);
    audio.loop = true;
    audio.volume = volume;
    if (!muted) audio.play().catch(() => {});

    audioRef.current = audio;

    return () => audio.pause();
  }, [theme]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = muted;
    audioRef.current.volume = volume;
  }, [muted, volume]);

  if (!data) return <p>Invalid theme!</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 20,
        background: `url(${data.bg}) center/cover no-repeat`,
        fontFamily: "'Fredoka One', cursive, Arial, sans-serif",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: '3rem', textShadow: '2px 2px #000' }}>{data.title}</h1>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: 10,
          padding: '10px 16px',
          borderRadius: 12,
          border: 'none',
          cursor: 'pointer',
          background: '#ff9ff3',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}
      >⬅ Back</button>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => setMuted(!muted)}
          style={{ marginRight: 10, padding: '8px 12px', fontSize: '1rem', borderRadius: 8, cursor: 'pointer' }}
        >
          {muted ? "🔇 Muted" : "🔊 Sound On"}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          style={{ verticalAlign: 'middle' }}
        />
      </div>

      <h3 style={{ marginTop: 30, fontSize: '1.8rem', textShadow: '1px 1px #000' }}>Pick Images:</h3>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: 'center', marginTop: 10 }}>
        {data.images.map((img) => (
          <motion.img
            key={img}
            src={`/images/${img}`}
            style={{ width: 150, borderRadius: 16, cursor: "pointer", boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}
            whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0], boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}
            transition={{ duration: 0.3 }}
            onClick={() => setStoryImages((prev) => [...prev, img])}
          />
        ))}
      </div>

      <h3 style={{ marginTop: 40, fontSize: '2rem', textShadow: '1px 1px #000' }}>Your Story (Drag & Reorder):</h3>
      <Reorder.Group axis="x" values={storyImages} onReorder={setStoryImages} style={{ display: "flex", gap: 20, flexWrap: 'wrap', justifyContent: 'center', minHeight: 180, marginTop: 20 }}>
        {storyImages.map((img) => (
          <Reorder.Item key={img + Math.random()} value={img}>
            <motion.img
              src={`/images/${img}`}
              style={{ width: 150, borderRadius: 16, boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}
              drag
              whileDrag={{ scale: 1.3, rotate: [0, 5, -5, 0], boxShadow: '0 15px 30px rgba(0,0,0,0.6)' }}
              transition={{ duration: 0.3 }}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
