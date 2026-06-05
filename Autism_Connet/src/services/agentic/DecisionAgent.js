export function decideAction(emotion, distress) {
  if (distress) return "comfort_escalated";
  if (emotion === "sadness") return "comfort";
  if (emotion === "anger") return "calm";
  return "normal";
}
