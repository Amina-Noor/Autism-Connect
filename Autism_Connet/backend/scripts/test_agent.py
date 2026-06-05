# scripts/test_agent.py

from predict_model import EmotionAgent  # agent: predicts emotions
from agent2 import ResponseAgent        # agent2: generates responses

# -----------------------------
# Paths to model and vectorizer
# -----------------------------
model_path = r"C:\ai_project\backend\outputs\ann_model.keras"
vectorizer_path = r"C:\ai_project\backend\outputs\tfidf_vectorizer.pkl"

# -----------------------------
# Initialize the agents
# -----------------------------
agent = EmotionAgent(
    model_path=model_path,
    vectorizer_path=vectorizer_path
)

agent2 = ResponseAgent()  # upgraded, agentic response agent

# -----------------------------
# Test input texts
# -----------------------------
texts = [
    "I am very happy and excited today!",
    "This is frustrating and makes me angry.",
    "I feel confused and nervous about this situation.",
    "I love playing sports but I feel scared before the match.",
    "I feel lonely and a bit bored."
]

# -----------------------------
# Predict emotions and generate responses
# -----------------------------
for text in texts:
    # Step 1: Predict emotions
    emotion_dict = agent.predict_emotions(text, threshold=0.2)  # lower threshold for demo

    print("\nText:", text)
    print("Predicted Emotions:")

    any_emotion = False
    for label, val in emotion_dict.items():
        if val == 1:
            print(f"- {label}")
            any_emotion = True

    if not any_emotion:
        print("- neutral")

    # Step 2: Generate adaptive, friendly response
    response = agent2.generate_response(emotion_dict)
    print("Agent Response:", response)

    # Step 3: Suggest a proactive activity based on mood
    activity = agent2.suggest_activity()
    print("Proactive Suggestion:", activity)

# -----------------------------
# Test updating supportive responses
# -----------------------------
agent2.update_response("joy", "Keep shining! Your happiness inspires everyone!")
joy_test = {"joy": 1}
print("\nTesting updated response for 'joy':", agent2.generate_response(joy_test))
