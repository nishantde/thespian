import { useEffect, useState } from "react";
import "./Pages.css";

const Pages = ({ totalResults, currentPage }) => {
    const [numberOfPages, setNumberOfPages] = useState(0);

    useEffect(() => {
        setNumberOfPages(parseInt(Math.ceil(parseFloat(totalResults / 10))));
    }, []);

    return (
        <div>
            <div className="pages-section">
                <div className="left-buttons">
                    <div className="first-page-button">
                        <button className="search-button">&#171;</button>
                    </div>
                    <div className="previous-page-button">
                        <button className="search-button">&#8249;</button>
                    </div>
                </div>
                <div className="pages-search-bar-and-totals">
                    <div className="page-search-bar">
                        <input placeholder={currentPage} />
                    </div>
                </div>
                <div className="right-buttons">
                    <div className="next-page-button">
                        <button className="search-button">&#8250;</button>
                    </div>
                    <div className="last-page-button">
                        <button className="search-button">&#187;</button>
                    </div>
                </div>
            </div>
            <div className="page-totals">Page {currentPage} of {numberOfPages}</div>
        </div>
    );
};

export default Pages;
