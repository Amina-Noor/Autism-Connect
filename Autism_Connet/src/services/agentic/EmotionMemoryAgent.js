let emotionHistory = [];

export function updateEmotionMemory(emotion) {
  emotionHistory.push(emotion);
  if (emotionHistory.length > 5) emotionHistory.shift();
}

export function isEmotionalDistress() {
  return emotionHistory.filter(e => e === "sadness").length >= 3;
}
