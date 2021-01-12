import React from "react";
import "./css/Ranking.css";
import Ticker from "./Ticker";
import nel from "./resources/Nel_Logo.png";
import nio from "./resources/nio.png";
import pltr from "./resources/PLTR.png";
import virgin from "./resources/virgin.png";
import vulcan from "./resources/vulcan.png";

const Ranking = ({data}) => {
  return (
    <div className="ranking">
      <h2 className="rankingsHeadline">Current Returns</h2>
      <Ticker tickerLogo={nio} user={"Sam"} roi={30} />
      <Ticker tickerLogo={pltr} user={"Sam"} roi={30} />
      <Ticker tickerLogo={vulcan} user={"Sam"} roi={30} />
      <Ticker tickerLogo={virgin} user={"Sam"} roi={30} />
      <Ticker tickerLogo={nel} user={"Sam"} roi={30} />
    </div>
  );
};

export default Ranking;
