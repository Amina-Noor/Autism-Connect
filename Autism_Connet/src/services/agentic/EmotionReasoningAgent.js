export function reasonEmotion(text, apiResult) {
  const t = text.toLowerCase();

  // HARD OVERRIDES (agent authority)
  if (["unhappy", "sad", "down", "worst day", "depressed", "lonely"].some(w => t.includes(w))) {
    return "sadness";
  }

  if (["angry", "mad", "furious", "frustrated"].some(w => t.includes(w))) {
    return "anger";
  }

  if (apiResult?.predicted_emotions?.length) {
    return apiResult.predicted_emotions[0];
  }

  return "default";
}
