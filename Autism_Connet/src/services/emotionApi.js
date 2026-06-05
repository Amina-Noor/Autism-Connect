import axios from "axios";

// We use relative path, React proxy handles dev URL
export const predictEmotion = async (text) => {
  try {
    const response = await axios.post(
      "/predict_emotion", // <-- relative path works with proxy
      { text },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Emotion API Error:", error);
    return { error: "Unable to connect to server" };
  }
};
