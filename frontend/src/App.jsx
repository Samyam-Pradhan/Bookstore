import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Hompage";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import AuthModal from "./components/AuthModal";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookDetails from "./pages/BookDetails";
import CategoryPage from "./pages/CategoryPage";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <Router>
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/book/:title" element={<BookDetails />} />
      </Routes>
      {showLogin && (
        <AuthModal onClose={() => setShowLogin(false)}>
          <Login
            onClose={() => setShowLogin(false)}
            onSuccess={() => setShowLogin(false)}
          />
        </AuthModal>
      )}
      {showSignup && (
        <AuthModal onClose={() => setShowSignup(false)}>
          <Signup
            onClose={() => setShowSignup(false)}
            onSuccess={() => setShowSignup(false)}
          />
        </AuthModal>
      )}
    </Router>
  );
}

export default App;