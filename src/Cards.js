import "./Cards.css";
import Card from "./Card.js";

const Cards = ({ movies, totalResults }) => {
    return (
        <div className="cards-display">
            {totalResults === "IGNORE" ? (
                <h2>Known for</h2>
            ) : (
                <h2>
                    <span className="total-results-number">{totalResults}</span>{" "}
                    result&#40;s&#41; found
                </h2>
            )}
            <div className="cards">
                {movies.map((movie) => (
                    <Card movie={movie} key={movie["imdbID"]} />
                ))}
            </div>
        </div>
    );
};

export default Cards;
