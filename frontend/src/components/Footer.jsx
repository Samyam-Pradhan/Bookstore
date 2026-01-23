import { FaFacebook, FaInstagram, FaPinterest, FaLinkedin } from "react-icons/fa";
import React from "react";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 transition"
          >
            <FaFacebook size={26} />
          </a>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram size={26} />
          </a>

          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition"
          >
            <FaPinterest size={26} />
          </a>

          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaLinkedin size={26} />
          </a>
        </div>

        {/* Links */}
        <ul className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
          <li>
            <a href="#" className="hover:text-white transition">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
          </li>
        </ul>

        {/* Copyright */}
        <p className="text-center text-xs text-gray-400">
          © 2025 Digital Bookstore. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
