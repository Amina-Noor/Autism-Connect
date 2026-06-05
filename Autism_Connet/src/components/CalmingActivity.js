import React from "react";


export default function CalmingActivity({ onSelectActivity }) {
const activities = ["Deep Breathing", "Bubble Pop", "Stretching"];
return (
<div style={{ marginTop: 12 }}>
{activities.map((a, i) => (
<button key={i} onClick={() => onSelectActivity(a)} style={{ margin: 4, padding: 8 }}>
{a}
</button>
))}
</div>
);
}