import "./App.css";
import Navbar from "./Navbar.js";
import HomePage from "./HomePage.js";
import MoviePage from "./MoviePage.js";
import TVPage from "./TVPage.js";
import AboutPage from "./AboutPage.js";
import AttributionsPage from "./AttributionsPage.js";
import PrivacyPolicyPage from "./PrivacyPolicyPage.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/movie"
                        element={<MoviePage movieID={"default"} />}
                    />
                    <Route path="/tv" element={<TVPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route
                        path="/attributions"
                        element={<AttributionsPage />}
                    />
                    <Route
                        path="/privacy-policy"
                        element={<PrivacyPolicyPage />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
