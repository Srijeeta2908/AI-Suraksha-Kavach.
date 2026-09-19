import { useState } from "react";
import {
  Link,
  ShieldCheck,
  Globe,
  MessageSquare,
  Mail,
  Image as ImageIcon,
  QrCode,
  Video,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";

import Navbar from "../components/Navbar";
import URLScanner from "../components/URLScanner";
import MessageScanner from "../components/MessageScanner";
import EmailScanner from "../components/EmailScanner";
import ImageScanner from "../components/ImageScanner";
import QRScanner from "../components/QRScanner";
import VideoScanner from "../components/VideoScanner";

import RiskScore from "../components/RiskScore";
import RiskMeter from "../components/RiskMeter";
import DetectionResults from "../components/DetectionResults";
import LoadingScanner from "../components/LoadingScanner";

import useScanner from "../hooks/useScanner";


export default function Scanner() {
  const [selectedScanner, setSelectedScanner] = useState("url");

  const {
    loading,
    result,
    error,
    runScan,
    reset,
  } = useScanner();


  const scannerOptions = [
    {
      id: "url",
      name: "URL Scanner",
      description: "Detect suspicious and phishing links",
      icon: Globe,
    },
    {
      id: "message",
      name: "Message Scanner",
      description: "Analyze SMS and chat messages",
      icon: MessageSquare,
    },
    {
      id: "email",
      name: "Email Scanner",
      description: "Detect phishing email indicators",
      icon: Mail,
    },
    {
      id: "image",
      name: "Image Scanner",
      description: "Analyze uploaded images",
      icon: ImageIcon,
    },
    {
      id: "qr",
      name: "QR Scanner",
      description: "Check QR code destinations",
      icon: QrCode,
    },
    {
      id: "video",
      name: "Video Scanner",
      description: "Analyze suspicious video files",
      icon: Video,
    },
  ];


  const handleScannerChange = (scanner) => {
    setSelectedScanner(scanner);
    reset();
  };


  const handleScan = async (type, data) => {
    await runScan(type, data);
  };


  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(37,99,235,0.15), transparent 35%), #020617",
        color: "#f8fafc",
      }}
    >
      <Navbar />


      <main
        style={{
          width: "min(1200px, 92%)",
          margin: "0 auto",
          padding: "45px 0 80px",
        }}
      >

        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <ShieldCheck size={28} />

              <span
                style={{
                  fontSize: "13px",
                  color: "#94a3b8",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                AI Suraksha Kavach
              </span>
            </div>


            <h1
              style={{
                margin: 0,
                fontSize: "clamp(30px, 5vw, 48px)",
                fontFamily: "Space Grotesk, sans-serif",
                background:
                  "linear-gradient(90deg, #60a5fa, #a78bfa, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Security Scanner
            </h1>


            <p
              style={{
                color: "#94a3b8",
                marginTop: "10px",
                maxWidth: "650px",
                lineHeight: 1.6,
              }}
            >
              Analyze links, messages, emails and media
              for potential digital threats.
            </p>
          </div>


          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 15px",
              borderRadius: "10px",
              border:
                "1px solid rgba(148,163,184,0.2)",
              color: "#cbd5e1",
              textDecoration: "none",
              background: "rgba(15,23,42,0.6)",
            }}
          >
            <ArrowLeft size={17} />
            Back Home
          </Link>
        </div>


        {/* SCANNER SELECTOR */}
        <section
          className="glass-card"
          style={{
            padding: "20px",
            marginBottom: "25px",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: "15px",
              fontFamily: "Space Grotesk, sans-serif",
            }}
          >
            Choose What You Want to Scan
          </h3>


          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(170px, 1fr))",
              gap: "12px",
            }}
          >
            {scannerOptions.map((scanner) => {
              const Icon = scanner.icon;
              const active =
                selectedScanner === scanner.id;


              return (
                <button
                  key={scanner.id}
                  onClick={() =>
                    handleScannerChange(scanner.id)
                  }
                  style={{
                    textAlign: "left",
                    padding: "16px",
                    borderRadius: "14px",
                    border: active
                      ? "1px solid rgba(96,165,250,0.8)"
                      : "1px solid rgba(148,163,184,0.15)",
                    background: active
                      ? "rgba(37,99,235,0.16)"
                      : "rgba(15,23,42,0.55)",
                    color: "#f8fafc",
                    cursor: "pointer",
                    transition: "0.2s ease",
                  }}
                >
                  <Icon
                    size={23}
                    style={{
                      marginBottom: "10px",
                    }}
                  />

                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "14px",
                      marginBottom: "5px",
                    }}
                  >
                    {scanner.name}
                  </div>

                  <div
                    style={{
                      fontSize: "11px",
                      lineHeight: 1.5,
                      color: "#94a3b8",
                    }}
                  >
                    {scanner.description}
                  </div>
                </button>
              );
            })}
          </div>
        </section>


        {/* SCANNER AREA */}
        {!result && !loading && (
          <section>
            {selectedScanner === "url" && (
              <URLScanner
                onScan={handleScan}
                loading={loading}
              />
            )}


            {selectedScanner === "message" && (
              <MessageScanner
                onScan={handleScan}
                loading={loading}
              />
            )}


            {selectedScanner === "email" && (
              <EmailScanner
                onScan={handleScan}
                loading={loading}
              />
            )}


            {selectedScanner === "image" && (
              <ImageScanner
                onScan={handleScan}
                loading={loading}
              />
            )}


            {selectedScanner === "qr" && (
              <QRScanner
                onScan={handleScan}
                loading={loading}
              />
            )}


            {selectedScanner === "video" && (
              <VideoScanner
                onScan={handleScan}
                loading={loading}
              />
            )}
          </section>
        )}


        {/* LOADING */}
        {loading && (
          <section
            style={{
              marginTop: "25px",
            }}
          >
            <LoadingScanner />
          </section>
        )}


        {/* ERROR */}
        {error && !loading && (
          <div
            className="glass-card"
            style={{
              marginTop: "20px",
              padding: "20px",
              border:
                "1px solid rgba(248,113,113,0.4)",
              background:
                "rgba(127,29,29,0.15)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: "#fca5a5",
              }}
            >
              Scan Error
            </h3>

            <p
              style={{
                color: "#fecaca",
                marginBottom: 0,
              }}
            >
              {error}
            </p>
          </div>
        )}


        {/* RESULTS */}
        {result && !loading && (
          <section
            style={{
              marginTop: "20px",
              display: "grid",
              gap: "15px",
            }}
          >

            {/* RESULT HEADER */}
            <div
              className="glass-card"
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "5px",
                  }}
                >
                  Scan Complete
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontFamily:
                      "Space Grotesk, sans-serif",
                  }}
                >
                  {result.title}
                </h2>
              </div>


              <button
                onClick={reset}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 15px",
                  borderRadius: "10px",
                  border:
                    "1px solid rgba(148,163,184,0.2)",
                  background:
                    "rgba(15,23,42,0.8)",
                  color: "#cbd5e1",
                  cursor: "pointer",
                }}
              >
                <RotateCcw size={16} />
                New Scan
              </button>
            </div>


            {/* SCORE + METER */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(250px, 0.8fr) minmax(300px, 1.5fr)",
                gap: "15px",
              }}
            >
              <RiskScore
                score={result.risk_score}
              />

              <RiskMeter
                score={result.risk_score}
              />
            </div>


            {/* FINDINGS */}
            <DetectionResults
              result={{
                status: result.status,
                title: result.title,
                description: result.description,
                findings: (
                  result.findings || []
                ).map(
                  (finding) =>
                    `${finding.category}: ${finding.description}`
                ),
              }}
            />


            {/* RECOMMENDATIONS */}
            {result.recommendations &&
              result.recommendations.length > 0 && (
                <div
                  className="glass-card"
                  style={{
                    padding: "25px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily:
                        "Space Grotesk, sans-serif",
                      marginTop: 0,
                      marginBottom: "15px",
                    }}
                  >
                    Recommended Actions
                  </h3>


                  <div
                    style={{
                      display: "grid",
                      gap: "8px",
                    }}
                  >
                    {result.recommendations.map(
                      (
                        recommendation,
                        index
                      ) => (
                        <div
                          key={index}
                          style={{
                            padding:
                              "11px 13px",
                            borderRadius: "10px",
                            background:
                              "rgba(15,23,42,0.6)",
                            color: "#cbd5e1",
                            fontSize: "12px",
                            lineHeight: 1.5,
                          }}
                        >
                          ✓ {recommendation}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}


            {/* SCAN AGAIN */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              <button
                onClick={reset}
                className="primary-button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <RotateCcw size={17} />
                Scan Something Else
              </button>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}