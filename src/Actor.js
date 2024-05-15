import { useEffect, useState } from "react";
import "./Actor.css";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Actors = ({ movieActor }) => {
    const [isActorSectionLoading, setIsActorSectionLoading] = useState(false);
    const [movieActorPoster, setMovieActorPoster] = useState("");
    const [actorID, setActorID] = useState(0);
    const [actorOriginalName, setActorOriginalName] = useState(movieActor);
    const [actorKnownMovies, setActorKnownMovies] = useState([]);

    const TMDB_API_READ_ACCESS_TOKEN =
        process.env.REACT_APP_TMDB_API_READ_ACCESS_TOKEN;
    const TMDB_ACTOR_POSTER_IMAGE_PREPEND =
        "https://api.themoviedb.org/3/search/person?query=";
    const TMDB_ACTOR_POSTER_IMAGE_PATH_PREPEND =
        "https://image.tmdb.org/t/p/w500";

    async function getMovieActorPoster() {
        setIsActorSectionLoading(true);
        const tmdbOptions = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + TMDB_API_READ_ACCESS_TOKEN,
            },
        };

        await fetch(TMDB_ACTOR_POSTER_IMAGE_PREPEND + movieActor, tmdbOptions)
            .then((response) => response.json())
            .then((response) => {
                setMovieActorPoster(
                    TMDB_ACTOR_POSTER_IMAGE_PATH_PREPEND +
                        response["results"][0]["profile_path"]
                );
                setActorID(response["results"][0]["id"]);
                setActorOriginalName(response["results"][0]["original_name"]);
                setActorKnownMovies(response["results"][0]["known_for"]);
            })
            .catch((err) => console.error(err));

        setIsActorSectionLoading(false);
    }

    useEffect(() => {
        setTimeout(() => {
            getMovieActorPoster();
        }, 600);
    }, []);

    if (isActorSectionLoading) {
        return (
            <div className="movie-actor">
                <Loading />;
            </div>
        );
    } else {
        return (
            <div className="movie-actor">
                <img
                    src={
                        TMDB_ACTOR_POSTER_IMAGE_PATH_PREPEND + movieActorPoster
                    }
                    alt={movieActor}
                    className="movie-actor-portrait"
                />
                {/* <p>{movieActor}</p> */}
                <Link
                    to={"/actor"}
                    state={{
                        actorID: actorID,
                        actorOriginalName: actorOriginalName,
                        actorKnownMovies: actorKnownMovies,
                        actorProfilePath:
                            TMDB_ACTOR_POSTER_IMAGE_PATH_PREPEND +
                            movieActorPoster,
                    }}
                    className="actor-page-link"
                >
                    {movieActor}
                </Link>
            </div>
        );
    }
};

export default Actors;
