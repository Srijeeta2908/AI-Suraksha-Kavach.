import {
  AlertTriangle,
  CheckCircle2,
  Info
} from "lucide-react";

function DetectionResults({
  result = {
    status: "safe",
    title: "No major threats detected",
    description:
      "The submitted content did not trigger the current security rules.",
    findings: []
  }
}) {
  const isSafe = result.status === "safe";
  const isWarning = result.status === "warning";

  const Icon = isSafe
    ? CheckCircle2
    : isWarning
      ? Info
      : AlertTriangle;

  const iconColor = isSafe
    ? "#4ade80"
    : isWarning
      ? "#fbbf24"
      : "#f87171";

  return (
    <div
      className="glass-card"
      style={{
        padding: "28px"
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "flex-start"
        }}
      >
        <Icon
          size={30}
          style={{
            color: iconColor,
            flexShrink: 0
          }}
        />

        <div>
          <h2
            style={{
              fontFamily: "Space Grotesk",
              fontSize: "21px"
            }}
          >
            {result.title}
          </h2>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              lineHeight: 1.7,
              marginTop: "8px"
            }}
          >
            {result.description}
          </p>
        </div>
      </div>

      {result.findings?.length > 0 && (
        <div style={{ marginTop: "25px" }}>
          <h3
            style={{
              fontSize: "13px",
              marginBottom: "12px"
            }}
          >
            Detection Findings
          </h3>

          <div
            style={{
              display: "grid",
              gap: "9px"
            }}
          >
            {result.findings.map(
              (finding, index) => (
                <div
                  key={index}
                  style={{
                    padding: "11px 13px",
                    borderRadius: "10px",
                    background:
                      "rgba(15,23,42,0.6)",
                    border:
                      "1px solid rgba(148,163,184,0.08)",
                    color: "#cbd5e1",
                    fontSize: "12px"
                  }}
                >
                  • {finding}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetectionResults;