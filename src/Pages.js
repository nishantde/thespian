import { useEffect, useState } from "react";
import "./Pages.css";

const Pages = ({
    totalResults,
    currentSearchPage,
    getMoviesByPage,
    currentSearchTerm,
}) => {
    const [pageValue, setPageValue] = useState(currentSearchPage);
    const [numberOfPages, setNumberOfPages] = useState(0);

    setTimeout(() => {
        var pageSearchInput = document.getElementById("pageSearchInput");
        pageSearchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                getMoviesByPage(currentSearchTerm, pageValue);
            }
        });
    }, 600);

    useEffect(() => {
        setNumberOfPages(parseInt(Math.ceil(parseFloat(totalResults / 10))));
        var pageSearchInput = document.getElementById("pageSearchInput");
        if (pageSearchInput) {
            console.log(pageSearchInput.offsetHeight);
        }
    }, []);

    return (
        <div>
            <div className="pages-section">
                <div className="left-buttons">
                    <div className="first-page-button">
                        <button
                            className="search-button"
                            onClick={() => {
                                setPageValue(1);
                                getMoviesByPage(currentSearchTerm, pageValue);
                            }}
                        >
                            &#171;
                        </button>
                    </div>
                    <div className="previous-page-button">
                        <button
                            className="search-button"
                            onClick={() => {
                                setPageValue(
                                    (previousValue) => previousValue - 1
                                );
                                getMoviesByPage(currentSearchTerm, pageValue);
                            }}
                        >
                            &#8249;
                        </button>
                    </div>
                </div>
                <div className="pages-search-bar-and-totals">
                    <div className="page-search-bar">
                        <input
                            type="number"
                            id="pageSearchInput"
                            placeholder={currentSearchPage}
                            onChange={(e) =>
                                setPageValue(e.target.value.toString())
                            }
                        />
                    </div>
                </div>
                <div className="right-buttons">
                    <div className="next-page-button">
                        <button
                            className="search-button"
                            onClick={() => {
                                setPageValue(
                                    (previousValue) => previousValue + 1
                                );
                                getMoviesByPage(currentSearchTerm, pageValue);
                            }}
                        >
                            &#8250;
                        </button>
                    </div>
                    <div className="last-page-button">
                        <button
                            className="search-button"
                            onClick={() => {
                                setPageValue(numberOfPages);
                                getMoviesByPage(currentSearchTerm, pageValue);
                            }}
                        >
                            &#187;
                        </button>
                    </div>
                </div>
            </div>
            <div className="page-totals">
                Page {currentSearchPage} of {numberOfPages}
            </div>
        </div>
    );
};

export default Pages;
