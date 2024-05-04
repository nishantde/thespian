import thespianLogo from "./assets/logos/thespian-logo.png";

import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar-content">
            <div className="main-logo">
                <img
                    src={thespianLogo}
                    alt="A film strip sitting atop the website name"
                />
            </div>
            <div className="navbar-links">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Attributions</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
