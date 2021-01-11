import React from "react";
import LineChart from "./LineChart";
import "./css/Dashboard.css";

const Dashboard = ({data}) => {
  return (
    <div className="dashboard">
      <h1>Was geht ab</h1>
      <h2>Quick Stats</h2>
      <div className="quickStatsContainer">
        <div className="quickStat">
          <h3 className="quickStatHeadline">Portfolio Return</h3>
          <h2 className="quickStatNumber">80%</h2>
        </div>
        <div className="quickStat"></div>
        <div className="quickStat"></div>
        <div className="quickStat"></div>
      </div>
      <LineChart data={data} width={800} height={500} />
    </div>
  );
};

export default Dashboard;
