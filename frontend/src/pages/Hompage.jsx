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
  const handleAuthSuccess = () => {
    setShowLogin(false);
    setShowSignup(false);
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
      {showLogin && (
        <Login
          onSuccess={handleAuthSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}

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