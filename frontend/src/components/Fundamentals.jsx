import "./Fundamentals.css";

export default function Fundamentals({ fundamentals }) {
  if (!fundamentals) return null;

  return (
    <div className="fundamentals-section">
      <h3>Fundamentals</h3>
      <ul>
        {Object.entries(fundamentals).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> <span>{value ?? "N/A"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}