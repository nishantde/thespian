import "./App.css";
import Navbar from "./Navbar.js";
import HomePage from "./HomePage.js";
import MoviePage from "./MoviePage.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={ <HomePage /> } />\
                    <Route path="/movie" element={ <MoviePage movieID={"default"} /> } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
