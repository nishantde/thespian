import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MoviePage.css";
import { useEffect, useState } from "react";

import Loading from "./Loading";

const MoviePage = () => {
    var OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
    const [isLoading, setIsLoading] = useState(true);

    const [movieTitle, setMovieTitle] = useState("");
    const [movieRating, setMovieRating] = useState("");
    const [movieReleaseDate, setMovieReleaseDate] = useState("");
    const [movieRuntime, setMovieRuntime] = useState("");
    const [movieGenres, setMovieGenres] = useState([]);
    const [movieDirector, setMovieDirector] = useState("");
    const [movieActors, setMovieActors] = useState([]);
    const [moviePlot, setMoviePlot] = useState("");
    const [movieAwards, setMovieAwards] = useState("N/A");
    const [movieIMDBRating, setMovieIMDBRating] = useState("N/A");

    const OMDB_MOVIE_ADDITIONAL_DETAILS_PREPEND =
        "http://www.omdbapi.com/?apikey=" + OMDB_API_KEY + "&plot=full&i=";
    var MOVIE_EMBED_LINK_PREPEND = "https://vidsrc.to/embed/movie/";

    const location = useLocation();

    var movieEmbedID = location.state?.movieEmbedID;
    var movieBudget = location.state?.movieBudget;

    const fetchMoreDetails = () => {
        setIsLoading(true);
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        };

        fetch(OMDB_MOVIE_ADDITIONAL_DETAILS_PREPEND + movieEmbedID, options)
            .then((response) => response.json())
            .then((response) => {
                setMovieTitle(response["Title"]);
                setMovieRating(response["Rated"]);
                setMovieReleaseDate(response["Released"]);
                setMovieRuntime(response["Runtime"]);
                setMovieGenres(response["Genre"].split(","));
                setMovieDirector(response["Director"]);
                setMovieActors(response["Actors"].split(","));
                setMoviePlot(response["Plot"]);
                setMovieAwards(response["Awards"]);
                setMovieIMDBRating(response["Ratings"][0]["Value"]);
            })
            .catch((err) => console.error(err));

        setIsLoading(false);
    };

    const MoreDetails = () => {
        return (
            <div>
                <h1>{movieTitle}</h1>
                <p>{movieEmbedID}</p>
                <p>{movieRating}</p>
                <p>{movieReleaseDate}</p>
                <p>{movieRuntime}</p>
                <p>
                    {movieGenres.map((genre) => (
                        <span key={genre}>{genre}</span>
                    ))}
                </p>
                <p>{movieDirector}</p>
                <p>
                    {movieActors.map((actor) => (
                        <span key={actor}>{actor}</span>
                    ))}
                </p>
                <p>{moviePlot}</p>
                <p>{movieAwards}</p>
                <p>{movieBudget}</p>
                <p>{movieIMDBRating}</p>
            </div>
        );
    };

    const InvalidMovieIDContent = () => {
        return (
            <div className="page-link-back">
                <Link to="/" className="webpage-link">
                    Home
                </Link>
            </div>
        );
    };

    useEffect(() => {
        fetchMoreDetails();
    }, []);

    const ValidMovieIDContent = ({ movieEmbedSource }) => {
        return (
            <div>
                <div className="movie-page-details">
                    {isLoading ? <Loading /> : <MoreDetails />}
                </div>
                <div className="movie-content">
                    <embed
                        className="view-video-test"
                        src={movieEmbedSource}
                        type="video/webm"
                    />
                </div>
            </div>
        );
    };

    var movieEmbedSource = MOVIE_EMBED_LINK_PREPEND + movieEmbedID;

    return (
        <div className="movie-page-content">
            {movieEmbedID ? (
                <ValidMovieIDContent movieEmbedSource={movieEmbedSource} />
            ) : (
                <InvalidMovieIDContent />
            )}
            <div className="movie-load-warning">
                <p>
                    If the video does not load, please wait for a few seconds
                    and then try refreshing. Please note that the app is still
                    in beta and some bugs might persist.
                </p>
                <p>
                    Seeking might be slow for some titles. In such instances,
                    please try lowering the quality of the video.
                </p>
                <p>Thank you for your patience!</p>
            </div>
        </div>
    );
};

export default MoviePage;
