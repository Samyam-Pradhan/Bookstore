import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md">
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

        <nav>
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link to="/" className="hover:text-indigo-600 transition">
                Home
              </Link>
            </li>

            {/* Show Shop button only if logged in */}
            {isLoggedIn && (
              <li>
                <Link to="/shop" className="hover:text-indigo-600 transition">
                  Shop
                </Link>
              </li>
            )}

            <li>
              <Link to="/" className="hover:text-indigo-600 transition">
                About
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                  >
                    Sign Up
                  </Link>
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
  );
};

export default Navbar;