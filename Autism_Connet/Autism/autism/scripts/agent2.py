import random

class ResponseAgent:
    def __init__(self):
        # Predefined supportive messages for many emotions
        self.responses = {
            "joy": [
                "Yayyy! I'm happy that you're happy!",
                "That sounds wonderful!",
                "Keep smiling! Your happiness is contagious!"
            ],
            "sadness": [
                "Aww, I’m here for you. You’re not alone.",
                "It’s okay to feel sad sometimes. Want a virtual hug?",
                "Let’s do something fun together to cheer you up!"
            ],
            "anger": [
                "It's okay to feel angry sometimes. Let's take a deep breath together.",
                "Would you like to play a small calming game?",
                "Try telling me what made you angry. I'm listening!"
            ],
            "fear": [
                "It’s okay, I’m right here with you.",
                "Let’s try a slow breathing exercise together.",
                "You are safe, don’t worry. I’ll help you!"
            ],
            "confusion": [
                "It’s okay to be confused. Want me to explain?",
                "Let’s figure this out together!",
                "No worries! We can solve this step by step."
            ],
            "love": [
                "Aww, that’s so kind! Sending you a big warm hug!",
                "You are loved and appreciated!",
                "Keep spreading love! The world needs it!"
            ],
            "neutral": [
                "Thanks for sharing! Want to talk about something fun?",
                "I'm here! What else would you like to do?",
                "Let’s try to make your day a little brighter!"
            ],
            "lonely": [
                "You’re not alone, I’m right here with you!",
                "Let’s chat together. You can tell me anything.",
                "Want to do a fun activity so you don’t feel lonely?"
            ],
            "unhappy": [
                "It’s okay to feel unhappy sometimes.",
                "I’m here to cheer you up! Want a joke?",
                "Let’s find something fun to do together!"
            ],
            "shy": [
                "It’s okay to feel shy. You’re safe here!",
                "Take your time, I’m listening.",
                "Would you like to share a little secret with me?"
            ],
            "tired": [
                "You must be tired. How about a short break or a stretch?",
                "Let’s do something relaxing together.",
                "Resting a bit can help you feel better!"
            ],
            "bored": [
                "Bored? Let’s do something exciting!",
                "I have some fun ideas. Want to try one?",
                "Let’s play a game or learn something new!"
            ],
            "sacred": [
                "That’s a special feeling! Cherish it.",
                "Take a moment to appreciate it, it’s wonderful.",
                "I can help you reflect on this sacred moment."
            ]
        }

        # History of past interactions
        self.history = []

        # Mood tracker (for future pro-level agentic behavior)
        self.mood_score = 0

    def generate_response(self, emotion_dict):
        # Step 1: Identify active emotions
        active_emotions = [emo for emo, val in emotion_dict.items() if val == 1]

        if not active_emotions:
            return "Hmm, I'm not sure how you're feeling. Want to tell me more?"

        # Step 2: Pick the primary active emotion
        emotion = active_emotions[0]

        # Step 3: Adaptive agentic behavior
        replies = self.responses.get(emotion, ["I'm here for you!"])

        # Avoid repeating last response for same emotion
        if self.history and self.history[-1]['emotion'] == emotion:
            response = random.choice(replies)
            response += " How about we try a fun activity to lift your mood?"
        else:
            response = random.choice(replies)

        # Step 4: Update mood score (simple example)
        if emotion in ["joy", "love"]:
            self.mood_score += 1
        elif emotion in ["sadness", "anger", "fear", "lonely", "unhappy", "bored", "tired"]:
            self.mood_score -= 1

        # Step 5: Save to history
        self.history.append({'emotion': emotion, 'response': response})

        return response

    def update_response(self, emotion, new_message):
        """Add or update supportive messages for any emotion"""
        if emotion in self.responses:
            self.responses[emotion].append(new_message)
        else:
            self.responses[emotion] = [new_message]

    def suggest_activity(self):
        """Proactively suggest fun or calming activities"""
        activities = [
            "Let's draw a picture together!",
            "Want to play a quick game?",
            "How about we tell a fun story?",
            "Let's learn something new together!",
            "Shall we do a small breathing exercise?",
            "How about making a happy playlist?"
        ]
        return random.choice(activities)
