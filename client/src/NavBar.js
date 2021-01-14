import React from "react";
import "./css/NavBar.css";
import vulcan from "./resources/vulcan.png";
import nel from "./resources/Nel_Logo.png";
import nio from "./resources/nio.png";
import pltr from "./resources/PLTR.png";
import virgin from "./resources/virgin.png";

const NavBar = ({ selectStock, setSelectAll, stockToShow }) => {
  const clickLogo = ticker => {
    selectStock(ticker);
    setSelectAll(false);
  };

  const showAllTickers = () => {
    selectStock("");
    setSelectAll(true);
  };

  return ( <
    nav className = "navbar" >
    <
    ul className = "navigation" >
    <
    li className = "navigation-item" >
    <
    img src = { vulcan } alt = "vulcan energy"
    className = { `navigation-picture ${
              stockToShow === "VUL" ? "addBorder" : ""
            }` } onClick = {
      () => clickLogo("VUL") }
    /> <
    /li> <
    li className = "navigation-item" >
    <
    img src = { nel } alt = "nel asa"
    className = { `navigation-picture ${
              stockToShow === "NEL" ? "addBorder" : ""
            }` } onClick = {
      () => clickLogo("NEL") }
    /> <
    /li> <
    li className = "navigation-item" >
    <
    img src = { nio } alt = "NIO"
    className = { `navigation-picture ${
              stockToShow === "NIO" ? "addBorder" : ""
            }` } onClick = {
      () => clickLogo("NIO") }
    /> <
    /li> <
    li className = "navigation-item" >
    <
    img src = { pltr } alt = "Palantir"
    className = { `navigation-picture ${
              stockToShow === "PLTR" ? "addBorder" : ""
            }` } onClick = {
      () => clickLogo("PLTR") }
    /> <
    /li> <
    li className = "navigation-item" >
    <
    img src = { virgin } alt = "Virgin Galactic"
    className = { `navigation-picture ${
              stockToShow === "SPCE" ? "addBorder" : ""
            }` } onClick = {
      () => clickLogo("SPCE") }
    /> <
    /li> <
    li className = "navigation-item" >
    <
    button className = "showAll"
    onClick = {
      () => showAllTickers() } >
    Show all <
    /button> <
    /li> <
    /ul> <
    /nav>
  );
};

export default NavBar;