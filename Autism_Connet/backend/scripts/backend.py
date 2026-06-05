from fastapi import FastAPI
from pydantic import BaseModel
from scripts.predict_model import EmotionAgent
import traceback
import os

# -----------------------------
# 1️⃣ Initialize paths
# -----------------------------
model_path = r"C:\ai_project\backend\outputs\ann_model.keras"
vectorizer_path = r"C:\ai_project\backend\outputs\tfidf_vectorizer.pkl"

# -----------------------------
# 2️⃣ Initialize agent safely
# -----------------------------
agent = None
try:
    if not os.path.exists(model_path) or not os.path.exists(vectorizer_path):
        raise FileNotFoundError("Model or vectorizer file not found. Check paths.")
    agent = EmotionAgent(model_path, vectorizer_path)
    print("EmotionAgent loaded successfully.")
except Exception as e:
    print("Error initializing EmotionAgent:")
    traceback.print_exc()

# -----------------------------
# 3️⃣ Initialize FastAPI
# -----------------------------
app = FastAPI(title="Emotion Detection API")

# -----------------------------
# 4️⃣ Input model
# -----------------------------
class TextRequest(BaseModel):
    text: str

# -----------------------------
# 5️⃣ Prediction endpoint
# -----------------------------
@app.post("/predict_emotion")
def predict(request: TextRequest):
    if agent is None:
        return {"error": "EmotionAgent not initialized. Check model and vectorizer paths."}

    text = request.text.strip()
    if not text:
        return {"error": "Please provide text for prediction."}

    try:
        result = agent.predict_emotions(text)
        predicted_emotions = [label for label, val in result.items() if val == 1]

        if predicted_emotions:
            return {"predicted_emotions": predicted_emotions}
        else:
            return {"predicted_emotions": [], "message": "No strong emotions detected."}

    except Exception as e:
        # Catch any runtime errors during prediction
        traceback.print_exc()
        return {"error": str(e)}
