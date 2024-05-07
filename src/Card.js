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
    const [movieTMDBRating, setMovieTMDBRating] = useState(0);

    if (!movie["imdbID"]) {
        setMovieIMDBID("default");
    }

    var additionalDetailsFetchURL = TMDB_FETCH_LINK_PREPEND + movieIMDBID;

    const getAdditionalMovieDetails = () => {
        const TMDB_API_READ_ACCESS_TOKEN = process.env.REACT_APP_TMDB_API_READ_ACCESS_TOKEN;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer " + TMDB_API_READ_ACCESS_TOKEN
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
                    setMovieTMDBRating(response["vote_average"]);
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
                            <p>Rating: {movieTMDBRating}</p>
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
