import React from "react";
import LineChart from "./LineChart";
import "./css/Dashboard.css";

const Dashboard = ({data}) => {
  return (
    <div className="dashboard">
      <h1 className="topHeading">Road to 2Maloti Fund 2021</h1>
      <h2 className="subHeader">Quick Stats</h2>
      <div className="quickStatsContainer">
        <div className="quickStat">
          <h3 className="quickStatHeadline">Portfolio $ Value</h3>
          <h2 className="quickStatNumber">80$</h2>
        </div>
        <div className="quickStat">
          <h3 className="quickStatHeadline">Portfolio Return</h3>
          <h2 className="quickStatNumber">80%</h2>
        </div>
        <div className="quickStat bestPerformer">
          <h3 className="quickStatHeadline">Best Performer</h3>
          <h2 className="quickStatNumber">80%</h2>
        </div>
        <div className="quickStat worstPerformer">
          <h3 className="quickStatHeadline">Worst Performer</h3>
          <h2 className="quickStatNumber">80%</h2>
        </div>
      </div>
      <LineChart data={data} width={900} height={500} />
    </div>
  );
};

export default Dashboard;
