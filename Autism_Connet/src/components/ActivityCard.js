export default function ActivityCard({ emoji, title, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: 12,
        border: "1px solid #ccc",
        borderRadius: 12,
        cursor: "pointer",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 24 }}>{emoji}</div>
      <div>{title}</div>
    </div>
  );
}
