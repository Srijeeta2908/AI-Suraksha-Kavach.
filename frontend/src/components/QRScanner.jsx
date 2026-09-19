import { useState } from "react";
import {
  QrCode,
  Upload,
  ShieldCheck,
  FileImage,
} from "lucide-react";

export default function QRScanner({
  onScan,
  loading,
}) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
  };

  const handleScan = () => {
    if (!file) return;

    onScan("qr", file);
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
            background: "rgba(14,165,233,0.12)",
          }}
        >
          <QrCode size={23} />
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "22px",
            }}
          >
            QR Scanner
          </h2>

          <p
            style={{
              margin: "4px 0 0",
              color: "#94a3b8",
              fontSize: "12px",
            }}
          >
            Upload a QR code image to decode and analyze its contents.
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: "25px",
          padding: "35px 20px",
          border: "1px dashed rgba(148,163,184,0.3)",
          borderRadius: "14px",
          textAlign: "center",
          background: "rgba(15,23,42,0.45)",
        }}
      >
        <FileImage
          size={40}
          style={{
            marginBottom: "12px",
            opacity: 0.8,
          }}
        />

        <div
          style={{
            color: "#cbd5e1",
            fontSize: "14px",
            marginBottom: "8px",
          }}
        >
          {file ? file.name : "Choose a QR code image"}
        </div>

        <div
          style={{
            color: "#64748b",
            fontSize: "11px",
            marginBottom: "18px",
          }}
        >
          PNG, JPG or JPEG
        </div>

        <label
          className="primary-button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "11px 18px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <Upload size={16} />

          Choose QR Image

          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileChange}
            disabled={loading}
            style={{ display: "none" }}
          />
        </label>
      </div>

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
          QR contents will be decoded and checked for suspicious links
          or scam indicators.
        </span>
      </div>

      <button
        onClick={handleScan}
        disabled={loading || !file}
        className="primary-button"
        style={{
          marginTop: "22px",
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "12px",
          cursor:
            loading || !file
              ? "not-allowed"
              : "pointer",
          opacity:
            loading || !file
              ? 0.6
              : 1,
        }}
      >
        {loading
          ? "Analyzing QR Code..."
          : "Scan QR Code"}
      </button>
    </div>
  );
}