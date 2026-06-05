import React from 'react';
import './Navbar.css';

function Navbar({ user, navigate, handleLogout, currentPage }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('dashboard')}>
        <span className="navbar-icon">🌟</span>
        <span className="navbar-logo">Autism Connect</span>
      </div>
      <div className="navbar-links">
        <button
          className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => navigate('dashboard')}
        >
          🏠 Dashboard
        </button>
        <button
          className={`nav-btn ${currentPage === 'child-profile' ? 'active' : ''}`}
          onClick={() => navigate('child-profile')}
        >
          👧 Child Profiles
        </button>
      </div>
      <div className="navbar-user">
        <span className="user-greeting">👋 Hello, <strong>{user?.name}</strong></span>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
