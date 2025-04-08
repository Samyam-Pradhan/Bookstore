import { CiSearch } from "react-icons/ci";
import "../styles/Navbar.css";
const Navbar = ({ onLoginClick, onSignupClick }) => {
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
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Features</a></li>
            <li className="auth-item"><a href="#" className="login-btn" onClick={onLoginClick}>Login</a></li>
            <li className="auth-item"><a href="#" className="signup-btn" onClick={onSignupClick}>SignUp</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;