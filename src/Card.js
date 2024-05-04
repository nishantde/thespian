import "./Card.css";

const Card = ({ movie }) => {
    var movieTitle = movie["Title"];
    var movieYear = movie["Year"];
    var movieIMDBID = movie["imdbID"];
    var moviePoster = movie["Poster"];
    var titleType = movie["Type"];

    return (
        <div>
            <div className="card">
                <div className="card-inner">
                    <div className="card-front">
                        <div className="card-image">
                            <img src={moviePoster} alt="Placeholder Image" />
                        </div>
                        <div className="card-content">
                            <h3>{movieTitle}</h3>
                            <p>{movieYear}</p>
                            <p>Type: {titleType}</p>
                        </div>
                    </div>
                    <div className="card-back">
                        <div className="imdb-id">IMDB ID: {movieIMDBID}</div>
                        <div className="view">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
