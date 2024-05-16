import { useEffect, useState } from "react";
import "./ActorPage.css";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";

const ActorPage = () => {
    const [isActorPageLoading, setIsActorPageLoading] = useState(true);

    const [actorName, setActorName] = useState("");
    const [actorBiography, setActorBiography] = useState("");
    const [actorBirthday, setActorBirthday] = useState("");
    // const [actorGender, setActorGender] = useState(0);
    const [actorKnownDepartment, setActorKnownDepartment] = useState("");
    const [actorBirthplace, setActorBirthplace] = useState("");

    const TMDB_ACTOR_POSTER_IMAGE_PATH_PREPEND =
        "https://image.tmdb.org/t/p/w500";

    // const actorGenderDictionary = {
    //     0: "Not set/not specified",
    //     1: "Female",
    //     2: "Male",
    //     3: "Non-binary",
    // };

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
                // setActorGender(actorGenderDictionary[response["gender"]]);
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
    }, []);

    return (
        <div className="actor-page-content padding-adjustment">
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
                                <h3 className="actor-birthday-heading">Born</h3>
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
                    <h2 className="actor-known-movies-heading">Known for</h2>
                    <div className="actor-known-movies-section">
                        {actorKnownMovies.map((knownMovie) => (
                            <div
                                className="actor-known-for"
                                key={knownMovie["id"]}
                            >
                                <img
                                    src={
                                        TMDB_ACTOR_POSTER_IMAGE_PATH_PREPEND +
                                        knownMovie["poster_path"]
                                    }
                                    alt={knownMovie["title"] + "Poster"}
                                    className="actor-known-movie-poster"
                                />
                                <div className="actor-known-for-movie-details">
                                    <h3 className="actor-known-movie-title">
                                        {knownMovie["title"]}
                                    </h3>
                                    <div className="actor-known-movie-release-and-rating">
                                        <p className="actor-known-movie-release">
                                            {knownMovie["release_date"].slice(0, 4)}
                                        </p>
                                        <p className="actor-known-movie-rating">
                                            &#10030;{" "}
                                            {knownMovie["vote_average"]}/10
                                        </p>
                                    </div>

                                    <p className="actor-known-movie-overview">
                                        {knownMovie["overview"]}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActorPage;
