import { Link } from "react-router-dom";
import thespianLogo from "./assets/logos/thespian-logo.png";

import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar-parent">
            <div className="navbar-content">
                <div className="main-logo">
                    <Link to="/">
                        <img
                            src={thespianLogo}
                            alt="A film strip sitting atop the website name"
                        />
                    </Link>
                </div>
                <div className="navbar-links">
                    <ul>
                        <li>
                            <Link to="/" className="webpage-link">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="webpage-link">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/attributions" className="webpage-link">
                                Attributions
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy" className="webpage-link">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
