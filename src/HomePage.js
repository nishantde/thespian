import "./HomePage.css";
import Loading from "./Loading.js";
import Cards from "./Cards.js";
import { useState } from "react";

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [isMovieListEmpty, setIsMovieListEmpty] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [totalResults, setTotalResults] = useState("0");

    async function getMovies(searchString) {
        setIsLoading(true);
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        };

        if (searchString === "") {
            var searchString = "guardians";
        }

        var API_SEARCH_LINK = "https://www.omdbapi.com/?";
        const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
        var API_PARAMETER = "&apikey=";
        var searchString = searchString;
        var SEARCH_STRING_PARAMETER = "s=";
        var apiSearchURL =
            API_SEARCH_LINK +
            SEARCH_STRING_PARAMETER +
            searchString +
            API_PARAMETER +
            OMDB_API_KEY;

        const response = await fetch(apiSearchURL, options)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setMovies(data["Search"]);
                setTotalResults(data["totalResults"]);
            });
        setIsMovieListEmpty(false);
        setIsLoading(false);
    }

    return (
        <div>
            <div className="hero-section">
                <div className="hero-text">
                    <h1 className="calistoga-regular">thespian</h1>
                    <p className="hero-subtitle">
                        Dive into a world of free entertainment with Thespian -
                        stream movies and TV shows without spending a dime.
                    </p>
                </div>
                <div className="main-search-bar">
                    <input
                        type="text"
                        className="main-search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for a movie"
                    />
                    <button
                        className="main-search-button"
                        onClick={() => getMovies(searchTerm)}
                        type="submit"
                    >
                        Search
                    </button>
                </div>
            </div>

            {isLoading ? (<Loading />) : (
                <div className="cards-wrap">
                    {!isMovieListEmpty ? (
                        <Cards movies={movies} totalResults={totalResults} />
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </div>
    );
}

export default HomePage;
