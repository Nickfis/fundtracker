import "./css/App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import Ranking from "./Ranking";
import * as d3 from "d3";

const App = () => {
  const [stockData, setStockData] = useState([]);
  const [stockToShow, selectStock] = useState("");
  const [allSelected, setSelectAll] = useState(true);

  const startOf2021 = {
    PLTR: 23.55,
    VUL: 1.71, // IN EURO
    NEL: 2.851, // IN EURO
    NIO: 48.74,
    SPCE: 23.73
  };

  // create color object
  const colourScheme = {
    PLTR: "rgba(70,130,180, 1)",
    NIO: "rgba(0, 77, 31, 1)",
    SPCE: "rgba(125, 36, 8, 1)",
    NEL: "rgba(130, 190, 203, 1)",
    VUL: "rgba(116, 101, 227, 1)"
  };


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

  return ( <
    div className = "App" >
    <
    NavBar selectStock = { selectStock } setSelectAll = { setSelectAll } stockToShow = { stockToShow }
    /> <
    Dashboard data = { stockData } colourScheme = { colourScheme } stockToShow = { stockToShow } allSelected = { allSelected }
    /> <
    Ranking data = { stockData } colourScheme = { colourScheme }
    /> < /
    div >
  );
};

export default App;