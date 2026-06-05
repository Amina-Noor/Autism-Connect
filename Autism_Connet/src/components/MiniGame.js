// src/components/MiniGamePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const miniGames = [
  {
    id: 1,
    title: "Math Fun 🧮",
    img: "/images/math-game.jpg",
    desc: "Solve fun puzzles to learn numbers and addition!",
    route: "/math-game",
  },
  {
    id: 2,
    title: "Alphabet Adventure 🔤",
    img: "/images/alphabet-game.jpg",
    desc: "Learn letters and sounds in a playful way!",
    route: "/alphabet-game",
  },
  {
    id: 3,
    title: "Color & Shapes 🎨",
    img: "/images/color-shapes.jpg",
    desc: "Identify colors and shapes while having fun!",
    route: "/color-shapes-game",
  },
];

export default function MiniGamePage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎯 Mini Games - Learn & Play</h1>

      <div style={styles.grid}>
        {miniGames.map((game) => (
          <motion.div
            key={game.id}
            style={styles.card}
            whileHover={{ scale: 1.08, rotate: [0, 2, -2, 0] }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: game.id * 0.1 }}
          >
            <div style={styles.imgWrapper}>
              <img src={game.img} alt={game.title} style={styles.image} />
              <motion.div
                style={styles.sparkle}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
            </div>
            <h2 style={styles.cardTitle}>{game.title}</h2>
            <p style={styles.desc}>{game.desc}</p>
            <motion.button
              style={styles.button}
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px #ffb6c1" }}
              onClick={() => navigate(game.route)}
            >
              Play Now
            </motion.button>
          </motion.div>
        ))}
      </div>

      <motion.button
        style={styles.backBtn}
        whileHover={{ scale: 1.05, backgroundColor: "#b3e5fc" }}
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
    background: "linear-gradient(to bottom, #fffae6, #c6f0ff)",
    fontFamily: "'Comic Neue', cursive, Arial, sans-serif",
    textAlign: "center",
    position: "relative",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: 30,
    color: "#ff4da6",
    textShadow: "2px 2px #ffe6f0",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 25,
  },
  card: {
    background: "linear-gradient(145deg, #ffffff, #ffe6f0)",
    borderRadius: 20,
    padding: 15,
    width: 240,
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  imgWrapper: {
    position: "relative",
  },
  sparkle: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 30,
    height: 30,
    background: "radial-gradient(circle, #fff 0%, #ffb6c1 70%)",
    borderRadius: "50%",
    opacity: 0.6,
  },
  image: {
    width: "100%",
    borderRadius: 16,
    marginBottom: 10,
    border: "2px solid #ffb6c1",
  },
  cardTitle: { fontSize: "1.4rem", marginBottom: 6, color: "#d6336c" },
  desc: { fontSize: "1rem", marginBottom: 12, color: "#555" },
  button: {
    padding: "10px 18px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(45deg, #ffb6c1, #ff4da6)",
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
    background: "#ffe6f0",
    fontWeight: "bold",
  },
};
