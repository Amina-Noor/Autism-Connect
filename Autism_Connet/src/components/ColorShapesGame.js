// src/components/ColorShapesGame.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";

// Voice feedback
const praiseSounds = [
  new Audio("/sounds/excellent.mp3"),
  new Audio("/sounds/amazing.mp3"),
  new Audio("/sounds/tada.mp3"),
];

// Wrong answer sounds
const wrongSounds = [
  new Audio("/sounds/tryagain1.mp3"),
  new Audio("/sounds/tryagain.mp3"),
];

// 3 Color & Shapes Games
const games = [
  {
    title: "🎨 Color Fun",
    video: "/videos/colors.mp4",
    questions: [
      { q: "What color is 🍎?", a: "RED" },
      { q: "What color is 🍌?", a: "YELLOW" },
      { q: "What color is 🍇?", a: "PURPLE" },
      { q: "What color is 🥦?", a: "GREEN" },
      { q: "What color is 🥕?", a: "ORANGE" },
    ],
  },
  {
    title: "🔺 Shape Match",
    video: "/videos/shapes.mp4",
    questions: [
      { q: "Match: 🔺 → ?", a: "TRIANGLE" },
      { q: "Match: ⬛ → ?", a: "SQUARE" },
      { q: "Match: ⚪ → ?", a: "CIRCLE" },
      { q: "Match: 🔷 → ?", a: "DIAMOND" },
      { q: "Match: 🔶 → ?", a: "RHOMBUS" },
    ],
  },
  {
    title: "🖌️ Color & Shape Quiz",
    video: "/videos/color-shape-quiz.mp4",
    questions: [
      { q: "🟦⬛ → What color + shape?", a: "BLUE SQUARE" },
      { q: "🟧🔺 → What color + shape?", a: "ORANGE TRIANGLE" },
      { q: "🟪⚪ → What color + shape?", a: "PURPLE CIRCLE" },
      { q: "🟩🔷 → What color + shape?", a: "GREEN DIAMOND" },
      { q: "🟥🔶 → What color + shape?", a: "RED RHOMBUS" },
    ],
  },
];

export default function ColorShapesGame() {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const [stars, setStars] = useState(0);
  const [level, setLevel] = useState(1);
  const [celebrate, setCelebrate] = useState(false);

  const handleCorrect = () => {
    const sound = praiseSounds[Math.floor(Math.random() * praiseSounds.length)];
    sound.play();

    setStars((s) => s + 1);
    setCelebrate(true);

    setTimeout(() => setCelebrate(false), 3000);

    if (stars + 1 >= 5) {
      setLevel((l) => l + 1);
      setStars(0);
    }
  };

  return (
    <div style={styles.page}>
      {celebrate && <Confetti width={width} height={height} recycle={true} />}

      <button style={styles.back} onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>🎨 Color & Shapes Fun</h1>
      <p>⭐ Stars: {stars} | 🏆 Level: {level}</p>

      <div style={styles.grid}>
        {games.map((game, gi) => (
          <motion.div key={gi} style={styles.card} whileHover={{ scale: 1.05 }}>
            <h2>{game.title}</h2>

            <video controls style={styles.video}>
              <source src={game.video} type="video/mp4" />
            </video>

            {game.questions.map((q, qi) => (
              <ColorShapeQuestion key={qi} data={q} onCorrect={handleCorrect} />
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ColorShapeQuestion({ data, onCorrect }) {
  const [ans, setAns] = useState("");
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState("");

  const check = () => {
    if (ans.trim().toUpperCase() === data.a.toUpperCase()) {
      setDone(true);
      setFeedback("🎉 Correct! Amazing!");
      onCorrect();
    } else {
      setFeedback("❌ Try again!");
      wrongSounds.forEach((s) => s.play());
    }
  };

  return (
    <motion.div
      style={styles.qBox}
      animate={{ y: done ? -5 : 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <p>{data.q}</p>
      <input value={ans} onChange={(e) => setAns(e.target.value)} />
      <button onClick={check}>Check</button>
      <p>{feedback}</p>
      {done && (
        <motion.div
          style={{ fontSize: "2rem", marginTop: 5 }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          🎈✨🎉
        </motion.div>
      )}
    </motion.div>
  );
}

const styles = {
  page: { padding: 20, textAlign: "center", background: "#f0fff0" },
  back: { position: "absolute", left: 20, top: 20 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    marginTop: 20,
  },
  card: {
    background: "#fff",
    padding: 15,
    borderRadius: 20,
    boxShadow: "0 8px 20px rgba(0,0,0,.15)",
  },
  video: { width: "100%", borderRadius: 12 },
  qBox: {
    background: "#f0f8ff",
    marginTop: 10,
    padding: 10,
    borderRadius: 12,
  },
};
