import { CiSearch } from "react-icons/ci";
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

  return (
    <header>
      <div className="nav-grid">
        <div className="logo">
          <h1>Digital Bookstore</h1>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <CiSearch />
        </div>
        <nav>
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
