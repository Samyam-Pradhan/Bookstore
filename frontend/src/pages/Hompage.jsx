// src/pages/Homepage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import Category from '../components/Category';
import Countdown from '../components/Countdown';

import Footer from '../components/Footer';

function Homepage({ user, onLoginClick, onSignupClick }) {
  const targetDate = new Date(Date.now() + 16 * 60 * 60 * 1000).toISOString();

  return (
    <>
      <Navbar/>
      <Hero />
      <Category />
      <Footer />
     
    </>
  );
}

export default Homepage;
