import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Allbooks from "./Pages/Allbooks";
import BookDetailsPage from "./Pages/BookDetailsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/allbooks" element={<Allbooks />} />
        <Route path="/allbooks/:id" element={<BookDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
