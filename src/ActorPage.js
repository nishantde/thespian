import { useEffect, useState } from "react";
import "./ActorPage.css";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";
import Cards from "./Cards";

const ActorPage = () => {
    const [isActorPageLoading, setIsActorPageLoading] = useState(true);

    const [actorName, setActorName] = useState("");
    const [actorBiography, setActorBiography] = useState("");
    const [actorBirthday, setActorBirthday] = useState("");
    const [actorKnownDepartment, setActorKnownDepartment] = useState("");
    const [actorBirthplace, setActorBirthplace] = useState("");
    const [actorPageKnownMovies, setActorPageKnownMovies] = useState([]);

    var actorKnownMoviesList = [];

    const TMDB_ACTOR_POSTER_IMAGE_PATH_PREPEND =
        "https://image.tmdb.org/t/p/w500";

    const location = useLocation();

    var actorID = location.state?.actorID;
    var actorOriginalName = location.state?.actorOriginalName;
    var actorKnownMovies = location.state?.actorKnownMovies;
    var actorProfilePath = location.state?.actorProfilePath;

    const TMDB_API_READ_ACCESS_TOKEN =
        process.env.REACT_APP_TMDB_API_READ_ACCESS_TOKEN;
    const TMDB_ACTOR_PAGE_DETAILS_PREPEND =
        "https://api.themoviedb.org/3/person/";

    async function getActorDetails() {
        setIsActorPageLoading(true);

        actorKnownMovies.map((element) => {
            actorKnownMoviesList.push({
                Title: element["title"] ? element["title"] : element["name"],
                Year: element["release_date"]
                    ? element["release_date"].slice(0, 4)
                    : element["first_air_date"].slice(0, 4),
                Poster:
                    TMDB_ACTOR_POSTER_IMAGE_PATH_PREPEND +
                    element["poster_path"],
                Type: element["media_type"],
                imdbID: element["id"],
            });
        });

        setActorPageKnownMovies(actorKnownMoviesList);

        const tmdbOptions = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + TMDB_API_READ_ACCESS_TOKEN,
            },
        };

        await fetch(TMDB_ACTOR_PAGE_DETAILS_PREPEND + actorID, tmdbOptions)
            .then((response) => response.json())
            .then((response) => {
                setActorName(response["name"]);
                setActorBiography(response["biography"]);
                setActorBirthday(response["birthday"]);
                setActorKnownDepartment(response["known_for_department"]);
                setActorBirthplace(response["place_of_birth"]);
            })
            .catch((error) => console.error(error));

        setIsActorPageLoading(false);
    }

    useEffect(() => {
        setTimeout(() => {
            getActorDetails();
        }, 600);
    }, [actorName]);

    return (
        <div className="actor-page-content-wrap padding-adjustment">
            <div className="actor-page-content">
                {isActorPageLoading ? (
                    <Loading />
                ) : (
                    <div>
                        <div className="actor-portrait-and-details-section">
                            <div className="actor-portrait">
                                <img
                                    src={
                                        TMDB_ACTOR_POSTER_IMAGE_PATH_PREPEND +
                                        actorProfilePath
                                    }
                                    alt={actorOriginalName}
                                    className="actor-portrait-image"
                                />
                            </div>
                            <div className="actor-details">
                                <h1 className="actor-page-name">{actorName}</h1>
                                <h3 className="actor-original-name-heading">
                                    Also known as
                                </h3>
                                <p className="actor-original-name">
                                    {actorOriginalName}
                                </p>
                                <h3 className="actor-known-department-heading">
                                    Department
                                </h3>
                                <p className="actor-known-department">
                                    {actorKnownDepartment}
                                </p>
                                <div className="actor-birthday-and-birthplace">
                                    <h3 className="actor-birthday-heading">
                                        Born
                                    </h3>
                                    <p className="actor-birthday">
                                        {actorBirthday}
                                    </p>
                                    <h3 className="actor-birthplace-heading">
                                        Place of birth
                                    </h3>
                                    <p className="actor-birthplace">
                                        {actorBirthplace}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="actor-biography">{actorBiography}</p>
                        <Cards
                            movies={actorPageKnownMovies}
                            totalResults="IGNORE"
                            key={Math.random}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActorPage;
