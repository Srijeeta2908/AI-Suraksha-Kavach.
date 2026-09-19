import { Link } from "react-router-dom";

function Results() {
  return (
    <div className="app-container">
      <div
        className="page-container"
        style={{ paddingTop: "60px" }}
      >
        <div
          className="glass-card"
          style={{
            padding: "60px 30px",
            textAlign: "center"
          }}
        >
          <h1 className="section-title">
            Scan Results
          </h1>

          <p
            className="muted-text"
            style={{ marginTop: "15px" }}
          >
            Detailed threat analysis will appear here.
          </p>

          <Link
            to="/scanner"
            className="primary-button"
            style={{ marginTop: "25px" }}
          >
            Start New Scan
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Results;