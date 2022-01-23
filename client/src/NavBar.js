import React from "react";
import "./css/NavBar.css";
import vulcan from "./resources/vulcan.png";
import nel from "./resources/Nel_Logo.png";
import nio from "./resources/nio.png";
import pltr from "./resources/PLTR.png";
import virgin from "./resources/virgin.png";

const NavBar = ({ selectStock, setSelectAll, stockToShow, allStocks }) => {
  const clickLogo = (ticker) => {
    selectStock(ticker);
    setSelectAll(false);
  };

  const showAllTickers = () => {
    selectStock("");
    setSelectAll(true);
  };

  return (
    <nav className="navbar">
      <ul className="navigation">
        {Object.keys(allStocks).map((ticker) => (
          <li key={ticker} className="navigation-item">
            <img
              src={allStocks[ticker].logo}
              alt={ticker}
              className={`navigation-picture ${
                stockToShow === ticker ? "addBorder" : ""
              } navigation-picture--${ticker}`}
              onClick={() => clickLogo(ticker)}
            />
          </li>
        ))}
      </ul>{" "}
    </nav>
  );
};

export default NavBar;
