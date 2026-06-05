import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { userStore } from '../userStore';
import './Auth.css';

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
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
      setError('⚠️ Please fill in both email and password.');
      triggerShake();
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('📧 Please enter a valid email address.');
      triggerShake();
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const user = userStore.find(u => u.email === form.email);

      if (!user) {
        setError('😟 No account found. Please register first.');
        triggerShake();
        return;
      }

      if (user.password !== form.password) {
        setError('🔒 Incorrect password. Try again!');
        triggerShake();
        return;
      }

      setSuccess(true);
      setError('');

      onLogin({ name: user.name, email: user.email });

      setTimeout(() => {
        navigate("/age", { replace: true });
      }, 1000);

    }, 900);
  };

  return (
    <div className="auth-wrapper">

      {/* background glow */}
      <div className="bg-glow"></div>

      <div className={`auth-card fade-in ${shake ? 'shake' : ''} ${success ? 'success-pop' : ''}`}>

        <div className="auth-logo">
          <div className="logo-icon">🌟</div>
          <h1>Autism Connect</h1>
          <p>Smart Routine & Care Platform</p>
        </div>

        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Sign in to continue</p>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">Login successful ✨ Redirecting...</div>}

        <form onSubmit={handleSubmit} className="auth-form">

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className={error ? 'input-error' : ''}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className={error ? 'input-error' : ''}
            />
          </div>

          <button className="btn-primary" disabled={loading || success}>
            {loading ? <span className="loader"></span> : "Sign In"}
          </button>

        </form>

        {/* FIXED SWITCH BUTTON */}
        <p className="auth-switch">
          Don't have an account?{' '}
          <button
            type="button"
            className="link-btn"
            onClick={() => navigate("/register")}
          >
            Create account ✨
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;