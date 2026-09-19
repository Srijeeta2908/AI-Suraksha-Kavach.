import { useRef, useState } from "react";
import {
  Upload,
  File,
  X,
  CheckCircle2
} from "lucide-react";

function UploadBox({
  accept,
  onFileSelect,
  title = "Upload a file",
  description = "Drag and drop your file here or browse"
}) {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);

    if (onFileSelect) {
      onFileSelect(selectedFile);
    }
  };

  const handleInput = (event) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];

    handleFile(droppedFile);
  };

  const removeFile = (event) => {
    event.stopPropagation();

    setFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      style={{
        border: dragging
          ? "1px solid #38bdf8"
          : "1px dashed rgba(148,163,184,0.25)",

        background: dragging
          ? "rgba(14,165,233,0.07)"
          : "rgba(15,23,42,0.45)",

        borderRadius: "18px",
        padding: "35px 20px",
        textAlign: "center",
        cursor: "pointer",
        transition: "all .2s ease"
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInput}
        hidden
      />

      {!file ? (
        <>
          <div
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "16px",
              margin: "0 auto 15px",
              display: "grid",
              placeItems: "center",
              background: "rgba(37,99,235,0.12)",
              color: "#60a5fa"
            }}
          >
            <Upload size={25} />
          </div>

          <h3
            style={{
              fontFamily: "Space Grotesk",
              fontSize: "17px",
              marginBottom: "8px"
            }}
          >
            {title}
          </h3>

          <p
            style={{
              color: "#64748b",
              fontSize: "13px",
              lineHeight: 1.6
            }}
          >
            {description}
          </p>
        </>
      ) : (
        <>
          <CheckCircle2
            size={42}
            style={{
              color: "#22c55e",
              margin: "0 auto 12px"
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "9px"
            }}
          >
            <File size={17} />

            <span
              style={{
                maxWidth: "260px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {file.name}
            </span>

            <button
              onClick={removeFile}
              style={{
                border: "none",
                background: "transparent",
                color: "#94a3b8"
              }}
            >
              <X size={17} />
            </button>
          </div>

          <p
            style={{
              color: "#64748b",
              fontSize: "12px",
              marginTop: "8px"
            }}
          >
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </>
      )}
    </div>
  );
}

export default UploadBox;