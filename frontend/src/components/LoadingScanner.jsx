import { ShieldCheck } from "lucide-react";

function LoadingScanner({ type = "content" }) {
  return (
    <div
      className="glass-card"
      style={{
        padding: "55px 25px",
        textAlign: "center"
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          margin: "0 auto 20px",
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          border:
            "2px solid rgba(56,189,248,0.18)",
          background:
            "rgba(14,165,233,0.06)",
          animation: "pulseGlow 1.6s infinite"
        }}
      >
        <ShieldCheck
          size={32}
          style={{ color: "#38bdf8" }}
        />
      </div>

      <h2
        style={{
          fontFamily: "Space Grotesk",
          fontSize: "22px"
        }}
      >
        Analyzing {type}
      </h2>

      <p
        className="muted-text"
        style={{
          marginTop: "10px",
          fontSize: "13px"
        }}
      >
        Our security engine is inspecting the submitted content...
      </p>

      <div
        style={{
          width: "220px",
          height: "4px",
          margin: "25px auto 0",
          borderRadius: "999px",
          overflow: "hidden",
          background: "rgba(148,163,184,0.12)"
        }}
      >
        <div
          style={{
            width: "45%",
            height: "100%",
            borderRadius: "999px",
            background:
              "linear-gradient(90deg,#2563eb,#22d3ee)",
            animation: "float 1.2s infinite"
          }}
        />
      </div>
    </div>
  );
}

export default LoadingScanner;