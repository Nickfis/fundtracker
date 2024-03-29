import React from "react";
import LineChart from "./LineChart";
import "./css/Dashboard.css";

const Dashboard = ({ data, colourScheme, stockToShow, allSelected }) => {
  // get latest return on investment
  const returnDictionary = {};
  Object.keys(data).forEach((ticker) => {
    returnDictionary[ticker] = data[ticker][0][1];
  });

  // calculate sum and average roi
  let sumROI = 0;
  Object.keys(returnDictionary).forEach((ticker) => {
    sumROI += returnDictionary[ticker];
    if (ticker == "NIO") {
      sumROI += returnDictionary[ticker];
    }
  });
  // due to beautify not understanding math I have to split this out.
  // If you write avgROI = sumROI / (Object.kys(data).length + 1);
  // beautify removes the parenthesis automatically.
  const numberOfInvestors = Object.keys(data).length + 1;
  const avgROI = sumROI / numberOfInvestors;

  // get best and worst performing stock
  let bestPerformer = [];
  let worstPerformer = [];
  Object.keys(returnDictionary).forEach((ticker) => {
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
      <h1 className="topHeading">Road to 2 Maloti Fund 2022</h1>
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
      {data.length === 0 ? null : (
        <LineChart
          data={data}
          colourScheme={colourScheme}
          stockToShow={stockToShow}
          allSelected={allSelected}
          width={900}
          height={500}
        />
      )}
    </div>
  );
};

export default Dashboard;
