import "./css/App.css";
import axios from "axios";
import React, {useState, useEffect} from "react";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import Ranking from "./Ranking";
import * as d3 from "d3";

const startOf2021 = {
  PLTR: 23.55,
  VulcanEnergy: 2.23,
  NelAsa: 3.41,
  NIO: 48.74,
  SPCE: 23.73
};

const filterDates = (data, ticker) => {
  return Object.keys(data)
    .filter(key => key > "2020-12-31")
    .reduce((arr, key) => {
      arr.push({
        date: d3.timeParse("%Y-%m-%d")(key),
        value: data[key]["1. open"],
        roi: parseFloat(data[key]["1. open"]) / parseFloat(startOf2021[ticker])
      });
      return arr;
    }, []);
};

const App = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`stocks/PLTR`),
      axios.get(`stocks/NIO`),
      axios.get(`stocks/SPCE`)
    ]).then(([dataPLTR, dataNIO, dataSPCE]) => {
      setStockData({
        PLTR: filterDates(dataPLTR.data["Time Series (Daily)"], "PLTR"),
        NIO: filterDates(dataNIO.data["Time Series (Daily)"], "NIO"),
        SPCE: filterDates(dataSPCE.data["Time Series (Daily)"], "SPCE")
      });
    });
  }, []);

  return (
    <div className="App">
      <NavBar />
      {stockData.length === 0 ? null : <Dashboard data={stockData} />}
      <Ranking />
    </div>
  );
};

export default App;
