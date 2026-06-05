import React from "react";
import { useNavigate } from "react-router-dom";

export default function ParentInfo() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: "#f0f8ff",
        fontFamily: "Arial, sans-serif",
        color: "#1e293b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "90%", // expand in width
          maxWidth: "1200px",
          background: "#ffffff",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          padding: "30px",
        }}
      >
        <h2 style={{ color: "#d63384", textAlign: "center", marginBottom: "20px" }}>
          Parent & Guardian Information
        </h2>

        <p style={{ lineHeight: 1.6, fontSize: "16px" }}>
          This app is designed as a <strong>supportive companion</strong> for children aged 10–15. 
          <br />
          <span style={{ color: "#f97316" }}>⚠️ It is not a therapist or medical tool.</span>
        </p>

        <div
          style={{
            background: "#e0f7fa",
            padding: "15px 20px",
            borderRadius: "12px",
            margin: "20px 0",
          }}
        >
          <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0, lineHeight: 1.8 }}>
            <li>✔ Encourages emotional expression</li>
            <li>✔ Uses calm, predictable language</li>
            <li>✔ Detects self harm language and encourages adult support</li>
            <li>❌ Does not give medical or psychological advice</li>
          </ul>
        </div>

        <p style={{ lineHeight: 1.6, fontSize: "16px" }}>
          If your child shows signs of distress, please contact a trusted adult, school counselor, or local support service.
        </p>

        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: "10px 25px",
              background: "#d63384",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#f87171")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#d63384")}
          >
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
}
