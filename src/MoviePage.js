import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MoviePage.css";
import { useEffect, useState } from "react";

import actorIcon from "./assets/icons/icon-actors.png";
import awardsIcon from "./assets/icons/icon-awards.png";
import budgetIcon from "./assets/icons/icon-budget.png";
import companiesIcon from "./assets/icons/icon-companies.png";
import directorIcon from "./assets/icons/icon-director.png";
import genresIcon from "./assets/icons/icon-genres.png";
import imdbIcon from "./assets/icons/icon-imdb.png";
import languagesIcon from "./assets/icons/icon-languages.png";
import ratingIcon from "./assets/icons/icon-rating.png";
import releaseDateIcon from "./assets/icons/icon-release-date.png";
import revenueIcon from "./assets/icons/icon-revenue.png";
import runtimeIcon from "./assets/icons/icon-runtime.png";

import Actor from "./Actor";
import Loading from "./Loading";

const MoviePage = () => {
    var OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

    const [isLoading, setIsLoading] = useState(true);

    const [movieTitle, setMovieTitle] = useState("");
    const [movieRating, setMovieRating] = useState("");
    const [movieReleaseDate, setMovieReleaseDate] = useState("");
    const [movieRuntime, setMovieRuntime] = useState("");
    const [movieDirector, setMovieDirector] = useState("");
    const [movieActors, setMovieActors] = useState([]);
    const [moviePlot, setMoviePlot] = useState("");
    const [movieAwards, setMovieAwards] = useState("N/A");
    const [movieIMDBRating, setMovieIMDBRating] = useState("N/A");

    const EXTERNAL_IMDB_LINK_PREPEND = "https://www.imdb.com/title/";
    const OMDB_MOVIE_ADDITIONAL_DETAILS_PREPEND =
        "http://www.omdbapi.com/?apikey=" + OMDB_API_KEY + "&plot=full&i=";
    var MOVIE_EMBED_LINK_PREPEND = "https://vidsrc.to/embed/movie/";
    const TMDB_MOVIE_BANNER_IMAGE_PATH_PREPEND =
        "https://image.tmdb.org/t/p/original";

    const location = useLocation();

    var movieBackdropPath = location.state?.movieBackdropPath;
    var movieEmbedID = location.state?.movieEmbedID;
    var movieBudget = location.state?.movieBudget;
    var movieRevenue = location.state?.movieRevenue;
    var movieGenres = location.state?.movieGenres;
    var movieProductionCompanies = location.state?.movieProductionCompanies;
    var movieLanguages = location.state?.movieLanguages;

    function fetchMoreDetails() {
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
                setMovieDirector(response["Director"]);
                setMovieActors(response["Actors"].split(","));
                setMoviePlot(response["Plot"]);
                setMovieAwards(response["Awards"]);
                setMovieIMDBRating(response["Ratings"][0]["Value"]);
            })
            .catch((err) => console.error(err));

        setTimeout(() => {
            var moviePageBanner = document.getElementById("moviePageBanner");
            if (moviePageBanner) {
                moviePageBanner.scrollIntoView({ behavior: "smooth" });
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
                            <img
                                src={imdbIcon}
                                className="page-icon"
                                alt="IMDB Icon"
                            />
                            <span>&#10030; {movieIMDBRating}</span>
                        </p>
                    </div>
                    <p>
                        <a
                            href={EXTERNAL_IMDB_LINK_PREPEND + movieEmbedID}
                            className="movie-page-external-link"
                            target="blank_"
                            rel="noreferrer"
                        >
                            View on IMDB &#8599;
                        </a>
                    </p>
                </div>
                <div className="movie-details-other-flex">
                    <div className="movie-details-other-flex-one">
                        <p className="movie-plot-section">{moviePlot}</p>
                        <div className="movie-details-subsection">
                            <div className="movie-parental-rating-section">
                                <h3>
                                    <img
                                        src={ratingIcon}
                                        className="page-icon"
                                        alt="Rating Icon"
                                    />
                                    Rated
                                </h3>
                                <p>{movieRating}</p>
                            </div>
                            <div className="movie-release-date-section">
                                <h3>
                                    <img
                                        src={releaseDateIcon}
                                        className="page-icon"
                                        alt="Release Date Icon"
                                    />
                                    Release Date
                                </h3>
                                <p>{movieReleaseDate}</p>
                            </div>
                            <div className="movie-runtime-section">
                                <h3>
                                    <img
                                        src={runtimeIcon}
                                        className="page-icon"
                                        alt="Runtime Icon"
                                    />
                                    Runtime
                                </h3>
                                <p>{movieRuntime}</p>
                            </div>
                        </div>
                        <div className="movie-genre-section">
                            <h3>
                                <img
                                    src={genresIcon}
                                    className="page-icon"
                                    alt="Genres Icon"
                                />
                                Genres
                            </h3>
                            <p className="movie-genre-listing">
                                {movieGenres.map((genre) => (
                                    <span
                                        key={genre["id"]}
                                        className="movie-genre"
                                    >
                                        {genre["name"]}
                                    </span>
                                ))}
                            </p>
                        </div>
                        <div className="movie-director-section">
                            <h3>
                                <img
                                    src={directorIcon}
                                    className="page-icon"
                                    alt="Director Icon"
                                />
                                Director
                            </h3>
                            <p>{movieDirector}</p>
                        </div>
                        <div className="movie-actor-section">
                            <h3>
                                <img
                                    src={actorIcon}
                                    className="page-icon"
                                    alt="Actors Icon"
                                />
                                Actors
                            </h3>
                            <div className="movie-actor-listing">
                                {movieActors.map((actor) => (
                                    <Actor movieActor={actor} key={actor} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="movie-details-other-flex-two">
                        <div className="movie-awards-section">
                            <h3>
                                <img
                                    src={awardsIcon}
                                    className="page-icon"
                                    alt="Awards Icon"
                                />
                                Awards
                            </h3>
                            <p>{movieAwards}</p>
                        </div>
                        <div className="movie-budget-section">
                            <h3>
                                <img
                                    src={budgetIcon}
                                    className="page-icon"
                                    alt="Movie Budget Icon"
                                />
                                Budget
                            </h3>
                            <p>{movieBudget}</p>
                        </div>
                        <div className="movie-revenue-section">
                            <h3>
                                <img
                                    src={revenueIcon}
                                    className="page-icon"
                                    alt="Movie Revenue Icon"
                                />
                                Revenue
                            </h3>
                            <p>{movieRevenue}</p>
                        </div>
                        <div className="movie-production-companies-section">
                            <h3>
                                <img
                                    src={companiesIcon}
                                    className="page-icon"
                                    alt="Production Companies Icon"
                                />
                                Production Companies
                            </h3>
                            <div className="movie-production-companies">
                                {movieProductionCompanies.map((company) => (
                                    <p key={company["id"]}>{company["name"]}</p>
                                ))}
                            </div>
                        </div>
                        <div className="movie-languages-section">
                            <h3>
                                <img
                                    src={languagesIcon}
                                    className="page-icon"
                                    alt="Languages Icon"
                                />
                                Languages
                            </h3>
                            <div className="movie-languages">
                                {movieLanguages.map((language) => (
                                    <p key={language["iso_639_1"]}>
                                        {language["english_name"]}
                                    </p>
                                ))}
                            </div>
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
                    <iframe
                        className="movie-page-view-video"
                        src={movieEmbedSource}
                        frameBorder="0"
                        allowFullScreen
                        title="Movie Streaming Content"
                    >
                        Your browser does not support this element.
                    </iframe>
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
        var moviePageBanner = document.getElementById("moviePageBanner");
        if (moviePageBanner) {
            console.log(moviePageBanner.offsetHeight);
        }
    }, []);

    return (
        <div>
            <div className="movie-banner-image-section" id="moviePageBanner">
                <div
                    style={{
                        backgroundImage:
                            "url(" +
                            TMDB_MOVIE_BANNER_IMAGE_PATH_PREPEND +
                            movieBackdropPath +
                            ")",
                    }}
                    className="movie-banner-image hide-banner-on-mobile"
                >
                    <div className="movie-banner-gradient"></div>
                </div>
                <div className="movie-banner-image hide-banner-on-desktop movie-banner-gradient-mobile"></div>
                <img
                    src={
                        TMDB_MOVIE_BANNER_IMAGE_PATH_PREPEND + movieBackdropPath
                    }
                    alt="Movie Banner"
                    className="movie-banner-image hide-banner-on-desktop"
                />
            </div>
            <div className="movie-page-content-page-wrap">
                <div className="movie-page-content">
                    {isLoading ? (
                        <Loading />
                    ) : movieEmbedID ? (
                        <ValidMovieIDContent
                            movieEmbedSource={movieEmbedSource}
                        />
                    ) : (
                        <InvalidMovieIDContent />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MoviePage;
