import "./VerticalNavbar.css";

import popularIcon from "./assets/icons/icon-popular.png";
import upcomingIcon from "./assets/icons/icon-upcoming.png";
import topRatedIcon from "./assets/icons/icon-top-rated.png";
import trendingIcon from "./assets/icons/icon-trending.png";
import { Link } from "react-router-dom";

const VerticalNavbar = () => {
    return (
        <div className="vertical-navbar">
            <div className="vertical-navbar-content">
                <ul className="vertical-navbar-icon-list">
                    <li className="vertical-navbar-icon">
                        <Link to="/top-rated">
                            <img
                                src={topRatedIcon}
                                alt="Top Rated Titles Icon"
                            />
                        </Link>
                    </li>
                    <li className="vertical-navbar-icon">
                        <Link to="/popular">
                            <img src={popularIcon} alt="Popular Titles Icon" />
                        </Link>
                    </li>
                    <li className="vertical-navbar-icon">
                        <Link to="/trending">
                            <img
                                src={trendingIcon}
                                alt="Trending Titles Icon"
                            />
                        </Link>
                    </li>
                    <li className="vertical-navbar-icon">
                        <Link to="/upcoming">
                            <img
                                src={upcomingIcon}
                                alt="Upcoming Movies Icon"
                            />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default VerticalNavbar;
