import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// =========================
// AUTH + MAIN PAGES
// =========================
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ChildProfile from "./components/ChildProfile";
import ScheduleBuilder from "./components/ScheduleBuilder";
import ChildView from "./components/ChildView";

// =========================
// COMPONENT SCREENS
// =========================
import HomeScreen from "./components/HomeScreen";
import AgeScreenWithButtons from "./components/AgeScreenWithButtons";
import EmotionBotForToddlers from "./components/EmotionBotForToddlers";
import Activities from "./components/Activities";
import EmotionBot10_15 from "./components/EmotionBot10_15";

// =========================
// EMOTION ACTIVITIES
// =========================
import HappyAct from "./components/HappyAct";
import AngryAct from "./components/AngryAct";
import SadAct from "./components/SadAct";
import ScaredAct from "./components/ScaredAct";
import BoredAct from "./components/BoredAct";
import TiredAct from "./components/TiredAct";
import ShyAct from "./components/ShyAct";
import ConfusedAct from "./components/ConfusedAct";

import ParentInfo from "./components/ParentInfo";

// =========================
// FEATURES
// =========================
import StoryMode from "./components/StoryMode";
import AvatarCustomizer from "./components/AvatarCustomizer";
import SoundBoard from "./components/SoundBoard";
import MiniGame from "./components/MiniGame";

// =========================
// GAMES
// =========================
import MathGame from "./components/MathGame";
import AlphabetGame from "./components/AlphabetGame";
import ColorShapesGame from "./components/ColorShapesGame";

// =========================
// STORY
// =========================
import StoryBuilder from "./components/StoryBuilder";

function App() {
  // =========================
  // APP STATE
  // =========================
  const [user, setUser] = useState(null);

  // Load children from localStorage
  const [children, setChildren] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ac_children")) || [];
    } catch {
      return [];
    }
  });

  // Load schedules from localStorage
  const [schedules, setSchedules] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ac_schedules")) || {};
    } catch {
      return {};
    }
  });

  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedScheduleDate, setSelectedScheduleDate] =
    useState(null);

  // =========================
  // SAVE TO LOCAL STORAGE
  // =========================
  useEffect(() => {
    localStorage.setItem(
      "ac_children",
      JSON.stringify(children)
    );
  }, [children]);

  useEffect(() => {
    localStorage.setItem(
      "ac_schedules",
      JSON.stringify(schedules)
    );
  }, [schedules]);

  // =========================
  // AUTH
  // =========================
  const handleRegister = (userData) => {
    setUser(userData);
  };

  const handleLogin = (userData) => {
    console.log("Logged in user:", userData);
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedChild(null);
  };

  // =========================
  // CHILD MANAGEMENT
  // =========================
  const addChild = (child) => {
    const newChild = {
      ...child,
      id: Date.now(),
    };

    setChildren((prev) => [...prev, newChild]);
  };

  const updateChild = (id, updatedData) => {
    setChildren((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, ...updatedData } : c
      )
    );
  };

  const deleteChild = (id) => {
    setChildren((prev) =>
      prev.filter((c) => c.id !== id)
    );

    setSchedules((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((key) => {
        if (key.startsWith(`${id}_`)) {
          delete updated[key];
        }
      });

      return updated;
    });
  };

  // =========================
  // SCHEDULE MANAGEMENT
  // =========================
  const saveSchedule = (
    childId,
    date,
    activities
  ) => {
    const key = `${childId}_${date}`;

    setSchedules((prev) => ({
      ...prev,
      [key]: activities,
    }));
  };

  const getSchedule = (childId, date) => {
    const key = `${childId}_${date}`;
    return schedules[key] || [];
  };

  const updateActivityStatus = (
    childId,
    date,
    activityId,
    status
  ) => {
    const key = `${childId}_${date}`;

    setSchedules((prev) => ({
      ...prev,
      [key]: (prev[key] || []).map((a) =>
        a.id === activityId
          ? { ...a, status }
          : a
      ),
    }));
  };

  // =========================
  // COMMON PROPS
  // =========================
  const commonProps = {
    user,
    children,
    schedules,
    selectedChild,
    selectedScheduleDate,

    handleLogout,
    addChild,
    updateChild,
    deleteChild,

    saveSchedule,
    getSchedule,
    updateActivityStatus,

    setSelectedChild,
    setSelectedScheduleDate,
  };

  return (
    <Router>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<HomeScreen />} />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            <Login onLogin={handleLogin} />
          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={
            <Register
              onRegister={handleRegister}
            />
          }
        />

        {/* AGE SCREEN */}
        <Route
          path="/age"
          element={<AgeScreenWithButtons />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              {...commonProps}
            />
          }
        />

        {/* CHILD PROFILE */}
        <Route
          path="/child-profile"
          element={
            <ChildProfile
              {...commonProps}
            />
          }
        />

        {/* SCHEDULE BUILDER */}
        <Route
          path="/schedule-builder"
          element={
            <ScheduleBuilder
              {...commonProps}
            />
          }
        />

        {/* CHILD VIEW */}
        <Route
          path="/child-view"
          element={
            <ChildView
              {...commonProps}
            />
          }
        />

        {/* BOT ROUTES */}
        <Route
          path="/emotion-bot-0-5"
          element={
            <EmotionBotForToddlers />
          }
        />

        <Route
          path="/emotion-bot-10-15"
          element={<EmotionBot10_15 />}
        />

        {/* ACTIVITIES */}
        <Route
          path="/activities"
          element={<Activities />}
        />

        {/* EMOTIONS */}
        <Route
          path="/happy"
          element={<HappyAct />}
        />

        <Route
          path="/angry"
          element={<AngryAct />}
        />

        <Route
          path="/sad"
          element={<SadAct />}
        />

        <Route
          path="/scared"
          element={<ScaredAct />}
        />

        <Route
          path="/bored"
          element={<BoredAct />}
        />

        <Route
          path="/tired"
          element={<TiredAct />}
        />

        <Route
          path="/shy"
          element={<ShyAct />}
        />

        <Route
          path="/confused"
          element={<ConfusedAct />}
        />

        {/* PARENT INFO */}
        <Route
          path="/parent-info"
          element={<ParentInfo />}
        />

        {/* FEATURES */}
        <Route
          path="/soundboard"
          element={<SoundBoard />}
        />

        <Route
          path="/mini-game"
          element={<MiniGame />}
        />

        <Route
          path="/story-mode"
          element={<StoryMode />}
        />

        <Route
          path="/avatar-customizer"
          element={<AvatarCustomizer />}
        />

        {/* GAMES */}
        <Route
          path="/math-game"
          element={<MathGame />}
        />

        <Route
          path="/alphabet-game"
          element={<AlphabetGame />}
        />

        <Route
          path="/color-shapes-game"
          element={<ColorShapesGame />}
        />

        {/* STORY */}
        <Route
          path="/story/:theme"
          element={<StoryBuilder />}
        />

      </Routes>
    </Router>
  );
}

export default App;