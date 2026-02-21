import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
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

  // Shop Books categories
  const categories = {
    "Main Collections": ["Shop All", "Fiction", "Non-Fiction", "New Arrivals"],
    "Other Collections": [
      "Children's Books",
      "Tarot Cards",
      "Journals & Notebooks",
      "Boxed Sets",
      "Our Top Picks",
      "Budget Picks: Under Rs.500",
      "Nepali Literature",
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
        className="bg-white shadow-md z-40 relative"
        onMouseLeave={() => setShowDropdown(false)}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
  
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            Digital Bookstore
          </Link>

   
          <div className="hidden md:flex items-center border rounded-full px-4 py-2 w-72">
            <input
              type="text"
              placeholder="Search books..."
              className="flex-1 outline-none text-sm"
            />
            <CiSearch className="text-xl text-gray-500" />
          </div>


          <nav className="relative">
            <ul className="flex items-center gap-6 text-sm font-medium">

              <li onMouseEnter={() => setShowDropdown(true)}>
                <button className="hover:text-indigo-600 transition">
                  Shop Books
                </button>
              </li>
              {isLoggedIn && (
                <li>
                  <Link
                    to="/cart"
                    className="flex items-center gap-1 px-3 py-2 hover:text-indigo-600 transition"
                  >
                    <CiShoppingCart className="text-xl" />
                    Cart
                  </Link>
                </li>
              )}

              {!isLoggedIn ? (
                <>
                  <li>
                    <button
                      onClick={() => setShowLogin(true)}
                      className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition"
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setShowSignup(true)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                    >
                      Sign Up
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {showDropdown && (
          <div
            className="absolute left-0 right-0 top-full bg-white shadow-lg p-6 grid grid-cols-4 gap-6 z-40"
            onMouseEnter={() => setShowDropdown(true)}
          >
            {Object.entries(categories).map(([section, items], idx) => (
              <div key={idx}>
                <h4 className="font-bold mb-3 text-gray-800">{section}</h4>
                <ul className="space-y-2 text-sm">
                  {items.map((item, i) => (
                    <li key={i}>
                      <Link
                        to="/shop"
                        className="text-gray-600 hover:text-indigo-600 transition"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <div className="md:hidden px-6 pb-4">
          <div className="flex items-center border rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search books..."
              className="flex-1 outline-none text-sm"
            />
            <CiSearch className="text-xl text-gray-500" />
          </div>
        </div>
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