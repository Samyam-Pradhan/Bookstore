import { CiSearch } from "react-icons/ci";
<<<<<<< HEAD

const Navbar = ({ onLoginClick, onSignupClick }) => {
=======
import "../styles/Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultUserImg from "../images/user.png";

const Navbar = ({ user, onLoginClick, onSignupClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      setIsDropdownOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setIsLoggingOut(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

>>>>>>> d77987222f1f73760d6ff6e720dbe7b407e4dfdf
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">
          Digital Bookstore
        </div>

        {/* Search Bar */}
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
<<<<<<< HEAD
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <a href="#" className="hover:text-indigo-600 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600 transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600 transition">
                Features
              </a>
            </li>

            {/* Auth buttons */}
            <li>
              <button
                onClick={onLoginClick}
                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition"
              >
                Login
              </button>
            </li>
            <li>
              <button
                onClick={onSignupClick}
                className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
              >
                Sign Up
              </button>
            </li>
=======
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="/shop">Shop</a></li>

            {!user ? (
              <>
                <li className="auth-item">
                  <a href="#" className="login-btn" onClick={onLoginClick}>Login</a>
                </li>
                <li className="auth-item">
                  <a href="#" className="signup-btn" onClick={onSignupClick}>SignUp</a>
                </li>
              </>
            ) : (
              <li className="auth-item user-info" ref={dropdownRef} style={{ position: "relative" }}>
                <img
                  src={user.photoURL || defaultUserImg}
                  alt="User Avatar"
                  style={{ 
                    borderRadius: "50%", 
                    width: 40, 
                    height: 40, 
                    cursor: "pointer", 
                    border: "2px solid #fff" 
                  }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  title="User Profile"
                />
                {isDropdownOpen && (
                  <div
                    className="user-dropdown"
                    style={{
                      position: "absolute",
                      top: "50px",
                      right: 0,
                      background: "#222",
                      color: "#fff",
                      padding: "15px",
                      borderRadius: "6px",
                      width: "220px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
                      zIndex: 1000,
                    }}
                  >
                    <div style={{ marginBottom: "10px" }}>
                      <strong>{user.displayName || "User"}</strong>
                      <br />
                      <small>{user.email}</small>
                    </div>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      style={{
                        width: "100%",
                        padding: "8px",
                        backgroundColor: "#e63946",
                        border: "none",
                        borderRadius: "4px",
                        color: "#fff",
                        cursor: isLoggingOut ? "not-allowed" : "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                )}
              </li>
            )}
>>>>>>> d77987222f1f73760d6ff6e720dbe7b407e4dfdf
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
