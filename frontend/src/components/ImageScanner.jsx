import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";


export default function ImageScanner({ onScan, loading }) {
  const [file, setFile] = useState(null);


  const handleScan = () => {
    if (!file) return;

    onScan("image", file);
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
        <ImageIcon size={22} />

        <h3>Image Security Scanner</h3>
      </div>


      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setFile(e.target.files?.[0] || null)
        }
      />


      {file && (
        <p style={{ marginTop: "10px" }}>
          Selected: {file.name}
        </p>
      )}


      <button
        onClick={handleScan}
        disabled={loading || !file}
        className="primary-button"
        style={{ marginTop: "15px" }}
      >
        {loading ? "Analyzing..." : "Scan Image"}
      </button>
    </div>
  );
}