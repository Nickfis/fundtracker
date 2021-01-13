import React from "react";
import "./css/Ranking.css";
import Ticker from "./Ticker";
import nel from "./resources/Nel_Logo.png";
import nio from "./resources/nio.png";
import pltr from "./resources/PLTR.png";
import virgin from "./resources/virgin.png";
import vulcan from "./resources/vulcan.png";

const Ranking = ({data}) => {
  const investor = {
    PLTR: "Niklas",
    VUL: "Maurice", // IN EURO
    NEL: "Nino", // IN EURO
    NIO: "Sam & Max",
    SPCE: "Marcel"
  };

  const logo = {
    PLTR: pltr,
    NIO: nio,
    NEL: nel,
    SPCE: virgin,
    VUL: vulcan
  };
  // have to get the latest roi
  let returnArray = [];
  Object.keys(data).forEach(ticker => {
    returnArray.push([ticker, data[ticker][0][1]]);
  });

  return (
    <div className="ranking">
      <h2 className="rankingsHeadline">Current Returns</h2>
      {returnArray
        .sort((a, b) => b[1] - a[1])
        .map(d => (
          <Ticker tickerLogo={logo[d[0]]} user={investor[d[0]]} roi={d[1]} />
        ))}
    </div>
  );
};

export default Ranking;
