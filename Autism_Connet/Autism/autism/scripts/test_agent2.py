from agent2 import ResponseAgent

def test_agent():
    # Create the agent
    agent = ResponseAgent()

    # List of sample emotions to test
    emotions_to_test = [
        'joy', 'sadness', 'anger', 'fear', 'confusion', 'love', 'neutral',
        'lonely', 'unhappy', 'shy', 'tired', 'bored', 'sacred'
    ]

    print("=== Testing single active emotions ===")
    for emotion in emotions_to_test:
        emotion_dict = {emo: 0 for emo in agent.responses.keys()}
        emotion_dict[emotion] = 1
        response = agent.generate_response(emotion_dict)
        print(f"Emotion: {emotion} → Response: {response}")

    print("\n=== Testing updated responses ===")
    agent.update_response('joy', "Keep shining! Your happiness inspires everyone!")
    joy_dict = {'joy': 1}
    print("Updated joy response →", agent.generate_response(joy_dict))

    agent.update_response('bored', "Let's create a fun story together!")
    bored_dict = {'bored': 1}
    print("Updated bored response →", agent.generate_response(bored_dict))

    print("\n=== Testing multiple active emotions ===")
    multi_emotion_dict = {'joy': 1, 'fear': 1, 'sadness': 1}
    response = agent.generate_response(multi_emotion_dict)
    print("Multiple active emotions →", response)

    print("\n=== Testing proactive activity suggestions ===")
    for _ in range(3):
        activity = agent.suggest_activity()
        print("Suggested activity →", activity)

    print("\n=== Testing adaptive responses (history-aware) ===")
    # Trigger same emotion multiple times to see adaptive behavior
    sad_dict = {'sadness': 1}
    for _ in range(3):
        response = agent.generate_response(sad_dict)
        print("Sadness response →", response)

if __name__ == "__main__":
    test_agent()
