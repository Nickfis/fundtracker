import React from "react";
import "./css/Ranking.css";

const Ticker = ({tickerLogo, roi, user}) => {
  return (
    <div className="ticker">
      <div className="tickerAndUser">
        <img className="rankingLogo" src={tickerLogo} alt="Ticker logo" />
        <h4 className="user">{user}</h4>
      </div>
      <h4 className="roi">{roi}%</h4>
    </div>
  );
};

export default Ticker;
