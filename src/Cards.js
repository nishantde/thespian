import "./Cards.css";
import Card from "./Card.js";

const Cards = ({ movies, totalResults }) => {
    return (
        <div className="cards-display">
            <h2>{totalResults} results found</h2>
            <div className="cards">
                {movies.map((movie) => (
                    <Card movie={movie} key={movie["imdbID"]} />
                ))}
            </div>
        </div>
    );
};

export default Cards;
