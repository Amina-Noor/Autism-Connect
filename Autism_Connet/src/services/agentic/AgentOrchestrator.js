import { predictEmotion } from "../emotionApi";
import { reasonEmotion } from "./EmotionReasoningAgent";
import { updateEmotionMemory, isEmotionalDistress } from "./EmotionMemoryAgent";
import { decideAction } from "./DecisionAgent";

export async function runAgent(text) {
  let apiResult = null;

  try {
    apiResult = await predictEmotion(text);
  } catch (e) {
    console.warn("API failed, using reasoning only");
  }

  const emotion = reasonEmotion(text, apiResult);

  updateEmotionMemory(emotion);

  const distress = isEmotionalDistress();

  const action = decideAction(emotion, distress);

  return { emotion, action };
}
