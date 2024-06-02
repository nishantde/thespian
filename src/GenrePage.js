import { useEffect, useState } from "react";
import "./GenrePage.css";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";
import Cards from "./Cards";

const GenrePage = () => {
    const [isGenrePageLoading, setIsGenrePageLoading] = useState(false);
    const [movieGenreTitles, setMovieGenreTitles] = useState([]);
    const [tvGenreTitles, setTVGenreTitles] = useState([]);

    const TMDB_GENRE_MOVIE_PAGE_URL =
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=";

    const TMDB_GENRE_TV_PAGE_URL =
        "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=";

    const TMDB_TITLE_POSTER_IMAGE_PATH_PREPEND =
        "https://image.tmdb.org/t/p/w500";

    var movieGenreResponse = [];
    var movieGenreResponseList = [];
    var tvGenreResponse = [];
    var tvGenreResponseList = [];

    const location = useLocation();

    var obtainedGenreID = location.state?.obtainedGenreID;
    var movieOrTV = location.state?.movieOrTV;
    var obtainedGenreName = location.state?.obtainedGenreName;

    const TMDB_API_READ_ACCESS_TOKEN =
        process.env.REACT_APP_TMDB_API_READ_ACCESS_TOKEN;

    const tmdbOptions = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + TMDB_API_READ_ACCESS_TOKEN,
        },
    };

    async function getGenreMoviesByID() {
        setIsGenrePageLoading(true);

        await fetch(TMDB_GENRE_MOVIE_PAGE_URL + obtainedGenreID, tmdbOptions)
            .then((response) => response.json())
            .then((response) => {
                movieGenreResponse = response["results"];
                movieGenreResponse.map((element) => {
                    movieGenreResponseList.push({
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
                setMovieGenreTitles(movieGenreResponseList);
            })
            .catch((err) => console.error(err));

        setIsGenrePageLoading(false);
    }

    async function getGenreTVByID() {
        setIsGenrePageLoading(true);

        await fetch(TMDB_GENRE_TV_PAGE_URL + obtainedGenreID, tmdbOptions)
            .then((response) => response.json())
            .then((response) => {
                tvGenreResponse = response["results"];
                tvGenreResponse.map((element) => {
                    tvGenreResponseList.push({
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
                setTVGenreTitles(tvGenreResponseList);
            })
            .catch((err) => console.error(err));

        setIsGenrePageLoading(false);
    }

    useEffect(() => {
        if (movieOrTV === "movie") {
            getGenreMoviesByID();
        } else {
            getGenreTVByID();
        }
    }, []);

    return (
        <div className="genre-page-content">
            {isGenrePageLoading ? (
                <Loading />
            ) : movieOrTV === "movie" ? (
                <div className="genre-page-content-movies padding-adjustment">
                    <h1 className="genre-page-heading">
                        Movies in {obtainedGenreName}
                    </h1>
                    <Cards movies={movieGenreTitles} totalResults="IGNORE" />
                </div>
            ) : (
                <div className="genre-page-content-tv padding-adjustment">
                    <h1 className="genre-page-heading">
                        TV in {obtainedGenreName}
                    </h1>
                    <Cards movies={tvGenreTitles} totalResults="IGNORE" />
                </div>
            )}
            <div className="extra-whitespace"></div>
        </div>
    );
};

export default GenrePage;
