import { FaFacebook, FaInstagram, FaPinterest, FaLinkedin } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#EFE9E0] border-t border-black/15">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-16">
        <div>
          <div className="w-12 h-0.5 bg-black/40 mb-5" />
          <h3 className="font-serif text-xl text-gray-900 mb-4">About</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Digital Bookstore brings you the best titles across genres. 
            Discover your next favorite read.
          </p>
          <p className="text-xs text-gray-600 mt-6 font-mono">EST. 2025</p>
        </div>
        <div>
          <div className="w-12 h-0.5 bg-black/40 mb-5" />
          <h3 className="font-serif text-xl text-gray-900 mb-4">Explore</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="text-gray-700 hover:text-gray-900 text-sm uppercase tracking-wider">Home</Link></li>
            <li><Link to="/" className="text-gray-700 hover:text-gray-900 text-sm uppercase tracking-wider">Categories</Link></li>
            <li><Link to="/" className="text-gray-700 hover:text-gray-900 text-sm uppercase tracking-wider">Bestsellers</Link></li>
            <li><Link to="/" className="text-gray-700 hover:text-gray-900 text-sm uppercase tracking-wider">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="w-12 h-0.5 bg-black/40 mb-5" />
          <h3 className="font-serif text-xl text-gray-900 mb-4">Newsletter</h3>
          <p className="text-sm text-gray-700 mb-6">Subscribe for new arrivals.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-4 py-3 bg-white/90 border border-black/20 text-gray-900 text-sm focus:outline-none focus:border-black/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest hover:bg-gray-800"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-black/15" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-xs text-gray-600 font-mono">© 2026 Digital Bookstore</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="https://facebook.com" className="text-gray-600 hover:text-gray-900"><FaFacebook size={18} /></a>
          <a href="https://instagram.com" className="text-gray-600 hover:text-gray-900"><FaInstagram size={18} /></a>
          <a href="https://pinterest.com" className="text-gray-600 hover:text-gray-900"><FaPinterest size={18} /></a>
          <a href="https://linkedin.com" className="text-gray-600 hover:text-gray-900"><FaLinkedin size={18} /></a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-6 text-center">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Data: The New York Times</p>
      </div>
    </footer>
  );
};

export default Footer;