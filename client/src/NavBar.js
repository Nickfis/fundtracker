import React from "react";
import "./css/NavBar.css";
import vulcan from "./resources/vulcan.png";
import nel from "./resources/Nel_Logo.png";
import nio from "./resources/nio.png";
import pltr from "./resources/PLTR.png";
import virgin from "./resources/virgin.png";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navigation">
        <li className="navigation-item">
          <img
            src={vulcan}
            alt="vulcan energy"
            className="navigation-picture"
          />
        </li>
        <li className="navigation-item">
          <img src={nel} alt="nel asa" className="navigation-picture" />
        </li>
        <li className="navigation-item">
          <img src={nio} alt="NIO" className="navigation-picture" />
        </li>
        <li className="navigation-item">
          <img src={pltr} alt="Palantir" className="navigation-picture" />
        </li>
        <li className="navigation-item">
          <img
            src={virgin}
            alt="Virgin Galactic"
            className="navigation-picture"
          />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;