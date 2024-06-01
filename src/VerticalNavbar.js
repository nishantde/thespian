import "./VerticalNavbar.css";

import popularIcon from "./assets/icons/icon-popular.png";
import upcomingIcon from "./assets/icons/icon-upcoming.png";
import topRatedIcon from "./assets/icons/icon-top-rated.png";
import trendingIcon from "./assets/icons/icon-trending.png";

const VerticalNavbar = () => {
    return (
        <div className="vertical-navbar">
            <div className="vertical-navbar-content">
                <ul className="vertical-navbar-icon-list">
                    <li className="vertical-navbar-icon">
                        <img src={topRatedIcon} alt="Top Rated Titles Icon" />
                    </li>
                    <li className="vertical-navbar-icon">
                        <img src={popularIcon} alt="Popular Titles Icon" />
                    </li>
                    <li className="vertical-navbar-icon">
                        <img src={trendingIcon} alt="Trending Titles Icon" />
                    </li>
                    <li className="vertical-navbar-icon">
                        <img src={upcomingIcon} alt="Upcoming Movies Icon" />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default VerticalNavbar;
