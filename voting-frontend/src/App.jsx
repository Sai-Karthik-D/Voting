import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelector from "./components/RoleSelector.jsx";
import VotingPage from "./components/VotingPage.jsx";
import ResultsPage from "./components/ResultsPage.jsx";


const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Routes>
          <Route path="/" element={<RoleSelector />} />
          <Route path="/vote" element={<VotingPage />} />      {/* 👈 new route */}
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
