// src/components/MathGame.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";

const praiseVoices = [
  "/sounds/goodjob.mp3",
  "/sounds/excellent.mp3",
  "/sounds/amazing.mp3",
];

const wrongVoice = "/sounds/tryagain.mp3";

const games = [
  {
    title: "🔢 Counting",
    video: "/videos/counting.mp4",
    questions: [
      { q: "Count 🍎🍎🍎", a: "3" },
      { q: "Count ⭐⭐⭐⭐", a: "4" },
      { q: "Count 🐶🐶", a: "2" },
      { q: "Count 🍌🍌🍌🍌🍌", a: "5" },
      { q: "Count 🚗🚗🚗", a: "3" },
    ],
  },
  {
    title: "➕ Addition",
    video: "/videos/addition.mp4",
    questions: [
      { q: "2 + 2", a: "4" },
      { q: "3 + 1", a: "4" },
      { q: "1 + 5", a: "6" },
      { q: "4 + 2", a: "6" },
      { q: "3 + 3", a: "6" },
    ],
  },
  {
    title: "🔗 Matching",
    video: "/videos/matching.mp4",
    questions: [
      { q: "🍎🍎 → ?", a: "2" },
      { q: "⭐⭐⭐ → ?", a: "3" },
      { q: "🐱🐱🐱🐱 → ?", a: "4" },
      { q: "🚗🚗 → ?", a: "2" },
      { q: "🍌🍌🍌 → ?", a: "3" },
    ],
  },
];

export default function MathGame() {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  const [stars, setStars] = useState(0);
  const [level, setLevel] = useState(1);
  const [celebrate, setCelebrate] = useState(false);

  const playPraise = () => {
    const sound =
      praiseVoices[Math.floor(Math.random() * praiseVoices.length)];
    new Audio(sound).play();
  };

  const playWrong = () => {
    new Audio(wrongVoice).play();
  };

  const onCorrect = () => {
    playPraise();
    setStars((s) => s + 1);
    setCelebrate(true);

    setTimeout(() => setCelebrate(false), 2000);

    if (stars + 1 >= 5) {
      setLevel((l) => l + 1);
      setStars(0);
    }
  };

  return (
    <div style={styles.page}>
      <AnimatePresence>
        {celebrate && <Confetti width={width} height={height} />}
      </AnimatePresence>

      <button style={styles.back} onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>🧮 Math Fun</h1>
      <p>⭐ Stars: {stars} | 🏆 Level: {level}</p>

      <div style={styles.grid}>
        {games.map((game, gi) => (
          <motion.div key={gi} style={styles.card} whileHover={{ scale: 1.04 }}>
            <h2>{game.title}</h2>

            <video controls style={styles.video}>
              <source src={game.video} type="video/mp4" />
            </video>

            {game.questions.map((q, qi) => (
              <Question
                key={qi}
                data={q}
                onCorrect={onCorrect}
                onWrong={playWrong}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Question({ data, onCorrect, onWrong }) {
  const [ans, setAns] = useState("");
  const [status, setStatus] = useState(""); // correct | wrong

  const check = () => {
    if (ans.trim() === data.a) {
      setStatus("correct");
      onCorrect();
    } else {
      setStatus("wrong");
      onWrong();
    }
  };

  return (
    <motion.div
      style={styles.qBox}
      animate={{ y: status === "correct" ? -5 : 0 }}
    >
      <p>{data.q}</p>
      <input value={ans} onChange={(e) => setAns(e.target.value)} />
      <button onClick={check}>Check</button>

      {status === "correct" && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          🎉🎈⭐ Excellent!
        </motion.div>
      )}

      {status === "wrong" && (
        <motion.div initial={{ x: -10 }} animate={{ x: 0 }}>
          ❌ Try Again!
        </motion.div>
      )}
    </motion.div>
  );
}

const styles = {
  page: { padding: 20, textAlign: "center", background: "#fef6ff" },
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
    background: "#fff0f6",
    marginTop: 10,
    padding: 10,
    borderRadius: 12,
  },
};
