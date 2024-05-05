import { Link } from "react-router-dom";
import "./Card.css";
import { useEffect, useState } from "react";

const Card = ({ movie }) => {
    const TMDB_FETCH_LINK_PREPEND = "https://api.themoviedb.org/3/movie/";

    var movieTitle = movie["Title"];
    var movieYear = movie["Year"];
    var moviePoster = movie["Poster"];
    var titleType = movie["Type"];

    const [movieIMDBID, setMovieIMDBID] = useState(movie["imdbID"]);
    const [movieBudget, setMovieBudget] = useState(0);
    const [movieOverview, setMovieOverview] = useState("");
    const [movieRuntime, setMovieRuntime] = useState(0);

    if (!movie["imdbID"]) {
        setMovieIMDBID("default");
    }

    var additionalDetailsFetchURL = TMDB_FETCH_LINK_PREPEND + movieIMDBID;

    const getAdditionalMovieDetails = () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjZlNGIxYjc0YWY3ODg3MzkwZGQ2ZWI4MjAxYWM1MCIsInN1YiI6IjY2MjNhOWE4ODdlNjNlMDE4ODczNjI4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g41xhry5OzBREjLQN65hVt2qZ53hnxNJMZZ-GT0IQGQ",
            },
        };

        if (movieIMDBID !== "default" && titleType === "movie") {
            fetch(additionalDetailsFetchURL, options)
                .then((response) => response.json())
                .then((response) => {
                    setMovieBudget(() =>
                        Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(response["budget"])
                    );
                    setMovieOverview(response["overview"]);
                    setMovieRuntime(response["runtime"]);
                })
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        getAdditionalMovieDetails();
    }, []);

    return (
        <div>
            <div className="card">
                <div className="card-inner">
                    <div className="card-front">
                        <div className="card-image">
                            <img src={moviePoster} alt="Placeholder" />
                        </div>
                        <div className="card-front-content">
                            <h3>{movieTitle}</h3>
                            <p>{movieYear}</p>
                            <p>Type: {titleType}</p>
                        </div>
                    </div>
                    <div
                        className="card-back"
                        style={{
                            backgroundImage: "url(" + moviePoster + ")",
                            backgroundSize: "cover",
                            backdropFilter: "grayscale(100%)",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="card-back-content">
                            <div className="additional-details">
                                <h4 className="card-back-subheading">
                                    IMDB ID
                                </h4>
                                <p className="card-back-details">
                                    {movieIMDBID}
                                </p>
                                <h4 className="card-back-subheading">Budget</h4>
                                <p className="card-back-details">
                                    {movieBudget}
                                </p>
                                <h4 className="card-back-subheading">
                                    Runtime
                                </h4>
                                <p className="card-back-details">
                                    {movieRuntime} minutes
                                </p>
                                <div className="overview-section">
                                    <h4 className="card-back-subheading">
                                        Overview
                                    </h4>
                                    <p className="card-back-details details-overview">
                                        {movieOverview}
                                    </p>
                                </div>
                            </div>
                            <div className="link-to-view">
                                <button className="button-to-view">
                                    <Link
                                        to={"/movie"}
                                        state={{
                                            movieEmbedID: movieIMDBID,
                                            movieBudget: movieBudget,
                                        }}
                                        className="webpage-link"
                                    >
                                        Watch Now
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
