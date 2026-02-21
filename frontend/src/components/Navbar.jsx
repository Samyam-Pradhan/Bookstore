import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  return (
    <header className="relative bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Digital Bookstore
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center border rounded-full px-4 py-2 w-72">
          <input
            type="text"
            placeholder="Search books..."
            className="flex-1 outline-none text-sm"
          />
          <CiSearch className="text-xl text-gray-500" />
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-6 text-sm font-medium">

            <li>
              <Link to="/" className="hover:text-indigo-600 transition">
                Home
              </Link>
            </li>

            {/* SHOP WITH MEGA MENU */}
            {isLoggedIn && (
              <li className="relative group">
                <span className="cursor-pointer hover:text-indigo-600 transition">
                  Shop
                </span>

                {/* Mega Dropdown */}
                <div className="absolute left-0 top-full w-screen bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  
                  <div className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-4 gap-8">

                    {/* Column 1 */}
                    <div>
                      <h3 className="font-semibold mb-4 text-indigo-600">
                        Browse
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link to="/shop" className="hover:text-indigo-600">
                            All Books
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                      <h3 className="font-semibold mb-4 text-indigo-600">
                        Categories
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link to="/category/fiction" className="hover:text-indigo-600">
                            Fiction
                          </Link>
                        </li>
                        <li>
                          <Link to="/category/non-fiction" className="hover:text-indigo-600">
                            Non-Fiction
                          </Link>
                        </li>
                        <li>
                          <Link to="/category/science" className="hover:text-indigo-600">
                            Science
                          </Link>
                        </li>
                        <li>
                          <Link to="/category/programming" className="hover:text-indigo-600">
                            Programming
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                      <h3 className="font-semibold mb-4 text-indigo-600">
                        Popular
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link to="/category/business" className="hover:text-indigo-600">
                            Business
                          </Link>
                        </li>
                        <li>
                          <Link to="/category/self-help" className="hover:text-indigo-600">
                            Self Help
                          </Link>
                        </li>
                        <li>
                          <Link to="/category/history" className="hover:text-indigo-600">
                            History
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                      <h3 className="font-semibold mb-4 text-indigo-600">
                        Special
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link to="/category/new" className="hover:text-indigo-600">
                            New Arrivals
                          </Link>
                        </li>
                        <li>
                          <Link to="/category/bestsellers" className="hover:text-indigo-600">
                            Best Sellers
                          </Link>
                        </li>
                        <li>
                          <Link to="/category/discounts" className="hover:text-indigo-600">
                            Discounts
                          </Link>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
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

      {/* Mobile Search */}
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