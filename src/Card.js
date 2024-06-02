import { Link } from "react-router-dom";
import "./Card.css";

import noPosterFound from "./assets/images/no-poster-found.png";

import { useEffect, useState } from "react";

const Card = ({ movie }) => {
    const TMDB_FETCH_LINK_PREPEND = "https://api.themoviedb.org/3/movie/";
    const TMDB_TV_FETCH_LINK_PREPEND = " https://api.themoviedb.org/3/tv/";
    const TMDB_TV_FETCH_INTERNAL_LINK_PREPEND =
        "https://api.themoviedb.org/3/find/";
    const TMDB_TV_FETCH_INTERNAL_LINK_APPEND = "?external_source=imdb_id";
    const TMDB_TV_FETCH_EXTERNAL_LINK_APPEND = "/external_ids";

    var movieTitle, movieYear, moviePoster, titleType, imdbID;
    var tvFetchTMDBID, tvFetchIMDBID;

    movieTitle = movie["Title"];
    movieYear = movie["Year"];
    moviePoster = movie["Poster"];
    titleType = movie["Type"];

    /* Movie details */
    const [movieBudget, setMovieBudget] = useState(0);
    const [movieRevenue, setMovieRevenue] = useState(0);
    const [movieOverview, setMovieOverview] = useState("N/A");
    const [movieRuntime, setMovieRuntime] = useState(0);
    const [movieTMDBRating, setMovieTMDBRating] = useState(0);
    const [movieGenres, setMovieGenres] = useState([]);
    const [movieProductionCompanies, setMovieProductionCompanies] = useState(
        []
    );
    const [movieLanguages, setMovieLanguages] = useState([]);
    const [movieBackdropPath, setMovieBackdropPath] = useState("");

    /* TV details */
    const [tvBackdropPath, setTVBackdropPath] = useState("");
    const [tvCreatedBy, setTVCreatedBy] = useState([]);
    const [tvFirstAirDate, setTVFirstAirDate] = useState("");
    const [tvLastAirDate, setTVLastAirDate] = useState("");
    const [tvGenres, setTVGenres] = useState([]);
    const [tvTMDBID, setTVTMDBID] = useState("");
    const [tvIMDBID, setTVIMDBID] = useState("");
    const [tvLanguages, setTVLanguages] = useState([]);
    const [tvNetworks, setTVNetworks] = useState([]);
    const [tvNumberOfEpisodes, setTVNumberOfEpisodes] = useState(0);
    const [tvNumberOfSeasons, setTVNumberOfSeasons] = useState(0);
    const [tvOverview, setTVOverview] = useState("");
    const [tvProductionCompanies, setTVProductionCompanies] = useState([]);
    const [tvSeasons, setTVSeasons] = useState([]);
    const [tvTMDBRating, setTVTMDBRating] = useState(0);

    if (movie["imdbID"]) {
        imdbID = movie["imdbID"];
    } else if (movie["imdb_id"]) {
        imdbID = movie["imdb_id"];
    } else {
        imdbID = "default";
    }

    if (titleType === "tv" || titleType === "series") {
        if (imdbID.toString().slice(0, 2) === "tt") {
            tvFetchIMDBID = imdbID;
        }
    }

    const [movieIMDBID, setMovieIMDBID] = useState(imdbID);

    var additionalDetailsFetchURL = TMDB_FETCH_LINK_PREPEND + movieIMDBID;

    const getAdditionalMovieDetails = () => {
        const TMDB_API_READ_ACCESS_TOKEN =
            process.env.REACT_APP_TMDB_API_READ_ACCESS_TOKEN;

        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + TMDB_API_READ_ACCESS_TOKEN,
            },
        };

        if (movieIMDBID !== "default" && titleType === "movie") {
            fetch(additionalDetailsFetchURL, options)
                .then((response) => response.json())
                .then((response) => {
                    setMovieBackdropPath(response["backdrop_path"]);
                    setMovieBudget(() =>
                        Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(response["budget"])
                    );
                    setMovieGenres(response["genres"]);
                    setMovieRevenue(() =>
                        Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(response["revenue"])
                    );
                    setMovieOverview(response["overview"]);
                    setMovieProductionCompanies(
                        response["production_companies"]
                    );
                    setMovieRuntime(response["runtime"]);
                    setMovieLanguages(response["spoken_languages"]);
                    setMovieTMDBRating(response["vote_average"]);
                    setMovieIMDBID(response["imdb_id"]);
                })
                .catch((err) => console.error(err));
        } else if (titleType === "tv" || titleType === "series") {
            if (imdbID.toString().slice(0, 2) !== "tt") {
                fetch(
                    TMDB_TV_FETCH_LINK_PREPEND +
                        imdbID +
                        TMDB_TV_FETCH_EXTERNAL_LINK_APPEND,
                    options
                )
                    .then((response) => response.json())
                    .then((response) => {
                        tvFetchIMDBID = response["imdb_id"].toString();
                    })
                    .then(() => {
                        fetch(TMDB_TV_FETCH_LINK_PREPEND + imdbID, options)
                            .then((response) => response.json())
                            .then((response) => {
                                setTVIMDBID(tvFetchIMDBID);
                                setTVBackdropPath(response["backdrop_path"]);
                                setTVCreatedBy(response["created_by"]);
                                setTVFirstAirDate(response["first_air_date"]);
                                setTVLastAirDate(response["last_air_date"]);
                                setTVGenres(response["genres"]);
                                setTVLanguages(response["spoken_languages"]);
                                setTVNetworks(response["networks"]);
                                setTVNumberOfEpisodes(
                                    response["number_of_episodes"]
                                );
                                setTVNumberOfSeasons(
                                    response["number_of_seasons"]
                                );
                                setTVOverview(response["overview"]);
                                setTVProductionCompanies(
                                    response["production_companies"]
                                );
                                setTVSeasons(response["seasons"]);
                                setTVTMDBRating(response["vote_average"]);
                            })
                            .catch((err) => console.error(err));
                    })
                    .catch((err) => console.error(err));
            } else {
                tvFetchIMDBID = imdbID;
                fetch(
                    TMDB_TV_FETCH_INTERNAL_LINK_PREPEND +
                        imdbID +
                        TMDB_TV_FETCH_INTERNAL_LINK_APPEND,
                    options
                )
                    .then((response) => response.json())
                    .then((response) => {
                        tvFetchTMDBID =
                            response["tv_results"][0]["id"].toString();
                        // setTVTMDBID(tvFetchTMDBID);
                    })
                    .then(() => {
                        fetch(
                            TMDB_TV_FETCH_LINK_PREPEND + tvFetchTMDBID,
                            options
                        )
                            .then((response) => response.json())
                            .then((response) => {
                                setTVIMDBID(imdbID);
                                setTVBackdropPath(response["backdrop_path"]);
                                setTVCreatedBy(response["created_by"]);
                                setTVFirstAirDate(response["first_air_date"]);
                                setTVLastAirDate(response["last_air_date"]);
                                setTVGenres(response["genres"]);
                                setTVLanguages(response["spoken_languages"]);
                                setTVNetworks(response["networks"]);
                                setTVNumberOfEpisodes(
                                    response["number_of_episodes"]
                                );
                                setTVNumberOfSeasons(
                                    response["number_of_seasons"]
                                );
                                setTVOverview(response["overview"]);
                                setTVProductionCompanies(
                                    response["production_companies"]
                                );
                                setTVSeasons(response["seasons"]);
                                setTVTMDBRating(response["vote_average"]);
                            })
                            .catch((err) => console.error(err));
                    })
                    .catch((err) => console.error(err));
            }
        }
    };

    useEffect(() => {
        setTimeout(() => {
            getAdditionalMovieDetails();
        }, 400);
    }, []);

    return (
        <div>
            <div className="card">
                <div className="card-inner">
                    <div className="card-front">
                        <div className="card-image">
                            <img
                                src={
                                    !moviePoster || moviePoster === "N/A"
                                        ? noPosterFound
                                        : moviePoster
                                }
                                alt="Placeholder"
                            />
                        </div>
                        <div className="card-front-content">
                            <div className="card-front-title-year">
                                <h4>{movieTitle}</h4>
                                <p>{movieYear}</p>
                            </div>
                            <div className="card-front-tmdb-rating">
                                <p className="title-tmdb-rating">
                                    &#10030;{" "}
                                    {titleType === "movie"
                                        ? parseFloat(movieTMDBRating).toFixed(1)
                                        : parseFloat(tvTMDBRating).toFixed(1)}
                                </p>
                            </div>
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
                                {titleType === "movie" ? (
                                    <h4 className="card-back-subheading">
                                        Runtime
                                    </h4>
                                ) : (
                                    <h4 className="card-back-subheading">
                                        Series Run
                                    </h4>
                                )}
                                {titleType === "movie" ? (
                                    <p className="card-back-details">
                                        {movieRuntime} minutes
                                    </p>
                                ) : (
                                    <p className="card-back-details">
                                        {tvNumberOfSeasons} seasons,{" "}
                                        {tvNumberOfEpisodes} episodes
                                    </p>
                                )}
                                <div className="overview-section">
                                    <h4 className="card-back-subheading">
                                        Overview
                                    </h4>
                                    {titleType === "movie" ? (
                                        <p className="card-back-details details-overview">
                                            {movieOverview}
                                        </p>
                                    ) : (
                                        <p className="card-back-details details-overview">
                                            {tvOverview}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {titleType === "movie" ||
                            titleType === "tv" ||
                            titleType === "series" ? (
                                <div className="link-to-view">
                                    <button className="button-to-view">
                                        {titleType === "movie" ? (
                                            <Link
                                                to={"/movie"}
                                                state={{
                                                    movieEmbedID: movieIMDBID,
                                                    movieBackdropPath:
                                                        movieBackdropPath,
                                                    movieBudget: movieBudget,
                                                    movieRevenue: movieRevenue,
                                                    movieGenres: movieGenres,
                                                    movieProductionCompanies:
                                                        movieProductionCompanies,
                                                    movieLanguages:
                                                        movieLanguages,
                                                }}
                                                className="webpage-link"
                                            >
                                                Watch Now
                                            </Link>
                                        ) : (
                                            <Link
                                                to={"/tv"}
                                                state={{
                                                    tvBackdropPath:
                                                        tvBackdropPath,
                                                    tvCreatedBy: tvCreatedBy,
                                                    tvFirstAirDate:
                                                        tvFirstAirDate,
                                                    tvLastAirDate:
                                                        tvLastAirDate,
                                                    tvGenres: tvGenres,
                                                    tvTMDBID: tvTMDBID,
                                                    tvLanguages: tvLanguages,
                                                    tvNetworks: tvNetworks,
                                                    tvNumberOfEpisodes:
                                                        tvNumberOfEpisodes,
                                                    tvNumberOfSeasons:
                                                        tvNumberOfSeasons,
                                                    tvProductionCompanies:
                                                        tvProductionCompanies,
                                                    tvSeasons: tvSeasons,
                                                    tvIMDBID: tvIMDBID,
                                                }}
                                                className="webpage-link"
                                            >
                                                Watch Now
                                            </Link>
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
