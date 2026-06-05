// src/components/AvatarCustomizerPage.js
import React, { useState } from "react";

export default function AvatarCustomizerPage() {
  const hairColors = ["blonde","brown","black","red","blue","pink","green","purple","orange","grey"];
  const clothes = Array.from({length:10}, (_,i)=>`Clothes ${i+1}`);
  const hats = Array.from({length:10}, (_,i)=>`Hat ${i+1}`);

  const [avatar, setAvatar] = useState({ hair: "brown", clothes: "Clothes 1", hat: "Hat 1" });

  const changeAvatar = (type, value) => setAvatar({ ...avatar, [type]: value });

  return (
    <div style={{ padding: "20px", background: "#ccffe6", minHeight: "100vh" }}>
      <h1>🧒 Customize Avatar - 100 Options</h1>
      
      <div>
        <h3>Hair Colors</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {hairColors.map((h) => (
            <button key={h} style={buttonStyle} onClick={()=>changeAvatar("hair",h)}>{h}</button>
          ))}
        </div>
      </div>

      <div>
        <h3>Clothes</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {clothes.map((c)=>(
            <button key={c} style={buttonStyle} onClick={()=>changeAvatar("clothes",c)}>{c}</button>
          ))}
        </div>
      </div>

      <div>
        <h3>Hats</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {hats.map((h)=>(
            <button key={h} style={buttonStyle} onClick={()=>changeAvatar("hat",h)}>{h}</button>
          ))}
        </div>
      </div>

      <p style={{ marginTop: "20px" }}>Current Avatar: Hair {avatar.hair}, Clothes {avatar.clothes}, Hat {avatar.hat}</p>
    </div>
  );
}

const buttonStyle = {
  padding: "8px 12px",
  fontSize: "14px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  background: "#ffd6f0",
};
