import React from "react";
import LineChart from "./LineChart";
import "./css/Dashboard.css";

const Dashboard = ({data, colourScheme}) => {
  // get latest return on investment
  const returnDictionary = {};
  Object.keys(data).forEach(ticker => {
    returnDictionary[ticker] = data[ticker][0][1];
  });

  // calculate sum and average roi
  let sumROI = 0;
  Object.keys(returnDictionary).forEach(ticker => {
    sumROI += returnDictionary[ticker];
  });
  const avgROI = sumROI / Object.keys(data).length;

  // get best and worst performing stock
  let bestPerformer = [];
  let worstPerformer = [];
  Object.keys(returnDictionary).forEach(ticker => {
    if (bestPerformer.length === 0) {
      bestPerformer = [ticker, returnDictionary[ticker]];
      worstPerformer = [ticker, returnDictionary[ticker]];
    } else {
      if (bestPerformer[1] < returnDictionary[ticker]) {
        bestPerformer = [ticker, returnDictionary[ticker]];
      } else if (worstPerformer[1] > returnDictionary[ticker]) {
        worstPerformer = [ticker, returnDictionary[ticker]];
      }
    }
  });

  return (
    <div className="dashboard">
      <h1 className="topHeading">Road to 2Maloti Fund 2021</h1>
      <div className="quickStatsContainer">
        <div className="quickStat">
          <h3 className="quickStatHeadline">Portfolio $ Value</h3>
          <h2 className="quickStatNumber">{Math.round(avgROI * 60)}$</h2>
        </div>
        <div className="quickStat">
          <h3 className="quickStatHeadline">Portfolio Return</h3>
          <h2 className="quickStatNumber">{Math.round((avgROI - 1) * 100)}%</h2>
        </div>
        <div className="quickStat bestPerformer">
          <h3 className="quickStatHeadline">Best Performer</h3>
          <h2 className="quickStatNumber">
            {bestPerformer[0]}: {Math.round((bestPerformer[1] - 1) * 100)}%
          </h2>
        </div>
        <div className="quickStat worstPerformer">
          <h3 className="quickStatHeadline">Worst Performer</h3>
          <h2 className="quickStatNumber">
            {worstPerformer[0]}: {Math.round((worstPerformer[1] - 1) * 100)}%
          </h2>
        </div>
      </div>
      <LineChart
        data={data}
        colourScheme={colourScheme}
        width={900}
        height={500}
      />
    </div>
  );
};

export default Dashboard;
