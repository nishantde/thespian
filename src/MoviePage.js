import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MoviePage.css";
import { useEffect, useState } from "react";

import Actor from "./Actor";
import Loading from "./Loading";

const MoviePage = () => {
    var OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
    const TMDB_API_READ_ACCESS_TOKEN =
        process.env.REACT_APP_TMDB_API_READ_ACCESS_TOKEN;

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
    const [movieBanner, setMovieBanner] = useState("");

    const EXTERNAL_IMDB_LINK_PREPEND = "https://www.imdb.com/title/";
    const OMDB_MOVIE_ADDITIONAL_DETAILS_PREPEND =
        "http://www.omdbapi.com/?apikey=" + OMDB_API_KEY + "&plot=full&i=";
    var MOVIE_EMBED_LINK_PREPEND = "https://vidsrc.to/embed/movie/";
    const TMDB_MOVIE_BANNER_IMAGE_PREPEND =
        "https://api.themoviedb.org/3/movie/";
    const TMDB_MOVIE_IMAGE_TAG_APPEND = "/images";
    const TMDB_MOVIE_BANNER_IMAGE_PATH_PREPEND =
        "https://image.tmdb.org/t/p/original";

    const location = useLocation();

    var movieEmbedID = location.state?.movieEmbedID;
    var movieBudget = location.state?.movieBudget;

    function fetchMoreDetails() {
        setIsLoading(true);
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        };

        const tmdbOptions = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + TMDB_API_READ_ACCESS_TOKEN,
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

        fetch(
            TMDB_MOVIE_BANNER_IMAGE_PREPEND +
                movieEmbedID +
                TMDB_MOVIE_IMAGE_TAG_APPEND,
            tmdbOptions
        )
            .then((response) => response.json())
            .then((response) => {
                setMovieBanner(
                    TMDB_MOVIE_BANNER_IMAGE_PATH_PREPEND +
                        response["backdrops"][0]["file_path"]
                );
            })
            .catch((err) => console.error(err));

        setTimeout(() => {
            var movieTitle = document.getElementById("movieTitle");
            if (movieTitle) {
                movieTitle.scrollIntoView({ behavior: "smooth" });
            }
        }, 200);

        setIsLoading(false);
    }

    const MoreDetails = () => {
        return (
            <div>
                <div className="movie-title-and-link">
                    <div className="movie-title-and-imdb-rating-section">
                        <h1 id="movieTitle">{movieTitle}</h1>
                        <p className="movie-imdb-rating">
                            &#10030; {movieIMDBRating}
                        </p>
                    </div>
                    <p>
                        <a
                            href={EXTERNAL_IMDB_LINK_PREPEND + movieEmbedID}
                            className="movie-page-external-link"
                            target="blank_"
                            rel="noreferrer"
                        >
                            IMDB Link &#8599;
                        </a>
                    </p>
                </div>
                <div className="movie-details-other-flex">
                    <div className="movie-details-other-flex-one">
                        <p className="movie-plot-section">{moviePlot}</p>
                        <div className="movie-details-subsection">
                            <div className="movie-parental-rating-section">
                                <h3>Rated</h3>
                                <p>{movieRating}</p>
                            </div>
                            <div className="movie-release-date-section">
                                <h3>Release Date</h3>
                                <p>{movieReleaseDate}</p>
                            </div>
                            <div className="movie-runtime-section">
                                <h3>Runtime</h3>
                                <p>{movieRuntime}</p>
                            </div>
                        </div>
                        <div className="movie-genre-section">
                            <h3>Genres</h3>
                            <p className="movie-genre-listing">
                                {movieGenres.map((genre) => (
                                    <span key={genre} className="movie-genre">
                                        {genre}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                    <div className="movie-details-other-flex-two">
                        <div className="movie-director-section">
                            <h3>Director</h3>
                            <p>{movieDirector}</p>
                        </div>
                        <div className="movie-actor-section">
                            <h3>Actors</h3>
                            <div className="movie-actor-listing">
                                {movieActors.map((actor) => (
                                    <Actor movieActor={actor} key={actor} />
                                ))}
                            </div>
                        </div>
                        <div className="movie-awards-section">
                            <h3>Awards</h3>
                            <p>{movieAwards}</p>
                        </div>
                        <div className="movie-budget-section">
                            <h3>Budget</h3>
                            <p>{movieBudget}</p>
                        </div>
                    </div>
                </div>
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

    const ValidMovieIDContent = ({ movieEmbedSource }) => {
        return (
            <div>
                <div className="movie-page-details">
                    <MoreDetails />
                </div>
                <div className="movie-content">
                    <embed
                        className="movie-page-view-video"
                        src={movieEmbedSource}
                        type="video/webm"
                    />
                </div>
                <div className="movie-load-warning">
                    <p>
                        All titles might not be available. However, if the video
                        appears but does not load, please wait for a few seconds
                        and then try refreshing.
                    </p>
                    <p>
                        Seeking might be slow for some titles. In such
                        instances, please try lowering the quality of the video.
                    </p>
                    <p>
                        Please note that the project is still in beta and some
                        bugs might persist. Thank you for your patience!
                    </p>
                </div>
            </div>
        );
    };

    var movieEmbedSource = MOVIE_EMBED_LINK_PREPEND + movieEmbedID;

    useEffect(() => {
        setTimeout(() => {
            fetchMoreDetails();
        }, 1200);
        var movieTitle = document.getElementById("movieTitle");
        if (movieTitle) {
            console.log(movieTitle.offsetHeight);
        }
    }, []);

    return (
        <div>
            <div className="movie-banner-image-section">
                <div
                    style={{
                        backgroundImage: "url(" + movieBanner + ")",
                    }}
                    className="movie-banner-image hide-banner-on-mobile"
                ></div>
                <img
                    src={movieBanner}
                    alt="Movie Banner"
                    className="movie-banner-image hide-banner-on-desktop"
                />
            </div>
            <div className="movie-page-content">
                {isLoading ? (
                    <Loading />
                ) : movieEmbedID ? (
                    <ValidMovieIDContent movieEmbedSource={movieEmbedSource} />
                ) : (
                    <InvalidMovieIDContent />
                )}
            </div>
        </div>
    );
};

export default MoviePage;
