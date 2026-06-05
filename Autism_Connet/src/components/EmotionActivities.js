import React from "react";
import ActivitiesGallery from "./ActivitiesGallery"; // your existing component

export default function EmotionActivities({ emotion, onOpenActivity }) {
  if (!emotion) return null;

  let activities = [];

  const mood = emotion.toString().toLowerCase();

  if (mood.includes("angry") || mood.includes("😡")) {
    activities = [
      { title: "Hug your toy", img: "/images/hug_toy.jpg" },
      { title: "Tasty Tales", img: "/images/cook.jpg" },
      { title: "Scribble art", img: "/images/scribble_art.jpg" },
      { title: "Creative Corner", img: "/images/art.jpg" },
    ];
  } else if (mood.includes("sad") || mood.includes("😢")) {
    activities = [
      { title: "Color a rainbow", img: "/images/color_rainbow.jpg" },
      { title: "Listen to music", img: "/images/listen_music.jpg" },
      { title: "Hug teddy", img: "/images/hug_teddy.jpg" },
      { title: "Sprinkle Splash", img: "/images/water_play.jpg" },
    ];
  } else if (mood.includes("scared") || mood.includes("😨")) {
    activities = [
      { title: "Furry Friends Fun", img: "/images/pets.jpg" },
      { title: "Imagine kite", img: "/images/kite.jpg" },
      { title: "Calm coloring", img: "/images/calm_coloring.jpg" },
      { title: "Melody Magic", img: "/images/sing.jpg" },
    ];
  } else {
    // happy or other moods
    activities = [
      { title: "Cushion Castle", img: "/images/Cushion_Castle.jpg" },
      { title: "Tiny TV Time", img: "/images/tv.jpg" },
      { title: "Sandcastle Kingdom", img: "/images/sand.jpg" },
      { title: "Splash Shower", img: "/images/shower.jpg" },
    ];
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Here are some activities for you 💛</h2>
      <ActivitiesGallery activities={activities} onOpenActivity={onOpenActivity} />
    </div>
  );
}
