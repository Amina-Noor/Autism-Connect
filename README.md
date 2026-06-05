# Autism Connect (ASEOS)

A full-stack intelligent web application developed as a **Web Engineering** course project at Fatima Jinnah Women University. Autism Connect (formally ASEOS — Autism Schedule & Emotional Organization System) is designed to help caregivers of children with Autism Spectrum Disorder (ASD) manage daily schedules, predict emotional states using Machine Learning, and receive activity recommendations — all through an accessible, child-friendly interface.

> ⚠️ **Disclaimer:** This is an academic prototype. It is NOT a medical device or diagnostic tool. It does not replace professional autism services.

---

## 📌 Project Overview

Children with ASD benefit greatly from structured routines and emotional support. Caregivers often lack a single digital tool that combines scheduling, mood tracking, and actionable recommendations. Autism Connect solves this by bringing all three together in one web application.

---

## 👩‍💻 Developed By

| Name | Roll No |
|------|---------|
| Amina Noor | 2023-BSE-007 |
| Kainat Shakeel | 2023-BSE-029 |


**Department:** Software Engineering  
**University:** Fatima Jinnah Women University  


---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, Vite, CSS |
| Backend | Python, Flask, Flask-CORS |
| Machine Learning | Scikit-learn (Logistic Regression) |
| Voice Feedback | Web Speech API (Speech Synthesis) |
| Animations | canvas-confetti |
| IDE | Visual Studio Code |
| Version Control | Git + GitHub |
| API Testing | Postman |

---

## ✨ Features

- **Smart Schedule Builder** — Add, edit, delete, and complete daily activities
- **Priority Scheduling Algorithm** — Activities auto-sorted by priority (High → Medium → Low), then by time
- **AI Emotion Prediction** — Logistic Regression model predicts child's emotional state (Happy, Sad, Angry, Anxious) from caregiver-entered behavioral inputs
- **Rule-Based Recommendations** — Instant activity suggestions mapped to the predicted emotion
- **Voice Feedback** — Spoken confirmations via Web Speech API for every key action
- **Celebration Animations** — Brief confetti animation on task completion for positive reinforcement
- **Progress Tracking** — Weekly completion stats and progress percentage
- **Child Profiles** — Manage multiple children with separate schedules
- **Accessible UI** — Designed following WCAG 2.1 Level A guidelines and autism-friendly UX principles

---

## 🤖 AI & Algorithms

### Emotion Classification
- **Model:** Multinomial Logistic Regression (L2 regularization)
- **Classes:** Happy | Sad | Angry | Anxious
- **Dataset:** 400 labeled samples (synthetic + survey)
- **Test Accuracy:** 87.5% | **Macro F1:** 0.86

### Priority Scheduling
Weight: High = 3, Medium = 2, Low = 1
Sort: Descending weight → tie-break by earliest time

### Recommendation Rules
| Predicted Emotion | Suggested Activities |
|---|---|
| Happy | Favorite game, sticker chart, preferred song |
| Sad | Quiet reading, soft music, gentle stretching |
| Angry | Squeeze ball, calm-down corner, counting slowly |
| Anxious | Box breathing, visual schedule review, weighted lap pad |

---

## 📁 Project Structure

aseos/
├── frontend/
│   └── src/
│       ├── components/     (Dashboard, ActivityForm, MoodForm, ...)
│       ├── services/       (api.js)
│       └── utils/          (voice.js, sortActivities.js)
├── backend/
│   ├── app.py
│   ├── services/           (scheduler.py, emotion.py, recommendations.py)
│   ├── models/             (model.pkl, scaler.pkl)
│   └── data/               (emotions_dataset.csv)
└── docs/


---

## 🚀 How to Run

### Backend
```bash
git clone https://github.com/Amina-Noor/Autism-Connect
cd Autism-Connect/backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
python train_model.py        # Train and save the ML model
python app.py                # Start Flask server at http://localhost:5000
```

### Frontend
```bash
cd ../frontend
npm install
npm run dev                  # Open http://localhost:5173
```

---

## 🔗 Key API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/activities | Get all activities |
| POST | /api/v1/activities | Add a new activity |
| PUT | /api/v1/activities/:id | Update an activity |
| DELETE | /api/v1/activities/:id | Delete an activity |
| POST | /api/v1/predict-emotion | Predict emotion + get recommendations |
| GET | /api/v1/progress/:childId | Get weekly progress stats |

---

## ✅ Testing Summary

| Test Type | Result |
|-----------|--------|
| Functional Tests | 24 / 24 passed (100%) |
| ML Test Accuracy | 87.5% |
| Mean API Latency | ~120 ms |
| SUS Usability Score | 78.4 / 100 (above average) |

---

## ♿ Accessibility

- WCAG 2.1 Level A compliant
- All icons have `aria-label`
- All inputs have `<label>` elements
- Keyboard navigable
- Minimum contrast ratio 4.5:1 for all text

---

## 🚀 Future Improvements

- Mobile / PWA support with offline sync
- Urdu language support (RTL layout)
- Persistent database (SQLite / PostgreSQL)
- Therapist dashboard with PDF export
- Deep learning model for richer emotion inference
- Wearable (Fitbit) heart rate integration
- "Reduce animations" toggle for sensory-sensitive users
- High score / progress history saving

---

## 🌐 SDG Alignment

| SDG | Alignment |
|-----|-----------|
| SDG 3 — Good Health | Supports child well-being |
| SDG 4 — Quality Education | Builds routine skills for learning |
| SDG 10 — Reduced Inequalities | Accessible tech for special needs |

---

## 📚 References

- React.js Documentation — https://reactjs.org/
- Scikit-learn Documentation — https://scikit-learn.org/
- WCAG 2.1 Guidelines — https://www.w3.org/TR/WCAG21/
- WHO Autism Fact Sheet — https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders
- Flask Documentation — https://flask.palletsprojects.com/
