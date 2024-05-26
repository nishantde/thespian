import "./AttributionsPage.css";

import brandFetchLogo from "./assets/images/attribution-brandfetch.png";
import coolorsLogo from "./assets/images/attribution-coolors.png";
import dafontLogo from "./assets/images/attribution-dafontfree.png";
import omdbLogo from "./assets/images/attribution-omdb.png";
import icons8Logo from "./assets/images/attribution-icons8.jpeg";
import tmdbLogo from "./assets/images/attribution-tmdb.png";
import vidsrcLogo from "./assets/images/attribution-vidsrc.png";
import wallpaperFlareLogo from "./assets/images/attribution-wallpaperflare.png";
import googleLogo from "./assets/images/attribution-google.png";

const AttributionsPage = () => {
    return (
        <div className="attributions-page-content padding-adjustment">
            <h1 className="attribution-page-title">Attributions</h1>
            <p className="attribution-page-description">
                This project would not have been possible without the support
                for application programming interfaces &#40;APIs&#41; which held
                the required data for me to pull relevant information from. The
                APIs/tools/inspirations being used are from:{" "}
            </p>
            <div className="attribution-section-wrap">
                <div className="attribution-section">
                    <div className="attribution-logo-and-source">
                        <img
                            src={coolorsLogo}
                            alt="Coolors.co Logo"
                            className="attribution-logo"
                        />
                        <div className="attribution-source">
                            <h3>Coolors.co</h3>
                        </div>
                    </div>
                    <div className="attribution-details">
                        <p className="attribution-info">
                            Colour palette inspirations and values
                        </p>
                    </div>
                </div>
                <div className="attribution-section">
                    <div className="attribution-logo-and-source">
                        <img
                            src={dafontLogo}
                            alt="DaFont Free Logo"
                            className="attribution-logo"
                        />
                        <div className="attribution-source">
                            <h3>DaFont</h3>
                        </div>
                    </div>
                    <div className="attribution-details">
                        <p className="attribution-info">
                            Obtaining the Aktiv Grotesk body font
                        </p>
                    </div>
                </div>
                <div className="attribution-section">
                    <div className="attribution-logo-and-source">
                        <img
                            src={googleLogo}
                            alt="Google Logo"
                            className="attribution-logo"
                        />
                        <div className="attribution-source">
                            <h3>Google Fonts</h3>
                        </div>
                    </div>
                    <div className="attribution-details">
                        <p className="attribution-info">
                            Obtaining the Calistoga logo font
                        </p>
                    </div>
                </div>
                <div className="attribution-section">
                    <div className="attribution-logo-and-source">
                        <img
                            src={omdbLogo}
                            alt="OMDB API Logo"
                            className="attribution-logo"
                        />
                        <div className="attribution-source">
                            <h3>OMDB</h3>
                        </div>
                    </div>
                    <div className="attribution-details">
                        <p className="attribution-info">
                            Obtaining search results for queries and assets
                        </p>
                    </div>
                </div>
                <div className="attribution-section">
                    <div className="attribution-logo-and-source">
                        <img
                            src={icons8Logo}
                            alt="Icons8 Logo"
                            className="attribution-logo"
                        />
                        <div className="attribution-source">
                            <h3>Icons8</h3>
                        </div>
                    </div>
                    <div className="attribution-details">
                        <p className="attribution-info">
                            Obtaining icons for various Thespian elements
                        </p>
                    </div>
                </div>
                <div className="attribution-section">
                    <div className="attribution-logo-and-source">
                        <img
                            src={tmdbLogo}
                            alt="TMDB Logo"
                            className="attribution-logo"
                        />
                        <div className="attribution-source">
                            <h3>TMDB</h3>
                        </div>
                    </div>
                    <div className="attribution-details">
                        <p className="attribution-info">
                            Obtaining title details and assets
                        </p>
                    </div>
                </div>
                <div className="attribution-section">
                    <div className="attribution-logo-and-source">
                        <img
                            src={vidsrcLogo}
                            alt="Vidsrc.to Logo"
                            className="attribution-logo"
                        />
                        <div className="attribution-source">
                            <h3>VidSrc.to</h3>
                        </div>
                    </div>
                    <div className="attribution-details">
                        <p className="attribution-info">
                            The source for streaming titles
                        </p>
                    </div>
                </div>
                <div className="attribution-section">
                    <div className="attribution-logo-and-source">
                        <img
                            src={wallpaperFlareLogo}
                            alt="Wallpaper Flare Logo"
                            className="attribution-logo"
                        />
                        <div className="attribution-source">
                            <h3>Wallpaper Flare</h3>
                        </div>
                    </div>
                    <div className="attribution-details">
                        <p className="attribution-info">
                            The primary image shown on visiting the webpage
                        </p>
                    </div>
                </div>
                <div className="attribution-section">
                    <div className="attribution-logo-and-source">
                        <img
                            src={brandFetchLogo}
                            alt="Brandfetch Logo"
                            className="attribution-logo"
                        />
                        <div className="attribution-source">
                            <h3>Brandfetch</h3>
                        </div>
                    </div>
                    <div className="attribution-details">
                        <p className="attribution-info">
                            Obtaining the up-to-date logo assets of various
                            resources used
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttributionsPage;
