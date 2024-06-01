import { useEffect, useState } from "react";
import "./TrendingTitlesPage.css";
import Cards from "./Cards";
import Loading from "./Loading";

const TrendingTitlesPage = () => {
    const [isTrendingPageLoading, setIsTrendingPageLoading] = useState(false);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTV, setTrendingTV] = useState([]);

    var trendingMoviesResponse = [];
    var trendingMoviesResponseList = [];
    var trendingTVResponse = [];
    var trendingTVResponseList = [];

    const TMDB_TRENDING_MOVIES_URL =
        "https://api.themoviedb.org/3/trending/movie/week";
    const TMDB_TRENDING_TV_URL = " https://api.themoviedb.org/3/trending/tv/week";
    const TMDB_TITLE_POSTER_IMAGE_PATH_PREPEND =
        "https://image.tmdb.org/t/p/w500";

    async function getTrendingTitles() {
        setIsTrendingPageLoading(true);

        const TMDB_API_READ_ACCESS_TOKEN =
            process.env.REACT_APP_TMDB_API_READ_ACCESS_TOKEN;

        const tmdbOptions = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + TMDB_API_READ_ACCESS_TOKEN,
            },
        };

        await fetch(TMDB_TRENDING_MOVIES_URL, tmdbOptions)
            .then((response) => response.json())
            .then((response) => {
                trendingMoviesResponse = response["results"];
                trendingMoviesResponse.map((element) => {
                    trendingMoviesResponseList.push({
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
                setTrendingMovies(trendingMoviesResponseList);
            })
            .catch((err) => console.error(err));

        await fetch(TMDB_TRENDING_TV_URL, tmdbOptions)
            .then((response) => response.json())
            .then((response) => {
                trendingTVResponse = response["results"];
                trendingTVResponse.map((element) => {
                    trendingTVResponseList.push({
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
                setTrendingTV(trendingTVResponseList);
            })
            .catch((err) => console.error(err));

        setIsTrendingPageLoading(false);
    }

    useEffect(() => {
        getTrendingTitles();
    }, []);

    return (
        <div className="trending-titles-page-content padding-adjustment">
            {isTrendingPageLoading ? (
                <Loading />
            ) : (
                <div>
                    <div className="top-rated-movies-section">
                        <h1 className="top-rated-movies-heading">
                            Trending Movies
                        </h1>
                        <Cards movies={trendingMovies} totalResults="IGNORE" />
                        <div className="extra-whitespace"></div>
                    </div>
                    <div className="top-rated-tv-section">
                        <h1 className="top-rated-tv-heading">Trending TV</h1>
                        <Cards movies={trendingTV} totalResults="IGNORE" />
                        <div className="extra-whitespace"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrendingTitlesPage;
