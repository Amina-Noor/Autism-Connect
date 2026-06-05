import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const today = new Date().toISOString().split('T')[0];

const TIPS = [
  { icon: '🌅', tip: 'Morning routines help children feel safe. Keep the order consistent every day.' },
  { icon: '⏰', tip: 'Use visual timers alongside the schedule so children can see time passing.' },
  { icon: '🎉', tip: 'Celebrate every completed task — even a high-five makes a big difference!' },
  { icon: '🎵', tip: 'Background music (soft instrumentals) can help with focus during activities.' },
  { icon: '🌿', tip: 'Short outdoor breaks between tasks improve attention and mood significantly.' },
  { icon: '📸', tip: 'Taking photos of completed tasks builds a visual record of progress over time.' },
];

const QUICK_ACTIVITIES = [
  { icon: '🍳', name: 'Breakfast', time: '08:00' },
  { icon: '🦷', name: 'Brush Teeth', time: '08:30' },
  { icon: '👕', name: 'Get Dressed', time: '09:00' },
  { icon: '📚', name: 'Reading Time', time: '10:00' },
  { icon: '🎨', name: 'Art & Craft', time: '11:00' },
  { icon: '🥗', name: 'Lunch', time: '12:30' },
  { icon: '😴', name: 'Nap / Rest', time: '13:00' },
  { icon: '🏃', name: 'Exercise', time: '15:00' },
  { icon: '🍽️', name: 'Dinner', time: '18:00' },
  { icon: '🌙', name: 'Bed Time', time: '20:00' },
];

function Dashboard({ user, children, schedules, navigate, handleLogout, setSelectedChild, setSelectedScheduleDate, getSchedule, saveSchedule }) {
  const [tipIdx] = useState(Math.floor(Math.random() * TIPS.length));
  const [quickMsg, setQuickMsg] = useState('');

  const getTodayStats = (child) => {
    const acts = getSchedule(child.id, today);
    const completed = acts.filter(a => a.status === 'Completed').length;
    return { total: acts.length, completed, pending: acts.length - completed };
  };

  const allActivitiesToday = children.flatMap(c => getSchedule(c.id, today));
  const totalCompleted = allActivitiesToday.filter(a => a.status === 'Completed').length;
  const totalPending = allActivitiesToday.length - totalCompleted;
  const overallPct = allActivitiesToday.length > 0
    ? Math.round((totalCompleted / allActivitiesToday.length) * 100) : 0;

  const addQuickActivity = (child, act) => {
    const existing = getSchedule(child.id, today);
    const already = existing.find(a => a.name === act.name && a.time === act.time);
    if (already) {
      setQuickMsg(`"${act.name}" is already in ${child.name}'s schedule!`);
    } else {
      const updated = [...existing, { ...act, id: Date.now(), status: 'Pending' }];
      saveSchedule(child.id, today, updated);
      setQuickMsg(`✅ Added "${act.name}" to ${child.name}'s schedule!`);
    }
    setTimeout(() => setQuickMsg(''), 3000);
  };

  return (
    <div className="page-wrapper">
      <Navbar user={user} navigate={navigate} handleLogout={handleLogout} currentPage="dashboard" />
      <main className="dashboard-main fade-in">
        <div className="dash-header">
          <div>
            <h1 className="dash-title">🏠 Caregiver Dashboard</h1>
            <p className="dash-subtitle">Welcome back, <strong>{user?.name}</strong>! Here's today's overview.</p>
          </div>
          <div className="dash-date">
            <span>📅</span>
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        <div className="tip-banner">
          <span className="tip-icon">{TIPS[tipIdx].icon}</span>
          <div>
            <span className="tip-label">Tip of the Day</span>
            <p className="tip-text">{TIPS[tipIdx].tip}</p>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card stat-blue">
            <div className="stat-icon">👧</div>
            <div className="stat-num">{children.length}</div>
            <div className="stat-label">Child Profiles</div>
          </div>
          <div className="stat-card stat-green">
            <div className="stat-icon">✅</div>
            <div className="stat-num">{totalCompleted}</div>
            <div className="stat-label">Completed Today</div>
          </div>
          <div className="stat-card stat-orange">
            <div className="stat-icon">⏳</div>
            <div className="stat-num">{totalPending}</div>
            <div className="stat-label">Still Pending</div>
          </div>
          <div className="stat-card stat-purple">
            <div className="stat-icon">🎯</div>
            <div className="stat-num">{overallPct}%</div>
            <div className="stat-label">Overall Progress</div>
          </div>
        </div>

        {allActivitiesToday.length > 0 && (
          <div className="overall-progress-bar-section">
            <div className="op-label">
              <span>📊 Today's Overall Completion</span>
              <span>{totalCompleted} / {allActivitiesToday.length} activities</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${overallPct}%` }}></div>
            </div>
          </div>
        )}

        {children.length > 0 && (
          <div className="quick-add-section">
            <h2 className="section-title">⚡ Quick Add Activities to Today's Schedules</h2>
            <p className="section-sub">Click any activity button under a child's avatar to quickly add it to their schedule.</p>
            {quickMsg && <div className="quick-msg bounce-in">{quickMsg}</div>}
            <div className="quick-act-grid">
              {QUICK_ACTIVITIES.map(act => (
                <div key={act.name} className="quick-act-item">
                  <div className="quick-act-icon">{act.icon}</div>
                  <div className="quick-act-name">{act.name}</div>
                  <div className="quick-act-time">{act.time}</div>
                  <div className="quick-act-children">
                    {children.map(c => (
                      <button
                        key={c.id}
                        className="quick-add-btn"
                        title={`Add to ${c.name}`}
                        onClick={() => addQuickActivity(c, act)}
                      >
                        {c.avatar} +
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="section-header">
          <h2 className="section-title">👨‍👩‍👧 Children Overview</h2>
          <button className="btn-primary small-btn" onClick={() => navigate('child-profile')}>
            + Add Child
          </button>
        </div>

        {children.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👶</div>
            <h3>No Child Profiles Yet</h3>
            <p>Create a child profile to start building daily schedules.</p>
            <button className="btn-primary" onClick={() => navigate('child-profile')}>
              + Create First Profile
            </button>
          </div>
        ) : (
          <div className="children-grid">
            {children.map((child, i) => {
              const stats = getTodayStats(child);
              const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
              const mood = pct === 0 ? '😐' : pct < 50 ? '🙂' : pct < 100 ? '😄' : '🥳';
              return (
                <div className="child-card fade-in" key={child.id} style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="child-card-top">
                    <div className="child-avatar" style={{ background: child.color || 'var(--primary-light)' }}>
                      {child.avatar || '🧒'}
                    </div>
                    <div className="child-info">
                      <div className="child-name-row">
                        <h3 className="child-name">{child.name}</h3>
                        <span className="child-mood">{mood}</span>
                      </div>
                      <p className="child-age">Age: {child.age} years</p>
                      {child.preferences && <p className="child-pref">💡 {child.preferences}</p>}
                    </div>
                  </div>
                  <div className="progress-section">
                    <div className="progress-label">
                      <span>Today's Progress</span>
                      <span className="progress-pct">{pct}%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${pct}%` }}></div>
                    </div>
                    <div className="progress-stats">
                      <span className="badge badge-green">✅ {stats.completed} Done</span>
                      <span className="badge badge-orange">⏳ {stats.pending} Pending</span>
                      <span className="badge badge-blue">📋 {stats.total} Total</span>
                    </div>
                  </div>
                  {pct === 100 && stats.total > 0 && (
                    <div className="all-done-strip">🎉 All tasks completed! Wonderful day!</div>
                  )}
                  <div className="child-actions">
                    <button className="action-btn btn-blue" onClick={() => {
                      setSelectedChild(child);
                      setSelectedScheduleDate(today);
                      navigate('schedule-builder');
                    }}>
                      📅 Manage Schedule
                    </button>
                    <button className="action-btn btn-green" onClick={() => {
                      setSelectedChild(child);
                      setSelectedScheduleDate(today);
                      navigate('child-view');
                    }}>
                      👁️ Child View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
