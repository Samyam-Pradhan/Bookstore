import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";
import AuthModal from "./AuthModal";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toSlug = (name) =>
    name
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/'/g, "")
      .replace(/\s+/g, "-");

  const categories = {
    "Main Collections": [
      "Hardcover Fiction",
      "Paperback Fiction",
      "Hardcover Nonfiction",
      "Paperback Nonfiction",
      "Young Adult Hardcover",
    ],
    "Other Collections": [
      "Children's Books",
      "Business Books",
      "Advice How-To and Miscellaneous",
    ],
    "By Publishers": [
      "Penguin Random House",
      "Harper Collins",
      "Macmillan",
      "Simon & Schuster",
      "Hachette",
      "Rupa",
    ],
    "By Imprints": [
      "Penguin Classics",
      "Everyman's Library",
      "Vintage Classics",
      "Penguin Modern Classics",
    ],
  };

  return (
    <>
      <header 
        className="bg-white border-b border-gray-200 sticky top-0 z-40"
        onMouseLeave={() => setShowDropdown(false)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="font-serif text-2xl text-gray-800 tracking-tight whitespace-nowrap">
              Digital Bookstore
            </Link>
            <div className="hidden md:flex items-center border border-gray-300 rounded-md px-3 py-2 w-80 bg-white hover:border-gray-400 transition-colors">
              <input
                type="text"
                placeholder="Search books..."
                className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />
              <CiSearch className="text-xl text-gray-500" />
            </div>
            <nav className="flex items-center gap-6">
              <div 
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
              >
                <button className="flex items-center gap-1 text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors font-medium">
                  Shop
                  <FiChevronDown className={`text-sm transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {isLoggedIn && (
                <Link
                  to="/cart"
                  className="flex items-center gap-1 text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <CiShoppingCart className="text-xl" />
                  <span className="hidden lg:inline">Cart</span>
                </Link>
              )}

              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowSignup(true)}
                    className="text-sm uppercase tracking-wider bg-gray-900 text-white px-5 py-2 hover:bg-gray-800 transition-colors font-medium"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLogout}
                    className="text-xs uppercase tracking-wider text-gray-500 hover:text-gray-900 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </div>
          <div className="md:hidden pb-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
              <input
                type="text"
                placeholder="Search books..."
                className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />
              <CiSearch className="text-xl text-gray-500" />
            </div>
          </div>
        </div>
        {showDropdown && (
          <div 
            className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg"
            onMouseEnter={() => setShowDropdown(true)}
          >
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(categories).map(([section, items], idx) => (
                <div key={idx}>
                  <div className="w-8 h-0.5 bg-gray-300 mb-4" />
                  <h4 className="font-serif text-sm text-gray-800 mb-4 uppercase tracking-wider font-medium">
                    {section}
                  </h4>
                  <ul className="space-y-3">
                    {items.map((item, i) => (
                      <li key={i}>
                        <Link
                          to={`/category/${toSlug(item)}`}
                          className="text-xs text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wider"
                          onClick={() => setShowDropdown(false)}
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200" />
          </div>
        )}
      </header>
      {showLogin && (
        <AuthModal onClose={() => setShowLogin(false)}>
          <Login
            onClose={() => setShowLogin(false)}
            onSuccess={() => {
              setShowLogin(false);
              setIsLoggedIn(true);
            }}
          />
        </AuthModal>
      )}
      {showSignup && (
        <AuthModal onClose={() => setShowSignup(false)}>
          <Signup
            onClose={() => setShowSignup(false)}
            onSuccess={() => {
              setShowSignup(false);
              setIsLoggedIn(true);
            }}
          />
        </AuthModal>
      )}
    </>
  );
};

export default Navbar;