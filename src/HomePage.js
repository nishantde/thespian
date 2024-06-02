import "./HomePage.css";
import Loading from "./Loading.js";
import InvalidSearch from "./InvalidSearch.js";
import Cards from "./Cards.js";
import Pages from "./Pages.js";
import { useEffect, useState } from "react";

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [currentSearchPage, setCurrentSearchPage] = useState(1);
    const [isMovieListEmpty, setIsMovieListEmpty] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isInvalidSearchTerm, setIsInvalidSearchTerm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [totalResults, setTotalResults] = useState("0");

    async function getMovies(searchString, currentPage = 1) {
        setIsLoading(true);
        setCurrentSearchPage(currentPage);
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        };

        if (searchString === "") {
            setIsInvalidSearchTerm(true);
        }

        var API_SEARCH_LINK = "https://www.omdbapi.com/?";
        const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
        var API_PARAMETER = "&apikey=";
        var searchString = searchString;
        var SEARCH_STRING_PARAMETER = "s=";
        var PAGE_NUMBER_PARAMETER = "&page=";
        var currentSearchPage = currentPage.toString();
        var apiSearchURL =
            API_SEARCH_LINK +
            SEARCH_STRING_PARAMETER +
            searchString +
            PAGE_NUMBER_PARAMETER +
            currentSearchPage +
            API_PARAMETER +
            OMDB_API_KEY;

        /* Previously assigned the below function call to const response */
        await fetch(apiSearchURL, options)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data["Search"]) {
                    setMovies(data["Search"]);
                    setIsMovieListEmpty(false);
                    setIsInvalidSearchTerm(true);
                } else {
                    setIsMovieListEmpty(true);
                }
                setTotalResults(data["totalResults"]);
            });

        setIsLoading(false);

        /* To auto-scroll to the listings after 1 second of searching */
        setTimeout(() => {
            var titleListing = document.getElementById("titleListing");
            if (titleListing) {
                titleListing.scrollIntoView({ behavior: "smooth" });
            }
        }, 400);
    }

    useEffect(() => {
        setMovies([]);
        var titleListing = document.getElementById("titleListing");
        if (titleListing) {
            console.log(titleListing.offsetHeight);
        }
    }, []);

    return (
        <div className="home-section-wrap">
            <div className="hero-section-parent">
                <div className="hero-section-parent-image-filter padding-adjustment">
                    <div className="hero-section">
                        <div className="hero-text">
                            <h1 className="calistoga-regular">thespian</h1>
                            <p className="hero-subtitle">
                                Dive into a world of free entertainment with
                                Thespian - stream movies and TV shows without
                                spending a dime.
                            </p>
                        </div>
                        <div className="main-search-bar">
                            <input
                                type="text"
                                className="main-search-input"
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value.toString(), 1)
                                }
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
                </div>
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                <div className="cards-wrap" id="titleListing">
                    {!isMovieListEmpty ? (
                        <div>
                            <div>
                                <Cards
                                    movies={movies}
                                    totalResults={totalResults}
                                />
                                <Pages
                                    totalResults={totalResults}
                                    currentSearchPage={currentSearchPage}
                                    currentSearchTerm={searchTerm}
                                    getMoviesByPage={getMovies}
                                />
                            </div>
                        </div>
                    ) : isInvalidSearchTerm ? (
                        <InvalidSearch />
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </div>
    );
}

export default HomePage;
