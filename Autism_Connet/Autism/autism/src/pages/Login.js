import React, { useState } from 'react';
import { userStore } from '../userStore';
import './Auth.css';

const FLOATING_ITEMS = ['🌈','⭐','🎈','🦋','🌸','🎀','🐣','🍭','🎠','🌻','🦄','🎵','🍬','🐸','🌟'];

function Login({ onLogin, onGoRegister }) {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake]     = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError('Please fill in both your email and password. 😊');
      triggerShake();
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('That does not look like a valid email address. 📧');
      triggerShake();
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long. 🔒');
      triggerShake();
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      const emailMatch = userStore.find(u => u.email === form.email);
      if (!emailMatch) {
        setError('No account found with this email. Try registering first! 📧');
        triggerShake();
        return;
      }

      if (emailMatch.password !== form.password) {
        setError('Incorrect password. Please check and try again. 🔒');
        triggerShake();
        return;
      }

      onLogin({ name: emailMatch.name, email: emailMatch.email });
    }, 800);
  };

  return (
    <div className="auth-wrapper">
      <div className="cartoon-bg">
        <div className="cloud cloud-1">☁️</div>
        <div className="cloud cloud-2">☁️</div>
        <div className="cloud cloud-3">⛅</div>
        <div className="rainbow">🌈</div>
        <div className="sun">☀️</div>
        {FLOATING_ITEMS.map((item, i) => (
          <span key={i} className="float-item" style={{
            left: `${(i * 7 + 3) % 95}%`,
            top: `${(i * 13 + 5) % 85}%`,
            fontSize: `${1.2 + (i % 3) * 0.4}rem`,
            animationDuration: `${4 + (i % 5)}s`,
            animationDelay: `${(i * 0.4) % 4}s`,
          }}>{item}</span>
        ))}
        <div className="grass-row">
          <span>🌿</span><span>🌱</span><span>🌷</span><span>🌿</span>
          <span>🌻</span><span>🌱</span><span>🌿</span><span>🌷</span>
          <span>🌱</span><span>🌿</span><span>🌻</span><span>🌱</span>
        </div>
      </div>

      <div className={`auth-card fade-in ${shake ? 'shake' : ''}`}>
        <div className="auth-logo">
          <span className="logo-icon">🌟</span>
          <h1 className="logo-text">Autism Connect</h1>
          <p className="logo-sub">Schedule & Routine Manager</p>
        </div>

        <h2 className="auth-title">Welcome Back! 👋</h2>
        <p className="auth-desc">Sign in to manage your child's daily routines</p>

        {error && (
          <div className="auth-error bounce-in">
            <span className="error-icon">😟</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>📧 Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              className={error ? 'input-error' : ''}
            />
          </div>
          <div className="form-group">
            <label>🔒 Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className={error ? 'input-error' : ''}
            />
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? <span className="loader"></span> : '✨ Sign In'}
          </button>
        </form>

        <div className="demo-hint">
          💡 Demo: <strong>caregiver@demo.com</strong> / <strong>demo123</strong>
        </div>

        <p className="auth-switch">
          Don't have an account?{' '}
          <button className="link-btn" onClick={onGoRegister}>Create one here 🚀</button>
        </p>
      </div>
    </div>
  );
}

export default Login;