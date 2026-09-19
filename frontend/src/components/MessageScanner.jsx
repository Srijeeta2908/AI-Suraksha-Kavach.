import { useState } from "react";
import {
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

export default function MessageScanner({
  onScan,
  loading,
}) {
  const [message, setMessage] = useState("");

  const handleScan = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    onScan("message", trimmedMessage);
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
            background:
              "rgba(168,85,247,0.12)",
          }}
        >
          <MessageSquare size={23} />
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              fontFamily:
                "Space Grotesk, sans-serif",
              fontSize: "22px",
            }}
          >
            Message Scanner
          </h2>

          <p
            style={{
              margin: "4px 0 0",
              color: "#94a3b8",
              fontSize: "12px",
            }}
          >
            Analyze SMS and chat messages for
            scam and phishing indicators.
          </p>
        </div>
      </div>

      {/* Textarea */}
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
          Message Content
        </label>

        <textarea
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder={
            "Paste the suspicious SMS or message here..."
          }
          rows={9}
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
            lineHeight: 1.6,
            resize: "vertical",
            fontFamily: "inherit",
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
          The message will be checked for scam,
          phishing and social-engineering patterns.
        </span>
      </div>

      {/* Button */}
      <button
        onClick={handleScan}
        disabled={
          loading || !message.trim()
        }
        className="primary-button"
        style={{
          marginTop: "22px",
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "12px",
          cursor:
            loading || !message.trim()
              ? "not-allowed"
              : "pointer",
          opacity:
            loading || !message.trim()
              ? 0.6
              : 1,
        }}
      >
        {loading
          ? "Analyzing Message..."
          : "Scan Message"}
      </button>
    </div>
  );
}