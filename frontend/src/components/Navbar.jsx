import {
  ShieldCheck,
  LayoutDashboard,
  History,
  ScanSearch
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid rgba(148,163,184,0.08)",
        background: "rgba(5,11,24,0.82)",
        backdropFilter: "blur(18px)"
      }}
    >
      <div
        className="page-container"
        style={{
          minHeight: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px"
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px"
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
                fontWeight: 700,
                fontSize: "17px"
              }}
            >
              AI Suraksha Kavach
            </div>

            <div
              style={{
                fontSize: "9px",
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
            gap: "7px"
          }}
        >
          <Link
            to="/"
            className="secondary-button"
            style={{
              padding: "9px 12px",
              fontSize: "12px"
            }}
          >
            <LayoutDashboard size={15} />
            <span className="nav-label">Home</span>
          </Link>

          <Link
            to="/scanner"
            className="primary-button"
            style={{
              padding: "9px 12px",
              fontSize: "12px"
            }}
          >
            <ScanSearch size={15} />
            <span className="nav-label">Scanner</span>
          </Link>

          <Link
            to="/history"
            className="secondary-button"
            style={{
              padding: "9px 12px",
              fontSize: "12px"
            }}
          >
            <History size={15} />
            <span className="nav-label">History</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;