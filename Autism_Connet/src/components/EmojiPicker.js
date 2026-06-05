import React from "react";
import { motion } from "framer-motion";


const emojiList = ["😊", "😢", "😡", "😨", "🥰", "😴", "🤩", "🙂"];


export default function EmojiPicker({ onSelectEmoji }) {
return (
<div style={{ display: "flex", gap: 8, justifyContent: "center", margin: 8 }}>
{emojiList.map((e) => (
<motion.button key={e} whileTap={{ scale: 0.9 }} onClick={() => onSelectEmoji(e)} style={{ fontSize: 20 }}>
{e}
</motion.button>
))}
</div>
);
}