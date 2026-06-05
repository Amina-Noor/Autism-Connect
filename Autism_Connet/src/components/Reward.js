import React from "react";


export default function Reward({ message }) {
if (!message) return null;
return <div style={{ marginTop: 12, padding: 8, background: "#ffe7e6", borderRadius: 8 }}>{message}</div>;
}