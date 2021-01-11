import "./App.css";
import axios from "axios";
import React, {useState, useEffect} from "react";
import LineChart from "./LineChart";
import * as d3 from "d3";

const startOf2021 = {
  Palantir: 23.55,
  VulcanEnergy: 2.23,
  NelAsa: 3.41,
  NIO: 48.74,
  Virgin: 23.73
};

const filterDates = data => {
  return Object.keys(data)
    .filter(key => key > "2020-12-31")
    .reduce((arr, key) => {
      arr.push({
        date: d3.timeParse("%Y-%m-%d")(key),
        value: data[key]["1. open"]
      });
      return arr;
    }, []);
};

const App = () => {
  // const [stockData, setStockData] = usweState({});

  // const data = useEffect(() => {
  //   Promise.all([
  //     axios.get(`stocks/PLTR`),
  //     axios.get(`stocks/NIO`),
  //     axios.get(`stocks/SPCE`)
  //   ]).then(([dataPLTR, dataNIO, dataSPCE]) => {
  //     setStockData({
  //       PLTR: filterDates(dataPLTR.data["Time Series (Daily)"]),
  //       NIO: filterDates(dataNIO.data["Time Series (Daily)"]),
  //       SPCE: filterDates(dataSPCE.data["Time Series (Daily)"])
  //     });
  //   });
  // }, []);

  const stockData = {
    PLTR: [
      {
        date: d3.timeParse("%Y-%m-%d")("2021-01-07"),
        value: "25.7000"
      },
      {
        date: d3.timeParse("%Y-%m-%d")("2021-01-06"),
        value: "24.0200"
      },
      {
        date: d3.timeParse("%Y-%m-%d")("2021-01-05"),
        value: "24.1200"
      },
      {
        date: d3.timeParse("%Y-%m-%d")("2021-01-04"),
        value: "23.1800"
      },
      {
        date: d3.timeParse("%Y-%m-%d")("2021-01-03"),
        value: "23.9100"
      }
    ],
    NIO: [
      {
        date: d3.timeParse("%Y-%m-%d")("2021-01-07"),
        value: "57.7600"
      },
      {
        date: d3.timeParse("%Y-%m-%d")("2021-01-06"),
        value: "53.0500"
      },
      {
        date: d3.timeParse("%Y-%m-%d")("2021-01-05"),
        value: "54.0200"
      },
      {
        date: d3.timeParse("%Y-%m-%d")("2021-01-04"),
        value: "51.9700"
      },
      {
        date: d3.timeParse("%Y-%m-%d")("2021-01-03"),
        value: "51.2000"
      }
    ],
    SPCE: [
      {
        date: d3.timeParse("%Y-%m-%d")("2021-01-07"),
        value: "25.6600"
      },
      {
        date: d3.timeParse("%Y-%m-%d")("2021-01-06"),
        value: "25.2500"
      },
      {
        date: d3.timeParse("%Y-%m-%d")("2021-01-05"),
        value: "24.0300"
      },
      {
        date: d3.timeParse("%Y-%m-%d")("2021-01-04"),
        value: "23.0800"
      },
      {
        date: d3.timeParse("%Y-%m-%d")("2021-01-03"),
        value: "23.9600"
      }
    ]
  };

  return (
    <div className="App">
      <LineChart data={stockData} width={800} height={500} />
    </div>
  );
};

export default App;
