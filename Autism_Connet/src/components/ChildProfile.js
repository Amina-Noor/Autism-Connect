import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './ChildProfile.css';

const AVATARS = ['🧒', '👦', '👧', '🧑', '👶', '🐻', '🦁', '🐨', '🐼', '🐸'];
const COLORS = ['#A8D0EE', '#B5E2CB', '#FFD08A', '#DDD8F0', '#FADADD', '#D4ECC6', '#FDE3B8', '#C8E6FF'];

function ChildProfile({ user, children, navigate, handleLogout, addChild, updateChild, deleteChild }) {
  const [showForm, setShowForm] = useState(false);
  const [editChild, setEditChild] = useState(null);
  const [form, setForm] = useState({ name: '', age: '', preferences: '', avatar: '🧒', color: COLORS[0] });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const resetForm = () => {
    setForm({ name: '', age: '', preferences: '', avatar: '🧒', color: COLORS[0] });
    setEditChild(null);
    setShowForm(false);
  };

  const handleEdit = (child) => {
    setForm({ name: child.name, age: child.age, preferences: child.preferences || '', avatar: child.avatar || '🧒', color: child.color || COLORS[0] });
    setEditChild(child);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.age) return;
    if (editChild) {
      updateChild(editChild.id, form);
    } else {
      addChild(form);
    }
    resetForm();
  };

  return (
    <div className="page-wrapper">
      <Navbar user={user} navigate={navigate} handleLogout={handleLogout} currentPage="child-profile" />
      <main className="profile-main fade-in">
        <div className="profile-header">
          <div>
            <h1 className="dash-title">👧 Child Profiles</h1>
            <p className="dash-subtitle">Create and manage profiles for each child in your care.</p>
          </div>
          <button className="btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
            + Add New Child
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="profile-form-card fade-in">
            <h2 className="form-title">{editChild ? '✏️ Edit Profile' : '➕ New Child Profile'}</h2>
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Child's Name *</label>
                  <input
                    type="text"
                    placeholder="Enter child's name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Age (years) *</label>
                  <input
                    type="number"
                    min="1" max="18"
                    placeholder="e.g. 7"
                    value={form.age}
                    onChange={e => setForm({ ...form, age: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Sensory Preferences / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Prefers calm music, dislikes bright lights"
                  value={form.preferences}
                  onChange={e => setForm({ ...form, preferences: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Choose Avatar</label>
                <div className="avatar-picker">
                  {AVATARS.map(av => (
                    <button
                      type="button"
                      key={av}
                      className={`avatar-opt ${form.avatar === av ? 'selected' : ''}`}
                      onClick={() => setForm({ ...form, avatar: av })}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Profile Color</label>
                <div className="color-picker">
                  {COLORS.map(c => (
                    <button
                      type="button"
                      key={c}
                      className={`color-opt ${form.color === c ? 'selected' : ''}`}
                      style={{ background: c }}
                      onClick={() => setForm({ ...form, color: c })}
                    />
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editChild ? '💾 Save Changes' : '✨ Create Profile'}
                </button>
                <button type="button" className="btn-secondary" onClick={resetForm}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Children List */}
        {children.length === 0 && !showForm ? (
          <div className="empty-state">
            <div className="empty-icon">👶</div>
            <h3>No Profiles Created Yet</h3>
            <p>Click "Add New Child" to create your first child profile.</p>
          </div>
        ) : (
          <div className="profiles-grid">
            {children.map((child, i) => (
              <div className="profile-card fade-in" key={child.id} style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="profile-card-avatar" style={{ background: child.color || COLORS[0] }}>
                  {child.avatar || '🧒'}
                </div>
                <div className="profile-card-info">
                  <h3>{child.name}</h3>
                  <p>Age: <strong>{child.age}</strong> years</p>
                  {child.preferences && <p className="pref-note">💡 {child.preferences}</p>}
                </div>
                <div className="profile-card-actions">
                  <button className="action-btn btn-blue" onClick={() => handleEdit(child)}>✏️ Edit</button>
                  <button className="action-btn btn-danger" onClick={() => setDeleteConfirm(child.id)}>🗑️ Delete</button>
                </div>

                {deleteConfirm === child.id && (
                  <div className="delete-confirm">
                    <p>⚠️ Delete <strong>{child.name}</strong>'s profile and all their schedules?</p>
                    <div className="confirm-actions">
                      <button className="btn-danger" onClick={() => { deleteChild(child.id); setDeleteConfirm(null); }}>Yes, Delete</button>
                      <button className="btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ChildProfile;
