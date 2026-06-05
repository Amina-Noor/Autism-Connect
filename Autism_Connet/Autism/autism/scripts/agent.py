import pickle
import numpy as np
import random

class EmotionAgent:
    def __init__(self, model_path, vectorizer_path):
        # Load trained ANN model
        with open(model_path, "rb") as f:
            self.model = pickle.load(f)

        # Load TF-IDF vectorizer
        with open(vectorizer_path, "rb") as f:
            self.vectorizer = pickle.load(f)

        # Final label set
        self.labels = [
            'admiration', 'amusement', 'anger', 'annoyance', 'approval', 'caring',
            'confusion', 'curiosity', 'desire', 'disappointment', 'disapproval',
            'disgust', 'embarrassment', 'excitement', 'fear', 'gratitude', 'joy',
            'love', 'nervousness', 'optimism', 'realization', 'relief', 'remorse',
            'sadness', 'surprise', 'neutral'
        ]

        # Agentic features
        self.history = []          # Track previous inputs and emotions
        self.mood_score = 0        # Simple mood tracker
        self.supportive_responses = self._init_supportive_responses()  # Predefined friendly messages

    def _init_supportive_responses(self):
        # Predefined responses for emotions
        return {
            "joy": ["Yay! I'm happy that you're happy!", "That sounds wonderful!", "Keep smiling!"],
            "sadness": ["I'm here for you. You’re not alone.", "It's okay to feel sad.", "Let's try something fun!"],
            "anger": ["Take a deep breath. I’m here with you.", "It's okay to feel angry.", "Let's calm down together."],
            "fear": ["It's okay, you are safe.", "Let's try a slow breathing exercise.", "I'm here, don't worry!"],
            "confusion": ["It's okay to be confused. Let's figure it out together.", "No worries! Step by step."],
            "love": ["You are loved and appreciated!", "Sending a big warm hug!"],
            "neutral": ["Thanks for sharing! Want to do something fun?", "I'm here! What would you like to do?"],
            # Add more for other emotions as needed
        }

    def predict_emotions(self, text, threshold=0.5):
        """
        Predict emotions for a given text.
        Returns label → prediction mapping.
        """
        X = self.vectorizer.transform([text])
        probs = self.model.predict(X)[0]
        preds = (probs >= threshold).astype(int)

        emotion_dict = {label: int(pred) for label, pred in zip(self.labels, preds)}
        self.history.append({'text': text, 'emotions': emotion_dict})

        # Update mood score
        for emo, val in emotion_dict.items():
            if val == 1:
                if emo in ["joy", "love", "admiration", "amusement", "approval", "gratitude"]:
                    self.mood_score += 1
                elif emo in ["sadness", "anger", "fear", "disappointment", "remorse"]:
                    self.mood_score -= 1

        return emotion_dict

    def generate_response(self, emotion_dict):
        """
        Generate a friendly, adaptive response based on predicted emotions.
        """
        active_emotions = [emo for emo, val in emotion_dict.items() if val == 1]
        if not active_emotions:
            return "Hmm, I'm not sure how you're feeling. Want to tell me more?"

        # Pick primary emotion
        emotion = active_emotions[0]
        replies = self.supportive_responses.get(emotion, ["I'm here for you!"])

        # Adaptive response: avoid repetition
        if self.history and len(self.history) > 1 and self.history[-2]['emotions'].get(emotion, 0) == 1:
            response = random.choice(replies) + " How about trying a fun activity together?"
        else:
            response = random.choice(replies)

        return response

    def suggest_activity(self):
        """Proactive suggestion based on mood score"""
        activities = [
            "Let's draw a picture together!",
            "Want to play a quick game?",
            "How about we tell a fun story?",
            "Let's learn something new together!",
            "Shall we do a small breathing exercise?",
            "How about making a happy playlist?"
        ]

        # Positive mood: fun suggestions, negative mood: calming suggestions
        if self.mood_score < 0:
            calming = ["Take a short rest.", "Let's do a breathing exercise.", "Listen to relaxing music."]
            return random.choice(calming)
        return random.choice(activities)

    def update_supportive_response(self, emotion, new_message):
        """Add a new friendly message for a specific emotion"""
        if emotion in self.supportive_responses:
            self.supportive_responses[emotion].append(new_message)
        else:
            self.supportive_responses[emotion] = [new_message]
