import "./HomePage.css";
import Loading from "./Loading.js";
import Cards from "./Cards.js";
import { useState } from "react";

/* 

Either API READ ACCESS TOKEN can be added to headers as authorization: 'Bearer <API_READ_ACCESS_TOKEN>
OR
API KEY can be appended to the end of the URL as ?api_key=<API_KEY> and API READ ACCESS TOKEN can be removed from the headers

*/

/*
TMDB API_KEY
826e4b1b74af7887390dd6eb8201ac50

TMDB API_READ_ACCESS_TOKEN
eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjZlNGIxYjc0YWY3ODg3MzkwZGQ2ZWI4MjAxYWM1MCIsInN1YiI6IjY2MjNhOWE4ODdlNjNlMDE4ODczNjI4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g41xhry5OzBREjLQN65hVt2qZ53hnxNJMZZ-GT0IQGQ

OMDB API_KEY
a1282244
*/

/*TMDB API Check*/
/*
  fetch('https://api.themoviedb.org/3/authentication?api_key=826e4b1b74af7887390dd6eb8201ac50', options)
    .then(response => response.json())
    .then(response => console.log('TMDB API Check', '\n', response))
    .catch(err => console.error(err));
*/

/*OMDB API Check*/
/*
  fetch('https://www.omdbapi.com/?s=guardians&apikey=a1282244', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
*/

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

        if (searchString == "") {
            var searchString = "guardians";
        }

        var API_SEARCH_LINK = "https://www.omdbapi.com/?";
        var API_KEY = "a1282244";
        var API_PARAMETER = "&apikey=";
        var searchString = searchString;
        var SEARCH_STRING_PARAMETER = "s=";
        var apiSearchURL =
            API_SEARCH_LINK +
            SEARCH_STRING_PARAMETER +
            searchString +
            API_PARAMETER +
            API_KEY;

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
                    <h1>Lorem ipsum</h1>
                    <h4>Placeholder text</h4>
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

            {!isMovieListEmpty ? (
                <div className="cards-wrap">
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <Cards movies={movies} totalResults={totalResults} />
                    )}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default HomePage;
