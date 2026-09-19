function RiskMeter({ score = 0 }) {
  const safeScore = Math.max(
    0,
    Math.min(100, Number(score))
  );

  return (
    <div
      className="glass-card"
      style={{
        padding: "25px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px"
        }}
      >
        <span
          style={{
            fontWeight: 600,
            fontSize: "13px"
          }}
        >
          Threat Level
        </span>

        <span
          style={{
            color: "#94a3b8",
            fontSize: "13px"
          }}
        >
          {safeScore}%
        </span>
      </div>

      <div
        style={{
          height: "12px",
          borderRadius: "999px",
          overflow: "hidden",
          background:
            "rgba(148,163,184,0.12)"
        }}
      >
        <div
          style={{
            width: `${safeScore}%`,
            height: "100%",
            borderRadius: "999px",
            background:
              "linear-gradient(90deg,#22c55e,#facc15,#ef4444)",
            transition: "width .7s ease"
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#64748b",
          fontSize: "10px",
          marginTop: "8px"
        }}
      >
        <span>SAFE</span>
        <span>CAUTION</span>
        <span>DANGER</span>
      </div>
    </div>
  );
}

export default RiskMeter;