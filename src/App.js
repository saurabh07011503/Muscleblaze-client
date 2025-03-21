import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SupplementsByType from "./SupplementsByType";
import SupplementsById from "./SupplementsById";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SupplementsByType />} />
        <Route path="/supplement/:id" element={<SupplementsById />} />
      </Routes>
    </Router>
  );
}

export default App;
