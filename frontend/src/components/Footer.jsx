import { FaFacebook, FaInstagram, FaPinterest, FaLinkedin } from "react-icons/fa";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Digital Bookstore brings you the best titles across genres. Discover your next favorite read and join our community of book lovers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Categories</a></li>
            <li><a href="#" className="hover:text-white transition">Best Sellers</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to our newsletter for the latest arrivals and exclusive offers.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-12"></div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-xs text-gray-400">
          © 2025 Digital Bookstore. All Rights Reserved.
        </p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition">
            <FaFacebook size={22} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
            <FaInstagram size={22} />
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
            <FaPinterest size={22} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
            <FaLinkedin size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
