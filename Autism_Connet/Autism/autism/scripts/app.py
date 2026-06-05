# backend/app.py
from fastapi import FastAPI
from pydantic import BaseModel
from scripts.agent import EmotionAgent
from fastapi.middleware.cors import CORSMiddleware

# Load model
model_path = r"outputs/multilabel_classifier.pkl"
vectorizer_path = r"outputs/tfidf_vectorizer.pkl"
agent = EmotionAgent(model_path=model_path, vectorizer_path=vectorizer_path)

# FastAPI setup
app = FastAPI(title="Emotion Detection API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or restrict to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input data model
class InputData(BaseModel):
    text: str

# Prediction endpoint
@app.post("/predict")
def predict_emotions(data: InputData):
    text = data.text.strip()
    if not text:
        return {"error": "Please enter some text."}

    result = agent.predict_emotions(text)
    predicted_emotions = [label for label, val in result.items() if val == 1]

    if predicted_emotions:
        return {"predicted_emotions": predicted_emotions}
    else:
        return {"predicted_emotions": [], "message": "No strong emotions detected."}
