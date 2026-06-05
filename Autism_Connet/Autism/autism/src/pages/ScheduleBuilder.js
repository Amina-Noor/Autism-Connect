import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './ScheduleBuilder.css';

const ACTIVITY_ICONS = [
  { icon: '🍳', label: 'Breakfast' },
  { icon: '🥗', label: 'Lunch' },
  { icon: '🍽️', label: 'Dinner' },
  { icon: '🛁', label: 'Bath' },
  { icon: '🦷', label: 'Brush Teeth' },
  { icon: '📚', label: 'Reading' },
  { icon: '✏️', label: 'Homework' },
  { icon: '🎨', label: 'Art' },
  { icon: '🏃', label: 'Exercise' },
  { icon: '🎮', label: 'Play Time' },
  { icon: '😴', label: 'Nap Time' },
  { icon: '🌙', label: 'Bed Time' },
  { icon: '🧸', label: 'Toy Time' },
  { icon: '🎵', label: 'Music' },
  { icon: '🌳', label: 'Outdoor' },
  { icon: '💊', label: 'Medicine' },
  { icon: '🧩', label: 'Puzzle' },
  { icon: '🚿', label: 'Shower' },
  { icon: '👕', label: 'Get Dressed' },
  { icon: '🚌', label: 'School' },
];

const today = new Date().toISOString().split('T')[0];

function ScheduleBuilder({ user, children, navigate, handleLogout, selectedChild, selectedScheduleDate, setSelectedChild, setSelectedScheduleDate, saveSchedule, getSchedule }) {
  const [date, setDate] = useState(selectedScheduleDate || today);
  const [child, setChild] = useState(selectedChild || null);
  const [showForm, setShowForm] = useState(false);
  const [editActivity, setEditActivity] = useState(null);
  const [form, setForm] = useState({ name: '', time: '', icon: '🍳', status: 'Pending' });

  const activities = child ? getSchedule(child.id, date) : [];

  const sorted = [...activities].sort((a, b) => a.time.localeCompare(b.time));

  const resetForm = () => {
    setForm({ name: '', time: '', icon: '🍳', status: 'Pending' });
    setEditActivity(null);
    setShowForm(false);
  };

  const handleEditActivity = (act) => {
    setForm({ name: act.name, time: act.time, icon: act.icon, status: act.status });
    setEditActivity(act);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.time || !child) return;
    let updated;
    if (editActivity) {
      updated = activities.map(a => a.id === editActivity.id ? { ...a, ...form } : a);
    } else {
      const newAct = { ...form, id: Date.now() };
      updated = [...activities, newAct];
    }
    saveSchedule(child.id, date, updated);
    resetForm();
  };

  const handleDelete = (id) => {
    const updated = activities.filter(a => a.id !== id);
    saveSchedule(child.id, date, updated);
  };

  const toggleStatus = (id) => {
    const updated = activities.map(a => a.id === id
      ? { ...a, status: a.status === 'Completed' ? 'Pending' : 'Completed' }
      : a
    );
    saveSchedule(child.id, date, updated);
  };

  const completed = sorted.filter(a => a.status === 'Completed').length;

  return (
    <div className="page-wrapper">
      <Navbar user={user} navigate={navigate} handleLogout={handleLogout} currentPage="dashboard" />
      <main className="builder-main fade-in">
        <div className="builder-header">
          <div>
            <button className="back-btn" onClick={() => navigate('dashboard')}>← Back to Dashboard</button>
            <h1 className="dash-title">📅 Schedule Builder</h1>
            <p className="dash-subtitle">Build and manage daily activities for your child.</p>
          </div>
        </div>

        {/* Controls */}
        <div className="builder-controls">
          <div className="form-group">
            <label>Select Child</label>
            <select
              value={child?.id || ''}
              onChange={e => {
                const c = children.find(ch => ch.id === Number(e.target.value));
                setChild(c || null);
                setSelectedChild(c || null);
              }}
            >
              <option value="">-- Select a child --</option>
              {children.map(c => (
                <option key={c.id} value={c.id}>{c.avatar} {c.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Select Date</label>
            <input
              type="date"
              value={date}
              onChange={e => { setDate(e.target.value); setSelectedScheduleDate(e.target.value); }}
            />
          </div>
          {child && (
            <button className="btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
              + Add Activity
            </button>
          )}
        </div>

        {!child && (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>Select a Child to Begin</h3>
            <p>Choose a child profile above to view or build their schedule.</p>
          </div>
        )}

        {child && (
          <>
            {/* Progress Summary */}
            <div className="schedule-summary">
              <div className="summary-child">
                <span className="summary-avatar" style={{ background: child.color }}>{child.avatar}</span>
                <div>
                  <strong>{child.name}'s Schedule</strong>
                  <span className="summary-date">{new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
              <div className="summary-stats">
                <span className="badge badge-green">✅ {completed} Completed</span>
                <span className="badge badge-orange">⏳ {sorted.length - completed} Pending</span>
                <span className="badge badge-blue">📋 {sorted.length} Total</span>
              </div>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
              <div className="activity-form-card fade-in">
                <h3>{editActivity ? '✏️ Edit Activity' : '➕ New Activity'}</h3>
                <form onSubmit={handleSubmit} className="activity-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Activity Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Morning Breakfast"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Time Slot *</label>
                      <input
                        type="time"
                        value={form.time}
                        onChange={e => setForm({ ...form, time: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Choose Icon</label>
                    <div className="icon-picker">
                      {ACTIVITY_ICONS.map(({ icon, label }) => (
                        <button
                          type="button"
                          key={icon}
                          className={`icon-opt ${form.icon === icon ? 'selected' : ''}`}
                          title={label}
                          onClick={() => setForm({ ...form, icon })}
                        >
                          {icon}
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      {editActivity ? '💾 Save Changes' : '✨ Add Activity'}
                    </button>
                    <button type="button" className="btn-secondary" onClick={resetForm}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            {/* Activities List */}
            {sorted.length === 0 ? (
              <div className="empty-state" style={{ marginTop: '24px' }}>
                <div className="empty-icon">📭</div>
                <h3>No Activities Yet</h3>
                <p>Click "Add Activity" to start building today's schedule.</p>
              </div>
            ) : (
              <div className="activities-list">
                {sorted.map((act, i) => (
                  <div
                    className={`activity-item fade-in ${act.status === 'Completed' ? 'completed' : ''}`}
                    key={act.id}
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <div className="activity-time">
                      {act.time}
                    </div>
                    <div className="activity-icon-big">{act.icon}</div>
                    <div className="activity-details">
                      <h4 className="activity-name">{act.name}</h4>
                      <span className={`status-badge ${act.status === 'Completed' ? 'status-done' : 'status-pending'}`}>
                        {act.status === 'Completed' ? '✅ Completed' : '⏳ Pending'}
                      </span>
                    </div>
                    <div className="activity-btns">
                      <button
                        className={`toggle-btn ${act.status === 'Completed' ? 'undo-btn' : 'complete-btn'}`}
                        onClick={() => toggleStatus(act.id)}
                      >
                        {act.status === 'Completed' ? '↩ Undo' : '✓ Done'}
                      </button>
                      <button className="icon-action-btn edit-btn" onClick={() => handleEditActivity(act)}>✏️</button>
                      <button className="icon-action-btn del-btn" onClick={() => handleDelete(act.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {sorted.length > 0 && (
              <div className="child-view-cta">
                <button className="btn-primary" onClick={() => navigate('child-view')}>
                  👁️ Switch to Child View
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default ScheduleBuilder;
