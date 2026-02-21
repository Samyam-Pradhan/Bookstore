import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Category from "../components/Category";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import BestSelling from "../components/BestSelling";
import AuthModal from "../components/AuthModal";
import Login from "./Login";
import Signup from "./Signup";

function Homepage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Called when login/signup is successful
  const handleAuthSuccess = () => {
    setShowLogin(false);
    setShowSignup(false);
    // You can also trigger Navbar update via a state or context
  };

  return (
    <>
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />

      <Hero />
      <Feature />
      <Category />
      <BestSelling />
      <Footer />

      {/* Login Modal */}
      {showLogin && (
        <Login
          onSuccess={handleAuthSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}

      {/* Signup Modal */}
      {showSignup && (
        <Signup
          onSuccess={handleAuthSuccess}
          onClose={() => setShowSignup(false)}
        />
      )}
    </>
  );
}

export default Homepage;