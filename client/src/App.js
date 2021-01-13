import "./css/App.css";
import axios from "axios";
import React, {useState, useEffect} from "react";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import Ranking from "./Ranking";
import * as d3 from "d3";

const startOf2021 = {
  PLTR: 23.55,
  VUL: 1.71, // IN EURO
  NEL: 2.851, // IN EURO
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
      axios.get(`yahoo/PLTR`),
      axios.get(`yahoo/NIO`),
      axios.get(`yahoo/SPCE`),
      axios.get("yahoo/D7G.F"),
      axios.get("yahoo/6KO.F")
    ]).then(([dataPLTR, dataNIO, dataSPCE, dataNEL, dataVUL]) => {
      setStockData({
        PLTR: dataPLTR.data.map(d => [
          d3.timeParse("%Y-%m-%d")(d[0].split("T")[0]),
          d[1] / startOf2021["PLTR"]
        ]),
        NIO: dataNIO.data.map(d => [
          d3.timeParse("%Y-%m-%d")(d[0].split("T")[0]),
          d[1] / startOf2021["NIO"]
        ]),
        SPCE: dataSPCE.data.map(d => [
          d3.timeParse("%Y-%m-%d")(d[0].split("T")[0]),
          d[1] / startOf2021["SPCE"]
        ]),
        NEL: dataNEL.data.map(d => [
          d3.timeParse("%Y-%m-%d")(d[0].split("T")[0]),
          d[1] / startOf2021["NEL"]
        ]),
        VUL: dataVUL.data.map(d => [
          d3.timeParse("%Y-%m-%d")(d[0].split("T")[0]),
          d[1] / startOf2021["VUL"]
        ])
      });
    });
  }, []);

  console.log(stockData);
  return (
    <div className="App">
      <NavBar />
      {stockData.length === 0 ? null : <Dashboard data={stockData} />}
      <Ranking />
    </div>
  );
};

export default App;
