import pickle
import tensorflow as tf
import numpy as np

class EmotionAgent:
    def __init__(self, model_path, vectorizer_path):
        self.model = tf.keras.models.load_model(model_path)

        with open(vectorizer_path, "rb") as f:
            self.vectorizer = pickle.load(f)

        self.labels = [
            'admiration','amusement','anger','annoyance','approval','caring',
            'confusion','curiosity','desire','disappointment','disapproval',
            'disgust','embarrassment','excitement','fear','gratitude','joy',
            'love','nervousness','optimism','realization','relief','remorse',
            'sadness','surprise','neutral'
        ]

        # Hybrid keyword rules for rare emotions
        self.hybrid_rules = {
            "sadness": ["sad", "disappointed", "unhappy", "down", "exhausted", "regret", "depressed", "lonely"],
            "fear": ["scared", "afraid", "fear", "terrified", "nervous", "anxious"],
            "anger": ["angry", "frustrated", "mad", "furious", "annoyed"]
        }

    def predict_emotions(self, text, threshold=0.2):
        text_lower = text.lower()
        X = self.vectorizer.transform([text])
        probs = self.model.predict(X.toarray())[0]

        # ANN prediction
        ann_preds = (probs >= threshold).astype(int)

        # Initialize final predictions
        preds = np.copy(ann_preds)

        # Apply hybrid keyword rules
        for emotion, keywords in self.hybrid_rules.items():
            for word in keywords:
                if word in text_lower:
                    idx = self.labels.index(emotion)
                    preds[idx] = 1  # force the emotion to 1

        # Return dictionary of label → prediction
        return {label: int(pred) for label, pred in zip(self.labels, preds)}
