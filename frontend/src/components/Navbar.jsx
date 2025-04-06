import { CiSearch } from "react-icons/ci";
import "../styles/Navbar.css";
const Navbar = () =>{
return(
    <header>
        <div className="grid nav-grid">
            <div className="logo">
                <h1>Digital Bookstore</h1>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <CiSearch />
            </div>
            <nav>
                <ul>
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Features</a>
                    </li>
                    <li>
                        <a href="#">Login</a>
                    </li>
                    <li>
                        <a href="#">SignUp</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
)
}
export default Navbar;