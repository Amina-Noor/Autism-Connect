// src/components/StoryModePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const storyWorlds = [
  {
    id: 1,
    title: "Space Adventure 🚀",
    video: "/videos/space.mp4",
    desc: "Build stories with astronauts, rockets and planets!",
    route: "/story/space",
  },
  {
    id: 2,
    title: "Jungle Journey 🌴",
    video: "/videos/jungle.mp4",
    desc: "Create jungle stories with animals and nature!",
    route: "/story/jungle",
  },
  {
    id: 3,
    title: "Aquatic World 🌊",
    video: "/videos/aquatic.mp4",
    desc: "Dive into underwater stories with sea creatures!",
    route: "/story/aquatic",
  },
];

export default function StoryModePage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📖 Story Mode – Create & Imagine</h1>

      <div style={styles.grid}>
        {storyWorlds.map((world) => (
          <motion.div
            key={world.id}
            style={styles.card}
            whileHover={{ scale: 1.08, rotate: [0, 2, -2, 0] }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: world.id * 0.1 }}
            onClick={() => navigate(world.route)}
          >
            <div style={styles.videoWrapper}>
              <motion.video
                src={world.video}
                autoPlay
                loop
                muted
                style={styles.video}
              />
              <motion.div
                style={styles.sparkle}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
            </div>
            <h2 style={styles.cardTitle}>{world.title}</h2>
            <p style={styles.desc}>{world.desc}</p>
            <motion.button
              style={styles.button}
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px #b197fc" }}
            >
              Start Story ▶
            </motion.button>
          </motion.div>
        ))}
      </div>

      <motion.button
        style={styles.backBtn}
        whileHover={{ scale: 1.05, backgroundColor: "#d0ebff" }}
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </motion.button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: 20,
    background: "linear-gradient(to bottom, #f3f0ff, #e7f5ff)",
    fontFamily: "'Comic Neue', cursive, Arial, sans-serif",
    textAlign: "center",
    position: "relative",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: 30,
    color: "#845ef7",
    textShadow: "2px 2px #ede9fe",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 25,
  },
  card: {
    background: "linear-gradient(145deg, #ffffff, #edf2ff)",
    borderRadius: 20,
    padding: 0,
    width: 280,
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
  },
  videoWrapper: {
    position: "relative",
    width: "100%",
    height: 180,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "20px 20px 0 0",
  },
  sparkle: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 30,
    height: 30,
    background: "radial-gradient(circle, #fff 0%, #b197fc 70%)",
    borderRadius: "50%",
    opacity: 0.6,
  },
  cardTitle: { fontSize: "1.4rem", marginTop: 8, marginBottom: 6, color: "#5f3dc4" },
  desc: { fontSize: "1rem", marginBottom: 12, color: "#555" },
  button: {
    padding: "10px 18px",
    marginBottom: 10,
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(45deg, #b197fc, #845ef7)",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    outline: "none",
  },
  backBtn: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: "10px 16px",
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
    background: "#edf2ff",
    fontWeight: "bold",
  },
};
