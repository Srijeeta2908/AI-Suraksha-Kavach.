import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Scanner from "./pages/Scanner";
import Results from "./pages/Results";
import History from "./pages/History";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/scanner"
        element={<Scanner />}
      />

      <Route
        path="/results"
        element={<Results />}
      />

      <Route
        path="/history"
        element={<History />}
      />
    </Routes>
  );
}

export default App;