import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from "./pages/Hompage";
import Login from "./components/LoginModal";
import Signup from "./components/SignupModal";
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
