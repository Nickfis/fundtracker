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
          <img src={vulcan} className="navigation-picture" />
        </li>
        <li className="navigation-item">
          <img src={nel} className="navigation-picture" />
        </li>
        <li className="navigation-item">
          <img src={nio} className="navigation-picture" />
        </li>
        <li className="navigation-item">
          <img src={pltr} className="navigation-picture" />
        </li>
        <li className="navigation-item">
          <img src={virgin} className="navigation-picture" />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
