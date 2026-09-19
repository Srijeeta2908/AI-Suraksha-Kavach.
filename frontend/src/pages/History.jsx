import { useEffect, useState } from "react";
import {
  History as HistoryIcon,
  Trash2,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  RefreshCw,
} from "lucide-react";

import Navbar from "../components/Navbar";

import {
  getScanHistory,
  deleteScanHistory,
  clearScanHistory,
} from "../services/history";


export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHistory = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getScanHistory();
      setHistory(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load scan history."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadHistory();
  }, []);


  const handleDelete = async (id) => {
    try {
      await deleteScanHistory(id);

      setHistory((current) =>
        current.filter(
          (item) => item.id !== id
        )
      );
    } catch (err) {
      console.error(err);

      alert(
        "Unable to delete this scan."
      );
    }
  };


  const handleClear = async () => {
    if (history.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete all scan history?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await clearScanHistory();

      setHistory([]);
    } catch (err) {
      console.error(err);

      alert(
        "Unable to clear scan history."
      );
    }
  };


  const getStatusIcon = (status) => {
    if (status === "danger") {
      return (
        <XCircle
          size={20}
          style={{ color: "#ef4444" }}
        />
      );
    }

    if (status === "warning") {
      return (
        <AlertTriangle
          size={20}
          style={{ color: "#f59e0b" }}
        />
      );
    }

    return (
      <ShieldCheck
        size={20}
        style={{ color: "#22c55e" }}
      />
    );
  };


  const getStatusClass = (status) => {
    if (status === "danger") {
      return "danger";
    }

    if (status === "warning") {
      return "warning";
    }

    return "safe";
  };


  return (
    <>
      <Navbar />

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "110px 20px 50px",
        }}
      >
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
                gap: "12px",
              }}
            >
              <HistoryIcon size={28} />

              <h1
                style={{
                  margin: 0,
                  fontFamily:
                    "Space Grotesk, sans-serif",
                  fontSize: "32px",
                }}
              >
                Scan History
              </h1>
            </div>

            <p
              style={{
                marginTop: "8px",
                color: "#94a3b8",
              }}
            >
              View your previous security scans
              and their results.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              onClick={loadHistory}
              className="secondary-button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 15px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <button
              onClick={handleClear}
              disabled={history.length === 0}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 15px",
                borderRadius: "10px",
                border: "1px solid rgba(239,68,68,0.3)",
                background:
                  "rgba(239,68,68,0.08)",
                color: "#f87171",
                cursor:
                  history.length === 0
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  history.length === 0
                    ? 0.5
                    : 1,
              }}
            >
              <Trash2 size={16} />
              Clear All
            </button>
          </div>
        </div>


        {loading && (
          <div
            className="glass-card"
            style={{
              padding: "40px",
              textAlign: "center",
            }}
          >
            Loading scan history...
          </div>
        )}


        {error && !loading && (
          <div
            className="glass-card"
            style={{
              padding: "25px",
              color: "#f87171",
            }}
          >
            {error}
          </div>
        )}


        {!loading &&
          !error &&
          history.length === 0 && (
            <div
              className="glass-card"
              style={{
                padding: "60px 30px",
                textAlign: "center",
              }}
            >
              <HistoryIcon
                size={45}
                style={{
                  marginBottom: "15px",
                  opacity: 0.6,
                }}
              />

              <h2>
                No scans yet
              </h2>

              <p
                style={{
                  color: "#94a3b8",
                }}
              >
                Your completed security scans
                will appear here.
              </p>
            </div>
          )}


        {!loading &&
          history.length > 0 && (
            <div
              style={{
                display: "grid",
                gap: "16px",
              }}
            >
              {history.map((item) => (
                <div
                  key={item.id}
                  className="glass-card"
                  style={{
                    padding: "22px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      gap: "20px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "13px",
                        alignItems: "flex-start",
                      }}
                    >
                      {getStatusIcon(
                        item.status
                      )}

                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flexWrap:
                              "wrap",
                          }}
                        >
                          <h3
                            style={{
                              margin: 0,
                              fontSize: "18px",
                            }}
                          >
                            {item.title}
                          </h3>

                          <span
                            style={{
                              padding:
                                "4px 9px",
                              borderRadius:
                                "999px",
                              fontSize:
                                "10px",
                              textTransform:
                                "uppercase",
                              background:
                                "rgba(148,163,184,0.1)",
                              color:
                                "#cbd5e1",
                            }}
                          >
                            {item.scanner_type}
                          </span>
                        </div>

                        <p
                          style={{
                            margin:
                              "7px 0 0",
                            color:
                              "#94a3b8",
                            fontSize:
                              "13px",
                          }}
                        >
                          {item.description}
                        </p>

                        <p
                          style={{
                            margin:
                              "10px 0 0",
                            color:
                              "#64748b",
                            fontSize:
                              "11px",
                          }}
                        >
                          {new Date(
                            item.created_at
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>


                    <div
                      style={{
                        display: "flex",
                        alignItems:
                          "center",
                        gap: "15px",
                      }}
                    >
                      <div
                        style={{
                          textAlign:
                            "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize:
                              "28px",
                            fontWeight:
                              700,
                          }}
                        >
                          {item.risk_score}
                        </div>

                        <div
                          style={{
                            fontSize:
                              "10px",
                            color:
                              "#94a3b8",
                          }}
                        >
                          RISK SCORE
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          handleDelete(
                            item.id
                          )
                        }
                        title="Delete scan"
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius:
                            "10px",
                          border:
                            "1px solid rgba(148,163,184,0.15)",
                          background:
                            "rgba(15,23,42,0.6)",
                          color:
                            "#94a3b8",
                          cursor:
                            "pointer",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                        }}
                      >
                        <Trash2
                          size={16}
                        />
                      </button>
                    </div>
                  </div>


                  {item.input_data && (
                    <div
                      style={{
                        marginTop:
                          "18px",
                        padding:
                          "12px 14px",
                        borderRadius:
                          "10px",
                        background:
                          "rgba(15,23,42,0.55)",
                        color:
                          "#cbd5e1",
                        fontSize:
                          "12px",
                        overflowWrap:
                          "anywhere",
                      }}
                    >
                      {item.input_data}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
      </main>
    </>
  );
}