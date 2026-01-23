import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from "./pages/Hompage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
}

export default App;
