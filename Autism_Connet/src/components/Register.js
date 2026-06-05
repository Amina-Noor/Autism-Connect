import React, { useState } from 'react';
import { userStore } from '../userStore';
import './Auth.css';

const FLOATING_ITEMS = ['🌈','⭐','🎈','🦋','🌸','🎀','🐣','🍭','🎠','🌻','🦄','🎵','🍬','🐸','🌟'];

function Register({ onRegister, onGoLogin }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const validate = () => {
    const errs = {};

    if (!form.name.trim())
      errs.name = 'Please enter your full name.';

    if (!form.email)
      errs.email = 'Please enter your email address.';
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = 'That does not look like a valid email address.';
    else if (userStore.find(u => u.email === form.email))
      errs.email = 'An account with this email already exists. Try logging in!';

    if (!form.password)
      errs.password = 'Please create a password.';
    else if (form.password.length < 6)
      errs.password = 'Password must be at least 6 characters long.';
    else if (!/[A-Za-z]/.test(form.password) || !/[0-9]/.test(form.password))
      errs.password = 'Password must contain at least one letter and one number.';

    if (!form.confirm)
      errs.confirm = 'Please confirm your password.';
    else if (form.password !== form.confirm)
      errs.confirm = 'Passwords do not match. Please check again.';

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      triggerShake();
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      userStore.push({
        name: form.name.trim(),
        email: form.email,
        password: form.password
      });

      onRegister({
        name: form.name.trim(),
        email: form.email
      });

    }, 800);
  };

  return (
    <div className="auth-wrapper">

      {/* background decoration */}
      <div className="cartoon-bg">
        {FLOATING_ITEMS.map((item, i) => (
          <span
            key={i}
            className="float-item"
            style={{
              left: `${(i * 7 + 3) % 95}%`,
              top: `${(i * 13 + 5) % 85}%`,
              fontSize: `${1.2 + (i % 3) * 0.4}rem`,
              animationDuration: `${4 + (i % 5)}s`,
              animationDelay: `${(i * 0.4) % 4}s`,
            }}
          >
            {item}
          </span>
        ))}
      </div>

      <div className={`auth-card fade-in ${shake ? 'shake' : ''}`}>

        <div className="auth-logo">
          <span className="logo-icon">🌟</span>
          <h1>Autism Connect</h1>
          <p>Schedule & Routine Manager</p>
        </div>

        <h2 className="auth-title">Create Account 🚀</h2>
        <p className="auth-desc">Set up your caregiver account</p>

        <form onSubmit={handleSubmit} className="auth-form">

          <div className="form-group">
            <label>👤 Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>📧 Email</label>
            <input
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>🔒 Password</label>
            <input
              name="password"
              type="password"
              placeholder="Min 6 chars + number"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>🔒 Confirm Password</label>
            <input
              name="confirm"
              type="password"
              placeholder="Repeat password"
              value={form.confirm}
              onChange={handleChange}
              className={errors.confirm ? 'input-error' : ''}
            />
            {errors.confirm && <span className="field-error">{errors.confirm}</span>}
          </div>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? <span className="loader"></span> : '🚀 Create Account'}
          </button>

        </form>

        {/* ✅ FIXED LOGIN SWITCH */}
        <p className="auth-switch">
          Already have an account?{' '}
          <button
            type="button"
            className="link-btn"
            onClick={onGoLogin}
          >
            Sign in here ✨
          </button>
        </p>

      </div>
    </div>
  );
}

export default Register;