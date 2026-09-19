import {
  ShieldCheck,
  ScanSearch,
  LockKeyhole,
  ArrowRight,
  Link2,
  MessageSquareWarning,
  MailWarning,
  QrCode,
  Image,
  Video,
  History
} from "lucide-react";

import { Link } from "react-router-dom";

const scannerTypes = [
  {
    icon: Link2,
    title: "URL Scanner",
    description: "Check suspicious links and identify possible phishing or malicious URLs."
  },
  {
    icon: MessageSquareWarning,
    title: "Message Scanner",
    description: "Analyze SMS, WhatsApp-style messages and suspicious text content."
  },
  {
    icon: MailWarning,
    title: "Email Scanner",
    description: "Detect phishing patterns and suspicious content inside emails."
  },
  {
    icon: QrCode,
    title: "QR Scanner",
    description: "Inspect QR codes and identify potentially dangerous destinations."
  },
  {
    icon: Image,
    title: "Image Scanner",
    description: "Use OCR and AI analysis to identify suspicious information in images."
  },
  {
    icon: Video,
    title: "Video Scanner",
    description: "Analyze video content for potentially suspicious or fraudulent material."
  }
];

function Home() {
  return (
    <div className="app-container">

      {/* Navigation */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: "1px solid rgba(148,163,184,0.08)",
          background: "rgba(5,11,24,0.78)",
          backdropFilter: "blur(18px)"
        }}
      >
        <div
          className="page-container"
          style={{
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >

          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "13px",
                display: "grid",
                placeItems: "center",
                background:
                  "linear-gradient(135deg,#2563eb,#0891b2)",
                boxShadow:
                  "0 8px 25px rgba(37,99,235,0.25)"
              }}
            >
              <ShieldCheck size={24} />
            </div>

            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk",
                  fontSize: "18px",
                  fontWeight: 700
                }}
              >
                AI Suraksha Kavach
              </div>

              <div
                style={{
                  fontSize: "10px",
                  color: "#64748b",
                  letterSpacing: "0.12em"
                }}
              >
                DIGITAL SAFETY SYSTEM
              </div>
            </div>
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <Link
              to="/history"
              className="secondary-button"
              style={{
                padding: "9px 14px",
                fontSize: "13px"
              }}
            >
              <History size={16} />
              History
            </Link>

            <Link
              to="/scanner"
              className="primary-button"
              style={{
                padding: "10px 16px",
                fontSize: "13px"
              }}
            >
              <ScanSearch size={16} />
              Scan Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main>

        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "100px 0 80px"
          }}
        >

          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              width: "350px",
              height: "350px",
              borderRadius: "50%",
              background: "rgba(37,99,235,0.10)",
              filter: "blur(70px)",
              top: "50px",
              left: "-120px",
              pointerEvents: "none"
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "rgba(6,182,212,0.08)",
              filter: "blur(70px)",
              right: "-100px",
              top: "100px",
              pointerEvents: "none"
            }}
          />

          <div
            className="page-container"
            style={{
              position: "relative",
              textAlign: "center"
            }}
          >

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 13px",
                borderRadius: "999px",
                border:
                  "1px solid rgba(96,165,250,0.18)",
                background:
                  "rgba(37,99,235,0.08)",
                color: "#93c5fd",
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "24px"
              }}
            >
              <ShieldCheck size={15} />
              AI-POWERED DIGITAL PROTECTION
            </div>

            <h1
              className="section-title"
              style={{
                maxWidth: "850px",
                margin: "0 auto"
              }}
            >
              Your Digital World.
              <br />

              <span className="gradient-text">
                Protected by Intelligence.
              </span>
            </h1>

            <p
              style={{
                maxWidth: "680px",
                margin: "25px auto 0",
                color: "#94a3b8",
                fontSize: "17px",
                lineHeight: 1.8
              }}
            >
              AI Suraksha Kavach helps identify suspicious links,
              phishing attempts, scam messages, malicious content
              and other digital threats before they put you at risk.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                marginTop: "34px",
                flexWrap: "wrap"
              }}
            >
              <Link
                to="/scanner"
                className="primary-button"
              >
                <ScanSearch size={19} />
                Start a Security Scan
                <ArrowRight size={17} />
              </Link>

              <a
                href="#protection"
                className="secondary-button"
              >
                Explore Protection
              </a>
            </div>

            {/* Trust indicators */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "28px",
                flexWrap: "wrap",
                marginTop: "42px",
                color: "#64748b",
                fontSize: "12px"
              }}
            >
              <span>✓ AI-assisted analysis</span>
              <span>✓ Multiple threat types</span>
              <span>✓ Risk scoring</span>
              <span>✓ Scan history</span>
            </div>

          </div>
        </section>

        {/* Scanner types */}
        <section
          id="protection"
          style={{
            padding: "70px 0 100px"
          }}
        >
          <div className="page-container">

            <div style={{ textAlign: "center", marginBottom: "48px" }}>

              <div
                style={{
                  color: "#38bdf8",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  marginBottom: "12px"
                }}
              >
                ONE PLATFORM
              </div>

              <h2 className="section-title">
                Protection across
                <br />
                <span className="gradient-text">
                  multiple threat surfaces
                </span>
              </h2>

              <p
                className="muted-text"
                style={{
                  maxWidth: "650px",
                  margin: "18px auto",
                  lineHeight: 1.7
                }}
              >
                Scan different forms of digital content from one
                unified security platform.
              </p>

            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(280px,1fr))",
                gap: "18px"
              }}
            >

              {scannerTypes.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="glass-card"
                    style={{
                      padding: "25px",
                      transition:
                        "transform .2s ease, border-color .2s ease"
                    }}
                  >

                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        display: "grid",
                        placeItems: "center",
                        borderRadius: "14px",
                        background:
                          "rgba(37,99,235,0.12)",
                        color: "#60a5fa",
                        marginBottom: "20px"
                      }}
                    >
                      <Icon size={23} />
                    </div>

                    <h3
                      style={{
                        fontFamily: "Space Grotesk",
                        fontSize: "19px",
                        marginBottom: "10px"
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: "14px",
                        lineHeight: 1.7
                      }}
                    >
                      {item.description}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>
        </section>

        {/* CTA */}
        <section style={{ paddingBottom: "100px" }}>
          <div className="page-container">

            <div
              className="glass-card"
              style={{
                position: "relative",
                overflow: "hidden",
                padding: "55px 30px",
                textAlign: "center"
              }}
            >

              <LockKeyhole
                size={40}
                style={{
                  color: "#38bdf8",
                  margin: "0 auto 18px"
                }}
              />

              <h2
                style={{
                  fontFamily: "Space Grotesk",
                  fontSize: "30px",
                  marginBottom: "12px"
                }}
              >
                Don't trust it.
                <span className="gradient-text">
                  {" "}Scan it.
                </span>
              </h2>

              <p
                className="muted-text"
                style={{
                  maxWidth: "550px",
                  margin: "0 auto 25px",
                  lineHeight: 1.7
                }}
              >
                Check suspicious digital content before clicking,
                replying, downloading or sharing.
              </p>

              <Link
                to="/scanner"
                className="primary-button"
              >
                <ScanSearch size={18} />
                Open Security Scanner
              </Link>

            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop:
            "1px solid rgba(148,163,184,0.08)",
          padding: "28px 0",
          color: "#64748b",
          fontSize: "12px"
        }}
      >
        <div
          className="page-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap"
          }}
        >
          <span>
            © 2026 AI Suraksha Kavach
          </span>

          <span>
            Intelligent protection for a safer digital world.
          </span>
        </div>
      </footer>

    </div>
  );
}

export default Home;