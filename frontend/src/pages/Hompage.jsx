import React from "react";
import Hero from "../components/Hero";
import Category from "../components/Category";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import BestSelling from "../components/BestSelling";

function Homepage() {
  return (
    <>
      <Hero />
      <Feature />
      <Category />
      <BestSelling />
      <Footer />
    </>
  );
}

export default Homepage;