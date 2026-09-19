import {
  ShieldAlert,
  ShieldCheck
} from "lucide-react";

function RiskScore({ score = 0 }) {
  const safeScore = Math.max(
    0,
    Math.min(100, Number(score))
  );

  const isDanger = safeScore >= 70;
  const isWarning =
    safeScore >= 40 && safeScore < 70;

  let label = "Low Risk";

  if (isDanger) {
    label = "High Risk";
  } else if (isWarning) {
    label = "Moderate Risk";
  }

  return (
    <div
      className="glass-card"
      style={{
        padding: "28px",
        textAlign: "center"
      }}
    >
      {isDanger ? (
        <ShieldAlert
          size={35}
          style={{
            color: "#f87171",
            margin: "0 auto 12px"
          }}
        />
      ) : (
        <ShieldCheck
          size={35}
          style={{
            color: isWarning
              ? "#fbbf24"
              : "#4ade80",
            margin: "0 auto 12px"
          }}
        />
      )}

      <div
        style={{
          fontFamily: "Space Grotesk",
          fontSize: "52px",
          fontWeight: 700
        }}
      >
        {safeScore}
        <span
          style={{
            fontSize: "18px",
            color: "#64748b"
          }}
        >
          /100
        </span>
      </div>

      <div
        style={{
          marginTop: "5px",
          fontWeight: 700,
          color: isDanger
            ? "#f87171"
            : isWarning
              ? "#fbbf24"
              : "#4ade80"
        }}
      >
        {label}
      </div>

      <p
        className="muted-text"
        style={{
          fontSize: "12px",
          marginTop: "10px"
        }}
      >
        AI Suraksha Kavach Risk Score
      </p>
    </div>
  );
}

export default RiskScore;