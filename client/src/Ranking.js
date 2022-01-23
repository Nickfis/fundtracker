import React from "react";
import "./css/Ranking.css";
import Ticker from "./Ticker";
import nel from "./resources/Nel_Logo.png";
import nio from "./resources/nio.png";
import pltr from "./resources/PLTR.png";
import virgin from "./resources/virgin.png";
import vulcan from "./resources/vulcan.png";
import jks from "./resources/jks.png";
import ser from "./resources/ser.png";
import zap from "./resources/zaptec.png";
import daimler from "./resources/daimler.png";
import limelight from "./resources/limelight.png";

const Ranking = ({ data }) => {
  const investor = {
    PLTR: "Max",
    JKS: "Niklas",
    SER: "Maurice", // IN EURO
    ZAP: "Nino", // IN EURO
    DTK: "Steven",
    LLNW: "Marcel",
  };

  const logo = {
    PLTR: pltr,
    JKS: jks,
    SER: ser,
    ZAP: zap,
    DTK: daimler,
    LLNW: limelight,
  };
  // have to get the latest roi
  let returnArray = [];
  Object.keys(data).forEach((ticker) => {
    returnArray.push([ticker, data[ticker][0][1]]);
  });

  return (
    <div className="ranking">
      <h2 className="rankingsHeadline">Individual Returns</h2>
      {returnArray
        .sort((a, b) => b[1] - a[1])
        .map((d) => (
          <Ticker
            tickerLogo={logo[d[0]]}
            user={investor[d[0]]}
            roi={d[1]}
            key={d[0]}
          />
        ))}
    </div>
  );
};

export default Ranking;
