import "./Cards.css";
import Card from "./Card.js";

const Cards = ({ movies, totalResults }) => {
    return (
        <div className="cards-display">
            <h2>{totalResults} results found</h2>
            <embed
                className="view-video-test"
                src="https://vidsrc.to/embed/movie/tt9376612"
                type="video/webm"
            />
            <div className="cards">
                {movies.map((movie) => (
                    <Card movie={movie} key={movie["imdbID"]} />
                ))}
            </div>
        </div>
    );
};

export default Cards;
