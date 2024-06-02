import { useEffect, useState } from "react";
import "./PopularTitlesPage.css";
import Cards from "./Cards";
import Loading from "./Loading";
import popularIcon from "./assets/icons/icon-popular.png";

const PopularTitlesPage = () => {
    const [isPopularPageLoading, setIsPopularPageLoading] = useState(false);
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularTV, setPopularTV] = useState([]);

    var popularMoviesResponse = [];
    var popularMoviesResponseList = [];
    var popularTVResponse = [];
    var popularTVResponseList = [];

    const TMDB_POPULAR_MOVIES_URL =
        " https://api.themoviedb.org/3/movie/popular";
    const TMDB_POPULAR_TV_URL = "https://api.themoviedb.org/3/tv/popular";
    const TMDB_TITLE_POSTER_IMAGE_PATH_PREPEND =
        "https://image.tmdb.org/t/p/w500";

    async function getPopularTitles() {
        setIsPopularPageLoading(true);

        const TMDB_API_READ_ACCESS_TOKEN =
            process.env.REACT_APP_TMDB_API_READ_ACCESS_TOKEN;

        const tmdbOptions = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + TMDB_API_READ_ACCESS_TOKEN,
            },
        };

        await fetch(TMDB_POPULAR_MOVIES_URL, tmdbOptions)
            .then((response) => response.json())
            .then((response) => {
                popularMoviesResponse = response["results"];
                popularMoviesResponse.map((element) => {
                    popularMoviesResponseList.push({
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
                setPopularMovies(popularMoviesResponseList.slice(0, 20));
            })
            .catch((err) => console.error(err));

        await fetch(TMDB_POPULAR_TV_URL, tmdbOptions)
            .then((response) => response.json())
            .then((response) => {
                popularTVResponse = response["results"];
                popularTVResponse.map((element) => {
                    popularTVResponseList.push({
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
                setPopularTV(popularTVResponseList);
            })
            .catch((err) => console.error(err));

        setIsPopularPageLoading(false);
    }

    useEffect(() => {
        getPopularTitles();
    }, []);

    return (
        <div className="popular-titles-page-content padding-adjustment">
            {isPopularPageLoading ? (
                <Loading />
            ) : (
                <div>
                    <div className="top-rated-movies-section">
                        <h1 className="top-rated-movies-heading">
                            <img
                                src={popularIcon}
                                className="top-rated-titles-icon"
                                alt="Top Rated Titles Icon"
                            />{" "}
                            Popular Movies
                        </h1>
                        <Cards movies={popularMovies} totalResults="IGNORE" />
                        <div className="extra-whitespace"></div>
                    </div>
                    <div className="top-rated-tv-section">
                        <h1 className="top-rated-tv-heading">
                            <img
                                src={popularIcon}
                                className="top-rated-titles-icon"
                                alt="Top Rated Titles Icon"
                            />{" "}
                            Popular TV
                        </h1>
                        <Cards movies={popularTV} totalResults="IGNORE" />
                        <div className="extra-whitespace"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PopularTitlesPage;
