import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MoviePage.css";

const MoviePage = () => {
    var MOVIE_EMBED_LINK_PREPEND = "https://vidsrc.to/embed/movie/";
    const location = useLocation();
    var movieEmbedID = location.state?.movieEmbedID;
    console.log(movieEmbedID);

    const InvalidMovieIDContent = () => {
        return (
            <div className="page-link-back">
                <Link to="/" className="webpage-link">
                    Home
                </Link>
            </div>
        );
    };

    const ValidMovieIDContent = ({ movieEmbedSource }) => {
        return (
            <div>
                {movieEmbedID}
                <div className="movie-content">
                    <embed
                        className="view-video-test"
                        src={movieEmbedSource}
                        type="video/webm"
                    />
                </div>
            </div>
        );
    };

    var movieEmbedSource = MOVIE_EMBED_LINK_PREPEND + movieEmbedID;

    return (
        <div className="movie-page-content">
            {movieEmbedID ? (
                <ValidMovieIDContent movieEmbedSource={movieEmbedSource} />
            ) : (
                <InvalidMovieIDContent />
            )}
        </div>
    );
};

export default MoviePage;
