import "./InvalidSearch.css";

const InvalidSearch = () => {
    return (
        <div className="invalid-search">
            <h2 className="invalid-search-heading">
                Please enter a valid search term
            </h2>
            <p className="invalid-search-description">
                Results cannot be shown if the search term contains a number.
                Please write the number out - Two instead of 2 - and try again.
            </p>
            <p className="invalid-search-description">
                If movie details do not appear on hovering of the title, please
                refresh the page and try again.
            </p>
        </div>
    );
};

export default InvalidSearch;
