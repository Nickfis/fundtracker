import React from "react";
import "./css/Ranking.css";
import Ticker from "./Ticker";

const Ranking = ({data}) => {
  return (
    <div className="ranking">
      <h2 clasName="rankingsHeadline">Current Returns</h2>
      <Ticker />
    </div>
  );
};

export default Ranking;
