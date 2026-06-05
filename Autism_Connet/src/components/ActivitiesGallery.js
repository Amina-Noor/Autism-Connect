import React from "react";

export default function ActivitiesGallery({ activities, onOpenActivity }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 20 }}>
      {activities.map((activity, index) => (
        <div
          key={index}
          style={{ cursor: "pointer", textAlign: "center" }}
          onClick={() => onOpenActivity(activity)}
        >
          <img
            src={activity.img}
            alt={activity.title}
            style={{ width: 120, height: 120, borderRadius: 15, objectFit: "cover", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
          />
          <div style={{ marginTop: 8, fontWeight: "bold" }}>{activity.title}</div>
        </div>
      ))}
    </div>
  );
}
