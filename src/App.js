import "./App.css";
import Navbar from "./Navbar.js";
import VerticalNavbar from "./VerticalNavbar.js";
import HomePage from "./HomePage.js";
import MoviePage from "./MoviePage.js";
import TVPage from "./TVPage.js";
import AboutPage from "./AboutPage.js";
import AttributionsPage from "./AttributionsPage.js";
import PrivacyPolicyPage from "./PrivacyPolicyPage.js";
import TopRatedTitlesPage from "./TopRatedTitlesPage.js";
import PopularTitlesPage from "./PopularTitlesPage.js";
import TrendingTitlesPage from "./TrendingTitlesPage.js";
import UpcomingMoviesPage from "./UpcomingMoviesPage.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ActorPage from "./ActorPage.js";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <VerticalNavbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/movie"
                        element={<MoviePage movieID={"default"} />}
                    />
                    <Route path="/tv" element={<TVPage />} />
                    <Route path="/actor" element={<ActorPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route
                        path="/attributions"
                        element={<AttributionsPage />}
                    />
                    <Route
                        path="/privacy-policy"
                        element={<PrivacyPolicyPage />}
                    />
                    <Route path="/top-rated" element={<TopRatedTitlesPage />} />
                    <Route path="/popular" element={<PopularTitlesPage />} />
                    <Route path="/trending" element={<TrendingTitlesPage />} />
                    <Route path="/upcoming" element={<UpcomingMoviesPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
