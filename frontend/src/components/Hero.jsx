import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-[#FFFAF1] border-b border-black/5">
      <div className="relative max-w-5xl mx-auto px-6 py-28 md:py-32 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-0.5 bg-black/20" />
        </div>
        <h1 className="font-serif text-5xl md:text-7xl text-gray-900 leading-tight max-w-4xl mx-auto">
          Discover your next
          <br />
          <span className="text-gray-600 relative inline-block mt-2">
            favourite book
            <span className="absolute -bottom-3 left-0 right-0 h-px bg-black/10 mx-auto w-3/4" />
          </span>
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mt-8">
          Explore thousands of titles across genres, handpicked for every reader's journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10">
          <Link
            to="/"
            className="group relative px-10 py-4 bg-black text-white text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors duration-300"
          >
            <span className="relative z-10">Shop Now</span>
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
          </Link>
          
          <Link
            to="/"
            className="px-10 py-4 border border-black/20 text-black text-sm uppercase tracking-widest hover:border-black hover:bg-black hover:text-white transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
        <div className="flex justify-center gap-8 mt-16 text-xs text-gray-400 uppercase tracking-wider">
          <span>1000+ Books</span>
          <span className="text-gray-300">•</span>
          <span>Free Shipping</span>
          <span className="text-gray-300">•</span>
          <span>Weekly Updates</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px gradient-to-r from-transparent via-black/10 to-transparent" />
    </section>
  );
};

export default Hero;