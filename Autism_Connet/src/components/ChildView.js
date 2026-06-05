import React, { useState } from 'react';
import './ChildView.css';

// ================= VIDEO IMPORTS =================
import breakfastVideo from '../assets/videos/breakfast.mp4';
import brushVideo from '../assets/videos/brush-teeth.mp4';
import dressVideo from '../assets/videos/get-dressed.mp4';
import readingVideo from '../assets/videos/reading.mp4';
import artVideo from '../assets/videos/art.mp4';
import exerciseVideo from '../assets/videos/exercise.mp4';
import homeworkVideo from '../assets/videos/homework.mp4';
import cleaningVideo from '../assets/videos/clean-room.mp4';

// ================= SOUND IMPORTS =================
import amazingSound from '../assets/Music/amazing.mp3';
import wowSound from '../assets/Music/wow.mp3';
import legendarySound from '../assets/Music/legendary.mp3';
import awesomeSound from '../assets/Music/awesome.mp3';

// Age-appropriate suggested activities for older children (8-15)
const OLDER_ACTIVITIES = [
  { icon: '📖', name: 'Independent Reading', desc: 'Read a book or article on your own', minAge: 8 },
  { icon: '✏️', name: 'Homework', desc: 'Complete your school assignments', minAge: 8 },
  { icon: '🍳', name: 'Help Prepare Lunch', desc: 'Help in the kitchen with supervision', minAge: 9 },
  { icon: '🧹', name: 'Room Tidying', desc: 'Organise and clean your room', minAge: 8 },
  { icon: '🎸', name: 'Practice Instrument', desc: 'Practise your musical instrument', minAge: 8 },
  { icon: '🖥️', name: 'Educational Game', desc: 'Play a learning game on the computer', minAge: 8 },
  { icon: '🏋️', name: 'Exercise Routine', desc: 'Do your stretches or workout', minAge: 10 },
  { icon: '🧩', name: 'Complex Puzzle', desc: 'Work on a 100+ piece puzzle', minAge: 8 },
  { icon: '🎨', name: 'Art Project', desc: 'Work on a creative art project', minAge: 8 },
  { icon: '🚿', name: 'Independent Shower', desc: 'Shower and get ready independently', minAge: 10 },
  { icon: '🧺', name: 'Help with Laundry', desc: 'Sort or fold clean laundry', minAge: 10 },
  { icon: '📝', name: 'Journal Writing', desc: 'Write in your personal journal', minAge: 9 },
];

// ================= LOCAL VIDEOS =================
const TUTORIALS = {
  'Breakfast': {
    id: breakfastVideo,
    title: 'How to Make a Healthy Breakfast 🍳'
  },

  'Brush Teeth': {
    id: brushVideo,
    title: 'How to Brush Your Teeth Correctly 🦷'
  },

  'Get Dressed': {
    id: dressVideo,
    title: 'Getting Dressed Step by Step 👕'
  },

  'Reading Time': {
    id: readingVideo,
    title: 'Fun Reading Tips for Kids 📚'
  },

  'Art & Craft': {
    id: artVideo,
    title: 'Easy Art & Craft Ideas 🎨'
  },

  'Exercise': {
    id: exerciseVideo,
    title: 'Fun Exercise for Kids 🏃'
  },

  'Independent Reading': {
    id: readingVideo,
    title: 'How to Read Independently 📖'
  },

  'Homework': {
    id: homeworkVideo,
    title: 'Study Tips for Students ✏️'
  },

  'Room Tidying': {
    id: cleaningVideo,
    title: 'How to Clean Your Room 🧹'
  },
};

const playSuccessSound = (level) => {
  let sound;

  if (level === 0) {
    sound = wowSound;
  } 
  else if (level === 1) {
    sound = amazingSound;
  } 
  else if (level === 2) {
    sound = legendarySound;
  } 
  else {
    sound = awesomeSound;
  }

  const audio = new Audio(sound);
  audio.volume = 1;
  audio.play().catch(() => {});
};

function ChildView({ selectedChild, selectedScheduleDate, getSchedule, saveSchedule, navigate = () => {} }) {
  const child = selectedChild;
  const date = selectedScheduleDate || new Date().toISOString().split('T')[0];

  const [celebrateId, setCelebrateId] = useState(null);
  const [videoAct, setVideoAct] = useState(null);
  const [showSuggested, setShowSuggested] = useState(false);

  if (!child) {
    return (
      <div className="child-view-wrapper">
        <div className="cv-error">
          <div style={{ fontSize: '4rem' }}>😕</div>

          <h2>No child selected</h2>

          <button
            className="cv-back-btn"
            onClick={() => navigate('dashboard')}
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const age = parseInt(child.age) || 0;

  const isOlderChild = age >= 8 && age <= 15;

  const activities = getSchedule(child.id, date);

  const sorted = [...activities].sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  const completed = sorted.filter(
    a => a.status === 'Completed'
  ).length;

  const total = sorted.length;

  const allDone = total > 0 && completed === total;

  const TOO_YOUNG_ACTIVITIES = [
    'Homework',
    'Independent Reading',
    'Help Prepare Lunch',
    'Room Tidying',
    'Exercise Routine',
    'Independent Shower',
    'Help with Laundry'
  ];

  const flaggedActivities = sorted.filter(
    a => age < 8 && TOO_YOUNG_ACTIVITIES.includes(a.name)
  );

 const handleMark = (id) => {

  const act = activities.find(a => a.id === id);

  const wasAlreadyDone = act?.status === 'Completed';

  const updated = activities.map(a =>
    a.id === id
      ? {
          ...a,
          status:
            a.status === 'Completed'
              ? 'Pending'
              : 'Completed'
        }
      : a
  );

  saveSchedule(child.id, date, updated);

  // 🎯 ONLY PLAY SOUND WHEN MARKING AS COMPLETED (not undo)
  if (!wasAlreadyDone) {

    const newCompletedCount =
      updated.filter(a => a.status === 'Completed').length;

    // LEVEL SYSTEM
    let level = 0;

    if (newCompletedCount === 1) level = 0;       // wow
    else if (newCompletedCount <= 3) level = 1;   // amazing
    else if (newCompletedCount <= 6) level = 2;   // legendary
    else level = 3;                               // awesome

    playSuccessSound(level);
  }

  if (act && act.status !== 'Completed') {
    setCelebrateId(id);
    setTimeout(() => setCelebrateId(null), 1200);
  }
};

  const formatTime = (t) => {

    if (!t) return '';

    const [h, m] = t.split(':');

    const hour = parseInt(h);

    const ampm = hour >= 12 ? 'PM' : 'AM';

    const h12 = hour % 12 || 12;

    return `${h12}:${m} ${ampm}`;
  };

  const getTutorial = (actName) =>
    TUTORIALS[actName] || null;

  const suggestedForAge = OLDER_ACTIVITIES.filter(
    a => age >= a.minAge
  );

  return (

    <div
      className="child-view-wrapper"
      style={{
        background: child.color
          ? `linear-gradient(160deg, ${child.color}55 0%, #F0F8FF 40%)`
          : undefined
      }}
    >

      {/* Top Bar */}
      <div className="cv-topbar">

        <button
          className="cv-back-btn"
          onClick={() => navigate('schedule-builder')}
        >
          ← Caregiver View
        </button>

        <span className="cv-label">
          👧 Child View
        </span>

      </div>

      {/* Child Greeting */}
      <div className="cv-greeting fade-in">

        <div
          className="cv-avatar"
          style={{
            background:
              child.color || 'var(--primary-light)'
          }}
        >
          {child.avatar || '🧒'}
        </div>

        <h1 className="cv-name">
          Hi, {child.name}! 👋
        </h1>

        <p className="cv-age-badge">
          Age {age} • {isOlderChild
            ? 'Big Kid Mode 🌟'
            : 'Little Explorer 🐣'}
        </p>

        <p className="cv-date">
          {new Date(date + 'T00:00:00').toLocaleDateString(
            'en-US',
            {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            }
          )}
        </p>

      </div>

      {/* Age Warning */}
      {flaggedActivities.length > 0 && (

        <div className="cv-age-warning bounce-in">

          <div className="age-warn-icon">
            ⚠️
          </div>

          <div>

            <strong>
              Heads up, Caregiver!
            </strong>

            <p>
              The following activities in this schedule
              are designed for children aged 8 and above.

              {child.name} is {age} years old —
              please consider if these are appropriate:

              <strong>
                {' '}
                {flaggedActivities
                  .map(a => `${a.icon} ${a.name}`)
                  .join(', ')}
              </strong>.
            </p>

          </div>

        </div>
      )}

      {/* Older Notice */}
      {isOlderChild && (

        <div className="cv-older-notice fade-in">

          <span>🌟</span>

          <span>
            You're {age} years old — you can do
            more challenging tasks!
          </span>

          <button
            className="cv-suggest-btn"
            onClick={() =>
              setShowSuggested(s => !s)
            }
          >
            {showSuggested ? 'Hide' : 'Show'} Suggested Activities
          </button>

        </div>
      )}

      {/* Suggested Panel */}
      {isOlderChild && showSuggested && (

        <div className="cv-suggested-panel fade-in">

          <h3>
            🎯 Activities Perfect for Age {age}
          </h3>

          <p>
            Ask your caregiver to add any of these
            to your schedule!
          </p>

          <div className="cv-suggested-grid">

            {suggestedForAge.map((act, i) => (

              <div
                key={i}
                className="cv-suggested-card"
              >

                <div className="cv-sugg-icon">
                  {act.icon}
                </div>

                <div className="cv-sugg-name">
                  {act.name}
                </div>

                <div className="cv-sugg-desc">
                  {act.desc}
                </div>

              </div>

            ))}

          </div>

        </div>
      )}

      {/* Progress */}
      {total > 0 && (

        <div className="cv-progress-area fade-in">

          <div className="cv-stars">

            {Array.from({
              length: Math.min(total, 10)
            }).map((_, i) => (

              <span
                key={i}
                className={`cv-star ${
                  i < Math.min(completed, 10)
                    ? 'filled'
                    : ''
                }`}
              >
                {i < Math.min(completed, 10)
                  ? '⭐'
                  : '☆'}
              </span>

            ))}

          </div>

          <p className="cv-progress-text">

            {completed === 0 &&
              "Let's start your day! 🌅"}

            {completed > 0 &&
              completed < total &&
              `Great job! ${completed} out of ${total} done! 🎉`}

            {allDone &&
              "You did it ALL! Amazing! 🏆🎊"}

          </p>

          <div className="cv-progress-bar-bg">

            <div
              className="cv-progress-bar-fill"
              style={{
                width: `${(completed / total) * 100}%`
              }}
            ></div>

          </div>

        </div>
      )}

      {/* All Done */}
      {allDone && (

        <div className="cv-all-done bounce-in">

          <div className="all-done-icon">
            🏆
          </div>

          <h2>
            All Done! Amazing Work!
          </h2>

          <p>
            You completed every task today.
            You are a superstar! ⭐
          </p>

        </div>
      )}

      {/* VIDEO MODAL */}
      {videoAct && (

        <div
          className="cv-modal-overlay"
          onClick={() => setVideoAct(null)}
        >

          <div
            className="cv-modal"
            onClick={e => e.stopPropagation()}
          >

            <div className="cv-modal-header">

              <span>
                {videoAct.icon} {videoAct.name}
                {' '}— Tutorial
              </span>

              <button
                className="cv-modal-close"
                onClick={() => setVideoAct(null)}
              >
                ✕
              </button>

            </div>

            <div className="cv-modal-body">

              {getTutorial(videoAct.name) ? (

                <>

                  <p className="cv-video-title">
                    {getTutorial(videoAct.name).title}
                  </p>

                  <div
                    className="cv-video-wrapper"
                    style={{
                      borderRadius: '22px',
                      overflow: 'hidden',
                      background: '#000',
                      boxShadow:
                        '0 10px 35px rgba(0,0,0,0.25)',
                    }}
                  >

                    <video
                      width="100%"
                      height="320"
                      controls
                      autoPlay
                      controlsList="nodownload"
                      style={{
                        width: '100%',
                        height: '320px',
                        objectFit: 'cover',
                        background: '#000',
                        borderRadius: '22px',
                      }}
                    >

                      <source
                        src={getTutorial(videoAct.name).id}
                        type="video/mp4"
                      />

                    </video>

                  </div>

                  <p className="cv-video-note">
                    ▶ Use play, pause, volume,
                    fullscreen and seek controls
                    below the video.
                  </p>

                </>

              ) : (

                <div className="cv-no-video">

                  <div style={{ fontSize: '3rem' }}>
                    🎬
                  </div>

                  <p>
                    No tutorial video available
                    for this activity yet.
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* Activities Grid */}
      {sorted.length === 0 ? (

        <div className="cv-empty">

          <div style={{ fontSize: '4rem' }}>
            📭
          </div>

          <h3>No activities for today</h3>

          <p>
            Ask your caregiver to add some activities!
          </p>

        </div>

      ) : (

        <div className="cv-activities-grid">

          {sorted.map((act, i) => {

            const tutorial = getTutorial(act.name);

            return (

              <div
                key={act.id}
                className={`cv-activity-card fade-in ${
                  act.status === 'Completed'
                    ? 'cv-done'
                    : ''
                } ${
                  celebrateId === act.id
                    ? 'cv-celebrate'
                    : ''
                }`}
                style={{
                  animationDelay: `${i * 0.08}s`
                }}
              >

                <div className="cv-act-time">
                  {formatTime(act.time)}
                </div>

                <div className="cv-act-icon">
                  {act.icon}
                </div>

                <div className="cv-act-name">
                  {act.name}
                </div>

                {tutorial && (

                  <button
                    className="cv-watch-btn"
                    onClick={() => setVideoAct(act)}
                  >
                    ▶ Watch How
                  </button>

                )}

                <button
                  className={`cv-mark-btn ${
                    act.status === 'Completed'
                      ? 'cv-mark-done'
                      : 'cv-mark-todo'
                  }`}
                  onClick={() => handleMark(act.id)}
                >

                  {act.status === 'Completed'
                    ? '✅ Done!'
                    : '👆 Tap Me!'}

                </button>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default ChildView;