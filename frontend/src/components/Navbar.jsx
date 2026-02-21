import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

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
      "Fingerprint",
      "Rupa",
      "Jaico",
      "Wisdom Tree",
      "Bloomsbury",
    ],
    "By Imprints": [
      "Penguin Classics",
      "Everyman's Library",
      "Vintage Classics",
      "Penguin Modern Classics",
      "Hay House",
      "Dorling Kindersley",
      "Faber and Faber",
      "Hodder and Stoughton",
    ],
  };

  // Check login status
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

  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Digital Bookstore
        </Link>

        {/* Desktop search */}
        <div className="hidden md:flex items-center border rounded-full px-4 py-2 w-72">
          <input
            type="text"
            placeholder="Search books..."
            className="flex-1 outline-none text-sm"
          />
          <CiSearch className="text-xl text-gray-500" />
        </div>

        {/* Navigation */}
        <nav className="relative">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {/* Shop Books with Mega Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="hover:text-indigo-600 transition">
                Shop Books
              </button>

              {showDropdown && (
                <div className="absolute left-0 top-full w-screen max-w-7xl mx-auto bg-white shadow-lg mt-2 p-6 grid grid-cols-4 gap-6 z-50">
                  {Object.entries(categories).map(([section, items], idx) => (
                    <div key={idx}>
                      <h4 className="font-bold mb-3">{section}</h4>
                      <ul className="space-y-2">
                        {items.map((item, i) => (
                          <li key={i}>
                            <Link
                              to="/shop"
                              className="hover:text-indigo-600 transition"
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
            </li>

            {/* Other Links */}
            <li>
              <Link to="/" className="hover:text-indigo-600 transition">
                Explore
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-indigo-600 transition">
                Support
              </Link>
            </li>

            {/* Login / Signup / Logout */}
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

      {/* Mobile search */}
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