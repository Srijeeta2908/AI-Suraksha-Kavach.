import { useState } from "react";
import { Globe, ShieldCheck } from "lucide-react";

export default function UrlScanner({ onScan, loading }) {
  const [url, setUrl] = useState("");

  const handleScan = () => {
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      return;
    }

    onScan("url", trimmedUrl);
  };

  return (
    <div
      className="glass-card"
      style={{
        padding: "30px",
        maxWidth: "850px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(59,130,246,0.12)",
          }}
        >
          <Globe size={23} />
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "22px",
            }}
          >
            URL Scanner
          </h2>

          <p
            style={{
              margin: "4px 0 0",
              color: "#94a3b8",
              fontSize: "12px",
            }}
          >
            Check a website link for phishing and
            suspicious indicators.
          </p>
        </div>
      </div>

      {/* Input */}
      <div style={{ marginTop: "25px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#cbd5e1",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          Website URL
        </label>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleScan();
            }
          }}
          placeholder="https://example.com"
          disabled={loading}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "15px 16px",
            borderRadius: "12px",
            border:
              "1px solid rgba(148,163,184,0.2)",
            background: "rgba(15,23,42,0.75)",
            color: "#f8fafc",
            outline: "none",
            fontSize: "14px",
          }}
        />
      </div>

      {/* Security note */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "14px",
          color: "#94a3b8",
          fontSize: "11px",
        }}
      >
        <ShieldCheck size={15} />

        <span>
          The URL will be analyzed by the AI Suraksha
          Kavach security engine.
        </span>
      </div>

      {/* Button */}
      <button
        onClick={handleScan}
        disabled={loading || !url.trim()}
        className="primary-button"
        style={{
          marginTop: "22px",
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "12px",
          cursor:
            loading || !url.trim()
              ? "not-allowed"
              : "pointer",
          opacity:
            loading || !url.trim() ? 0.6 : 1,
        }}
      >
        {loading ? "Analyzing URL..." : "Scan URL"}
      </button>
    </div>
  );
}