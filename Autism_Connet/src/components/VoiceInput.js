import React, { useState } from "react";


export default function VoiceInput({ onResult }) {
const [listening, setListening] = useState(false);


const startListening = () => {
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
const text = prompt("Type your voice input (speech not supported)");
if (text) onResult(text);
return;
}


const recog = new SpeechRecognition();
recog.lang = "en-US";
recog.interimResults = false;


recog.onstart = () => setListening(true);
recog.onend = () => setListening(false);
recog.onerror = () => setListening(false);
recog.onresult = (e) => onResult(e.results[0][0].transcript);


recog.start();
};


return <button onClick={startListening}>{listening ? "Listening... 🎤" : "Speak 🎤"}</button>;
}