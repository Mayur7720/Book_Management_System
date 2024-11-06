import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Allbooks from "./Pages/Allbooks";
import BookDetailsPage from "./Pages/BookDetailsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/allbooks" replace />} />
        <Route path="/allbooks" element={<Allbooks />} />
        <Route path="/allbooks/:id" element={<BookDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
