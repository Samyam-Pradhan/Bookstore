import hero3 from "../images/hero3.jpg";
import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-[#FFFAF0]">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Discover your next <span className="text-indigo-600">favourite book</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto md:mx-0">
            Explore thousands of titles across genres, handpicked for every reader’s journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-full text-lg font-semibold hover:bg-indigo-700 transition">
              Shop Now
            </button>
            <button className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-full text-lg font-semibold hover:bg-indigo-50 transition">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex justify-center relative">
          <img
            src={hero3}
            alt="Books"
            className="w-full max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
