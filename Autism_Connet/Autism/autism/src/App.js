import React, { useState, useEffect } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ChildProfile from './pages/ChildProfile';
import ScheduleBuilder from './pages/ScheduleBuilder';
import ChildView from './pages/ChildView';

function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);

  // Load children and schedules from localStorage on first render
  const [children, setChildren] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ac_children')) || []; }
    catch { return []; }
  });

  const [schedules, setSchedules] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ac_schedules')) || {}; }
    catch { return {}; }
  });

  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedScheduleDate, setSelectedScheduleDate] = useState(null);

  // Save children to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ac_children', JSON.stringify(children));
  }, [children]);

  // Save schedules to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ac_schedules', JSON.stringify(schedules));
  }, [schedules]);

  const navigate = (target) => setPage(target);

  const handleRegister = (userData) => {
    setUser(userData);
    setPage('dashboard');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setPage('dashboard');
  };

  // Logout only clears the session user — children & schedules stay in localStorage
  const handleLogout = () => {
    setUser(null);
    setSelectedChild(null);
    setPage('login');
  };

  const addChild = (child) => {
    const newChild = { ...child, id: Date.now() };
    setChildren(prev => [...prev, newChild]);
  };

  const updateChild = (id, updatedData) => {
    setChildren(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
  };

  const deleteChild = (id) => {
    setChildren(prev => prev.filter(c => c.id !== id));
    setSchedules(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        if (key.startsWith(`${id}_`)) delete updated[key];
      });
      return updated;
    });
  };

  const saveSchedule = (childId, date, activities) => {
    const key = `${childId}_${date}`;
    setSchedules(prev => ({ ...prev, [key]: activities }));
  };

  const getSchedule = (childId, date) => {
    const key = `${childId}_${date}`;
    return schedules[key] || [];
  };

  const updateActivityStatus = (childId, date, activityId, status) => {
    const key = `${childId}_${date}`;
    setSchedules(prev => ({
      ...prev,
      [key]: (prev[key] || []).map(a => a.id === activityId ? { ...a, status } : a)
    }));
  };

  const commonProps = {
    user, children, schedules, selectedChild, selectedScheduleDate,
    navigate, handleLogout, addChild, updateChild, deleteChild,
    saveSchedule, getSchedule, updateActivityStatus,
    setSelectedChild, setSelectedScheduleDate
  };

  return (
    <div className="App">
      {page === 'login'    && <Login onLogin={handleLogin} onGoRegister={() => navigate('register')} />}
      {page === 'register' && <Register onRegister={handleRegister} onGoLogin={() => navigate('login')} />}
      {page === 'dashboard'       && <Dashboard {...commonProps} saveSchedule={saveSchedule} />}
      {page === 'child-profile'   && <ChildProfile {...commonProps} />}
      {page === 'schedule-builder'&& <ScheduleBuilder {...commonProps} />}
      {page === 'child-view'      && <ChildView {...commonProps} />}
    </div>
  );
}

export default App;