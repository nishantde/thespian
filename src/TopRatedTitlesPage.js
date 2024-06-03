import { useEffect, useState } from "react";
import "./TopRatedTitlesPage.css";
import Cards from "./Cards";
import Loading from "./Loading";
import topRatedIcon from "./assets/icons/icon-top-rated.png";

const TopRatedTitlesPage = () => {
    const [isTopRatedPageLoading, setIsTopRatedPageLoading] = useState(false);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topRatedTV, setTopRatedTV] = useState([]);

    var topRatedMoviesResponse = [];
    var topRatedMoviesResponseList = [];
    var topRatedTVResponse = [];
    var topRatedTVResponseList = [];

    const TMDB_TOP_RATED_MOVIES_URL =
        "https://api.themoviedb.org/3/movie/top_rated";
    const TMDB_TOP_RATED_TV_URL = "https://api.themoviedb.org/3/tv/top_rated";
    const TMDB_TITLE_POSTER_IMAGE_PATH_PREPEND =
        "https://image.tmdb.org/t/p/w500";

    async function getTopRatedTitles() {
        setIsTopRatedPageLoading(true);

        const TMDB_API_READ_ACCESS_TOKEN =
            process.env.REACT_APP_TMDB_API_READ_ACCESS_TOKEN;

        const tmdbOptions = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + TMDB_API_READ_ACCESS_TOKEN,
            },
        };

        await fetch(TMDB_TOP_RATED_MOVIES_URL, tmdbOptions)
            .then((response) => response.json())
            .then((response) => {
                topRatedMoviesResponse = response["results"];
                topRatedMoviesResponse.map((element) => {
                    topRatedMoviesResponseList.push({
                        Title: element["title"]
                            ? element["title"]
                            : element["name"],
                        Year: element["release_date"]
                            ? element["release_date"].slice(0, 4)
                            : element["first_air_date"].slice(0, 4),
                        Poster:
                            TMDB_TITLE_POSTER_IMAGE_PATH_PREPEND +
                            element["poster_path"],
                        Type: "movie",
                        imdbID: element["id"],
                    });
                });
                /* Setting the first 20 titles because each title appears twice for movies, but does not appear twice for TV */
                setTopRatedMovies(topRatedMoviesResponseList.slice(0, 20));
            })
            .catch((err) => console.error(err));

        await fetch(TMDB_TOP_RATED_TV_URL, tmdbOptions)
            .then((response) => response.json())
            .then((response) => {
                topRatedTVResponse = response["results"];
                topRatedTVResponse.map((element) => {
                    topRatedTVResponseList.push({
                        Title: element["title"]
                            ? element["title"]
                            : element["name"],
                        Year: element["release_date"]
                            ? element["release_date"].slice(0, 4)
                            : element["first_air_date"].slice(0, 4),
                        Poster:
                            TMDB_TITLE_POSTER_IMAGE_PATH_PREPEND +
                            element["poster_path"],
                        Type: "tv",
                        imdbID: element["id"],
                    });
                });
                setTopRatedTV(topRatedTVResponseList);
            })
            .catch((err) => console.error(err));

        setIsTopRatedPageLoading(false);
    }

    useEffect(() => {
        getTopRatedTitles();
    }, []);

    return (
        <div className="top-rated-titles-page-content padding-adjustment">
            {isTopRatedPageLoading ? (
                <Loading />
            ) : (
                <div>
                    <div className="top-rated-movies-section">
                        <h1 className="top-rated-movies-heading">
                            <img
                                src={topRatedIcon}
                                className="top-rated-titles-icon"
                                alt="Top Rated Titles Icon"
                            />{" "}
                            Top Rated Movies
                        </h1>
                        <Cards movies={topRatedMovies} totalResults="IGNORE" />
                    </div>
                    <div className="top-rated-tv-section">
                        <h1 className="top-rated-tv-heading">
                            <img
                                src={topRatedIcon}
                                className="top-rated-titles-icon"
                                alt="Top Rated Titles Icon"
                            />{" "}
                            Top Rated TV
                        </h1>
                        <Cards movies={topRatedTV} totalResults="IGNORE" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopRatedTitlesPage;
