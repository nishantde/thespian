import { Link } from "react-router-dom";
import "./Card.css";
import { useState } from "react";

const Card = ({ movie }) => {
    const [movieIMDBID, setMovieIMDBID] = useState(movie["imdbID"]);

    if (!movie["imdbID"]) {
        setMovieIMDBID("default");
    }

    var movieTitle = movie["Title"];
    var movieYear = movie["Year"];
    var moviePoster = movie["Poster"];
    var titleType = movie["Type"];

    return (
        <div>
            <div className="card">
                <div className="card-inner">
                    <div className="card-front">
                        <div className="card-image">
                            <img src={moviePoster} alt="Placeholder" />
                        </div>
                        <div className="card-front-content">
                            <h3>{movieTitle}</h3>
                            <p>{movieYear}</p>
                            <p>Type: {titleType}</p>
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
                            <div className="imdb-id">
                                IMDB ID: {movieIMDBID}
                            </div>
                            <div className="link-to-view">
                                <button className="button-to-view">
                                    <Link
                                        to={"/movie"}
                                        state={{ movieEmbedID: movieIMDBID }}
                                        className="webpage-link"
                                    >
                                        Watch Now
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
