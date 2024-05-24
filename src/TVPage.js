import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./TVPage.css";
import { useEffect, useState } from "react";

import actorIcon from "./assets/icons/icon-actors.png";
import awardsIcon from "./assets/icons/icon-awards.png";
import companiesIcon from "./assets/icons/icon-companies.png";
import directorIcon from "./assets/icons/icon-director.png";
import episodesIcon from "./assets/icons/icon-episodes.png";
import genresIcon from "./assets/icons/icon-genres.png";
import imdbIcon from "./assets/icons/icon-imdb.png";
import languagesIcon from "./assets/icons/icon-languages.png";
import ratingIcon from "./assets/icons/icon-rating.png";
import releaseDateIcon from "./assets/icons/icon-release-date.png";
import runtimeIcon from "./assets/icons/icon-runtime.png";
import seasonsIcon from "./assets/icons/icon-seasons.png";

import Actor from "./Actor";
import Loading from "./Loading";

const MoviePage = () => {
    var OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

    const [isLoading, setIsLoading] = useState(true);

    const [tvTitle, setTVTitle] = useState("");
    const [tvRating, setTVRating] = useState("");
    const [tvReleaseDate, setTVReleaseDate] = useState("");
    const [tvEpisodeRuntime, setTVEpisodeRuntime] = useState("");
    const [tvActors, setTVActors] = useState([]);
    const [tvPlot, setTVPlot] = useState("");
    const [tvAwards, setTVAwards] = useState("N/A");
    const [tvIMDBRating, setTVIMDBRating] = useState("N/A");
    const [currentSeasonNumber, setCurrentSeasonNumber] = useState(1);
    const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState(1);
    const [seasonEpisodeMapState, setSeasonEpisodeMapState] = useState({});
    const [currentSeasonOverview, setCurrentSeasonOverview] = useState("");
    const [seasonOverviewMapState, setSeasonOverviewMapState] = useState({});

    const EXTERNAL_IMDB_LINK_PREPEND = "https://www.imdb.com/title/";
    const OMDB_TV_ADDITIONAL_DETAILS_PREPEND =
        "http://www.omdbapi.com/?apikey=" + OMDB_API_KEY + "&plot=full&i=";
    var TV_EMBED_LINK_PREPEND = "https://vidsrc.to/embed/tv/";
    const TMDB_TV_BANNER_IMAGE_PATH_PREPEND =
        "https://image.tmdb.org/t/p/original";

    const location = useLocation();

    var tvIMDBID = location.state?.tvIMDBID;
    var tvBackdropPath = location.state?.tvBackdropPath;
    var tvCreatedBy = location.state?.tvCreatedBy;
    var tvFirstAirDate = location.state?.tvFirstAirDate;
    var tvLastAirDate = location.state?.tvLastAirDate;
    var tvNetworks = location.state?.tvNetworks;
    var tvNumberOfEpisodes = location.state?.tvNumberOfEpisodes;
    var tvNumberOfSeasons = location.state?.tvNumberOfSeasons;
    var tvSeasons = location.state?.tvSeasons;
    var tvGenres = location.state?.tvGenres;
    var tvProductionCompanies = location.state?.tvProductionCompanies;
    var tvLanguages = location.state?.tvLanguages;

    var seasonEpisodeMap = {};
    var seasonOverviewMap = {};
    var newArray = [];

    function fetchMoreDetails() {
        setIsLoading(true);
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        };

        if (tvSeasons) {
            tvSeasons.map((arrayElement) => {
                for (let i = 0; i < arrayElement["episode_count"]; i++) {
                    newArray.push(i + 1);
                }
                seasonEpisodeMap[arrayElement["season_number"]] = newArray;
                seasonOverviewMap[arrayElement["season_number"]] =
                    arrayElement["overview"];
                newArray = [];
            });

            setSeasonEpisodeMapState(seasonEpisodeMap);
            setSeasonOverviewMapState(seasonOverviewMap);
            setCurrentSeasonOverview(seasonOverviewMap[currentSeasonNumber]);
        }

        fetch(OMDB_TV_ADDITIONAL_DETAILS_PREPEND + tvIMDBID, options)
            .then((response) => response.json())
            .then((response) => {
                setTVTitle(response["Title"]);
                setTVRating(response["Rated"]);
                setTVReleaseDate(response["Released"]);
                setTVEpisodeRuntime(response["Runtime"]);
                setTVActors(response["Actors"].split(","));
                setTVPlot(response["Plot"]);
                setTVAwards(response["Awards"]);
                setTVIMDBRating(response["Ratings"][0]["Value"]);
            })
            .catch((err) => console.error(err));

        setTimeout(() => {
            var tvPageBanner = document.getElementById("tvPageBanner");
            if (tvPageBanner) {
                tvPageBanner.scrollIntoView({ behavior: "smooth" });
            }
        }, 200);

        setIsLoading(false);
    }

    const MoreDetails = () => {
        return (
            <div>
                <div className="movie-title-and-link">
                    <div className="movie-title-and-imdb-rating-section">
                        <h1 id="tvTitle">{tvTitle}</h1>
                        <p className="movie-imdb-rating">
                            <img
                                src={imdbIcon}
                                className="page-icon"
                                alt="IMDB Icon"
                            />
                            <span>&#10030; {tvIMDBRating}</span>
                        </p>
                    </div>
                    <p>
                        <a
                            href={EXTERNAL_IMDB_LINK_PREPEND + tvIMDBID}
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
                        <p className="movie-plot-section">{tvPlot}</p>
                        <div className="movie-details-subsection">
                            <div className="movie-parental-rating-section">
                                <h3>
                                    <img
                                        src={ratingIcon}
                                        className="page-icon"
                                        alt="Rating Icon"
                                    />{" "}
                                    Rated
                                </h3>
                                <p>{tvRating}</p>
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
                                <p>{tvReleaseDate}</p>
                            </div>
                            <div className="movie-runtime-section">
                                <h3>
                                    <img
                                        src={runtimeIcon}
                                        className="page-icon"
                                        alt="Runtime Icon"
                                    />
                                    Episode Runtime
                                </h3>
                                <p>{tvEpisodeRuntime}</p>
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
                                {tvGenres.map((genre) => (
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
                                Created By
                            </h3>
                            <div className="tv-created-by-listing">
                                {tvCreatedBy.map((creator) => (
                                    <p
                                        className="creator-name"
                                        key={creator["id"]}
                                    >
                                        {creator["name"]}
                                    </p>
                                ))}
                            </div>
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
                                {tvActors.map((actor) => (
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
                            <p>{tvAwards}</p>
                        </div>
                        <div className="movie-budget-section">
                            <h3>
                                <img
                                    src={seasonsIcon}
                                    className="page-icon"
                                    alt="TV Seasons Icon"
                                />
                                Number of Seasons
                            </h3>
                            <p>{tvNumberOfSeasons}</p>
                        </div>
                        <div className="movie-revenue-section">
                            <h3>
                                <img
                                    src={episodesIcon}
                                    className="page-icon"
                                    alt="TV Episodes Icon"
                                />
                                Number of Episodes
                            </h3>
                            <p>{tvNumberOfEpisodes}</p>
                        </div>
                        <div className="movie-production-companies-section">
                            <h3>
                                <img
                                    src={companiesIcon}
                                    className="page-icon"
                                    alt="Companies Icon"
                                />
                                Production Companies
                            </h3>
                            <div className="movie-production-companies">
                                {tvProductionCompanies.map((company) => (
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
                                {tvLanguages.map((language) => (
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

    function TVStreamingContent({ tvID, seasonNumber, episodeNumber }) {
        return (
            <div className="movie-content">
                <embed
                    className="movie-page-view-video"
                    src={
                        TV_EMBED_LINK_PREPEND +
                        tvID +
                        "/" +
                        seasonNumber +
                        "/" +
                        episodeNumber
                    }
                    type="video/webm"
                />
            </div>
        );
    }

    const ValidMovieIDContent = () => {
        return (
            <div>
                <div className="movie-page-details">
                    <MoreDetails />
                </div>
                <div className="tv-season-episode-selector">
                    <div className="tv-season-selector-section">
                        <span className="selector-label">Season</span>
                        <select
                            id="tvSeasonSelector"
                            onChange={(e) => {
                                e.preventDefault();
                                setCurrentSeasonNumber(e.target.value);
                                setCurrentEpisodeNumber(1);
                                setCurrentSeasonOverview(
                                    seasonOverviewMapState[e.target.value]
                                );
                            }}
                        >
                            {tvSeasons.map((tvSeason) => (
                                <option
                                    key={tvSeason["id"]}
                                    value={tvSeason["season_number"]}
                                    selected={
                                        tvSeason["season_number"] ==
                                        currentSeasonNumber
                                    }
                                >
                                    {tvSeason["season_number"]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="tv-episode-selector-section">
                        <span className="selector-label">Episode</span>
                        <select
                            id="tvEpisodeSelector"
                            onChange={(e) => {
                                e.preventDefault();
                                setCurrentEpisodeNumber(e.target.value);
                            }}
                        >
                            {seasonEpisodeMapState[currentSeasonNumber].map(
                                (currentEpisode) => (
                                    <option
                                        key={currentEpisode}
                                        value={currentEpisode}
                                        selected={
                                            currentEpisode ==
                                            currentEpisodeNumber
                                        }
                                    >
                                        {currentEpisode}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                </div>
                <div className="tv-season-overview-section">
                    <div>
                        {currentSeasonOverview ? (
                            <p className="tv-season-overview">
                                <span className="tv-season-prefix-span">
                                    Season {currentSeasonNumber} Synopsis:
                                </span>
                                {" " + currentSeasonOverview}
                            </p>
                        ) : (
                            <p className="tv-season-overview no-overview">
                                No overview available for season{" "}
                                {currentSeasonNumber}
                            </p>
                        )}
                    </div>
                </div>
                <TVStreamingContent
                    tvID={tvIMDBID}
                    seasonNumber={currentSeasonNumber}
                    episodeNumber={currentEpisodeNumber}
                />
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

    var movieEmbedSource = TV_EMBED_LINK_PREPEND + tvIMDBID + "/1/1";

    useEffect(() => {
        setTimeout(() => {
            fetchMoreDetails();
        }, 1200);
        var tvPageBanner = document.getElementById("tvPageBanner");
        if (tvPageBanner) {
            console.log(tvPageBanner.offsetHeight);
        }
    }, []);

    return (
        <div>
            <div className="movie-banner-image-section" id="tvPageBanner">
                <div
                    style={{
                        backgroundImage:
                            "url(" +
                            TMDB_TV_BANNER_IMAGE_PATH_PREPEND +
                            tvBackdropPath +
                            ")",
                    }}
                    className="movie-banner-image hide-banner-on-mobile"
                >
                    <div className="movie-banner-gradient"></div>
                </div>
                <div className="movie-banner-image hide-banner-on-desktop movie-banner-gradient-mobile"></div>
                <img
                    src={TMDB_TV_BANNER_IMAGE_PATH_PREPEND + tvBackdropPath}
                    alt="Movie Banner"
                    className="movie-banner-image hide-banner-on-desktop"
                />
            </div>
            <div className="movie-page-content">
                {isLoading ? (
                    <Loading />
                ) : tvIMDBID ? (
                    <ValidMovieIDContent movieEmbedSource={movieEmbedSource} />
                ) : (
                    <InvalidMovieIDContent />
                )}
            </div>
        </div>
    );
};

export default MoviePage;
