import "./css/App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import Ranking from "./Ranking";
import * as d3 from "d3";
import jks from "./resources/jks.png";
import ser from "./resources/ser.png";
import zap from "./resources/zaptec.png";
import daimler from "./resources/daimler.png";
import limelight from "./resources/limelight.png";
import pltr from "./resources/PLTR.png";

const App = () => {
  const [stockData, setStockData] = useState([]);
  const [stockToShow, selectStock] = useState("");
  const [allSelected, setSelectAll] = useState(true);

  const allStocks = {
    PLTR: {
      start: 18.53,
      colourScheme: "rgba(70,130,180, 1)",
      logo: pltr,
    },
    DTK: {
      start: 32.53,
      colourScheme: "rgba(0, 77, 31, 1)",
      logo: daimler,
    },
    JKS: {
      start: 45.92,
      colourScheme: "rgba(125, 36, 8, 1)",
      logo: jks,
    },
    LLNW: {
      start: 3.49,
      colourScheme: "rgba(130, 190, 203, 1)",
      logo: limelight,
    },
    ZAP: {
      start: 6.14,
      colourScheme: "rgba(116, 101, 227, 1)",
      logo: zap,
    },
    SER: {
      start: 1.28,
      colourScheme: "rgba(168, 40, 145, 1)",
      logo: ser,
    },
  };

  // const startOf2022 = {
  //   PLTR: 18.53,
  //   DTK: 32.53, // Daimler Truck in Euro
  //   JKS: 45.92,
  //   LLNW: 3.49, // Limelight
  //   ZAP: 6.14, // 6I4.F -> Zaptec, Euros
  //   SER: 1.28, // Sernova Corp: PSH.F, Euros
  // };

  // create color object
  const colourScheme = {
    PLTR: "rgba(70,130,180, 1)",
    DTK: "rgba(0, 77, 31, 1)",
    JKS: "rgba(125, 36, 8, 1)",
    LLNW: "rgba(130, 190, 203, 1)",
    ZAP: "rgba(116, 101, 227, 1)",
    SER: "rgba(168, 40, 145, 1)",
  };

  const getReturnRate = (array, ticker) => {
    return array.data.map((d) => [
      d3.timeParse("%Y-%m-%d")(d[0].split("T")[0]),
      d[1] / allStocks[ticker].start,
    ]);
  };

  useEffect(() => {
    Promise.all([
      axios.get(`yahoo/PLTR`),
      axios.get(`yahoo/DTG.F`),
      axios.get(`yahoo/JKS`),
      axios.get("/yahoo/LLNW"),
      axios.get("yahoo/6I4.F"),
      axios.get("yahoo/PSH.F"),
    ]).then(([dataPLTR, dataDTK, dataJKS, dataLLNW, dataZAP, dataSER]) => {
      setStockData({
        PLTR: getReturnRate(dataPLTR, "PLTR"),
        DTK: getReturnRate(dataDTK, "DTK"),
        JKS: getReturnRate(dataJKS, "JKS"),
        LLNW: getReturnRate(dataLLNW, "LLNW"),
        ZAP: getReturnRate(dataZAP, "ZAP"),
        SER: getReturnRate(dataSER, "SER"),
      });
    });
  }, []);

  return (
    <div className="App">
      <NavBar
        selectStock={selectStock}
        setSelectAll={setSelectAll}
        stockToShow={stockToShow}
        allStocks={allStocks}
      />{" "}
      <Dashboard
        data={stockData}
        colourScheme={colourScheme}
        stockToShow={stockToShow}
        allSelected={allSelected}
      />{" "}
      <Ranking data={stockData} colourScheme={colourScheme} />{" "}
    </div>
  );
};

export default App;
