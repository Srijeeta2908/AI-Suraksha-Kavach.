import { useState } from "react";
import { Mail } from "lucide-react";


export default function EmailScanner({ onScan, loading }) {
  const [email, setEmail] = useState("");


  const handleScan = () => {
    if (!email.trim()) return;

    onScan("email", email);
  };


  return (
    <div className="glass-card" style={{ padding: "25px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <Mail size={22} />

        <h3>Email Phishing Scanner</h3>
      </div>


      <textarea
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Paste the suspicious email content here..."
        rows={10}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "12px",
          border: "1px solid rgba(148,163,184,0.2)",
          background: "rgba(15,23,42,0.7)",
          color: "white",
          resize: "vertical",
        }}
      />


      <button
        onClick={handleScan}
        disabled={loading || !email.trim()}
        className="primary-button"
        style={{ marginTop: "15px" }}
      >
        {loading ? "Analyzing..." : "Scan Email"}
      </button>
    </div>
  );
}