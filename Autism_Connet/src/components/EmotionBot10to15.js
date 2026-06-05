import React, { useState } from "react";

export default function EmotionBot10to15() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const emotions = [
    { name: "Happy", img: "/happy.png" },
    { name: "Sad", img: "/sad.png" },
    { name: "Angry", img: "/angry.png" },
    { name: "Stressed", img: "/stressed.png" },
    { name: "Bored", img: "/bored.png" },
    { name: "Tired", img: "/tired.png" },
    { name: "Shy", img: "/shy.png" },
    { name: "Confused", img: "/confused.png" },
  ];

  const activitySuggestions = {
    Happy: [
      { name: "Dance Party", img: "/activities/dance.png" },
      { name: "Music Jam", img: "/activities/music.png" },
      { name: "Outdoor Sports", img: "/activities/sports.png" },
    ],
    Sad: [
      { name: "Meditation", img: "/activities/meditation.png" },
      { name: "Read Story", img: "/activities/story.png" },
      { name: "Art Therapy", img: "/activities/art.png" },
    ],
    Angry: [
      { name: "Punch Pillow", img: "/activities/pillow.png" },
      { name: "Running", img: "/activities/run.png" },
      { name: "Breathing Exercise", img: "/activities/breathing.png" },
    ],
    Stressed: [
      { name: "Yoga", img: "/activities/yoga.png" },
      { name: "Listen Music", img: "/activities/music.png" },
      { name: "Write Journal", img: "/activities/journal.png" },
    ],
    Bored: [
      { name: "Puzzle Game", img: "/activities/puzzle.png" },
      { name: "Learn Skill", img: "/activities/skill.png" },
      { name: "Creative Project", img: "/activities/project.png" },
    ],
    Tired: [
      { name: "Nap", img: "/activities/rest.png" },
      { name: "Light Reading", img: "/activities/story.png" },
      { name: "Soft Music", img: "/activities/music.png" },
    ],
    Shy: [
      { name: "Small Group Play", img: "/activities/guide.png" },
      { name: "Soft Toy Interaction", img: "/activities/toy.png" },
      { name: "Gentle Talk", img: "/activities/talk.png" },
    ],
    Confused: [
      { name: "Puzzle", img: "/activities/puzzle.png" },
      { name: "Guided Activity", img: "/activities/guide.png" },
      { name: "Blocks", img: "/activities/blocks.png" },
    ],
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url("/bot_background.png")`,
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ color: "white", textAlign: "center" }}>How are you feeling today?</h2>

      {!selectedEmotion ? (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
          {emotions.map((emo) => (
            <div
              key={emo.name}
              onClick={() => setSelectedEmotion(emo.name)}
              style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <img src={emo.img} alt={emo.name} style={{ width: "100px", height: "100px" }} />
              <span style={{ color: "white", marginTop: "5px", fontWeight: "bold" }}>{emo.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <h3 style={{ color: "yellow" }}>Suggested Activities:</h3>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "15px" }}>
            {activitySuggestions[selectedEmotion].map((act) => (
              <div key={act.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
                <img src={act.img} alt={act.name} style={{ width: "100px", height: "100px", borderRadius: "10px" }} />
                <span style={{ color: "white", marginTop: "5px", fontWeight: "bold" }}>{act.name}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSelectedEmotion(null)}
            style={{
              marginTop: "30px",
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(90deg, #800080, #1e3a8a, #ffdd00)",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Choose Again
          </button>
        </div>
      )}
    </div>
  );
}
