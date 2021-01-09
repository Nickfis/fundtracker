import "./App.css";
import BarChart from "./BarChart";
import axios from "axios";
import React, {useState, useEffect} from "react";

const data = [
  {year: 1980, efficiency: 24.3, sales: 8949000},
  {year: 1985, efficiency: 27.6, sales: 10979000},
  {year: 1990, efficiency: 28, sales: 9303000},
  {year: 1991, efficiency: 28.4, sales: 8185000},
  {year: 1992, efficiency: 27.9, sales: 8213000},
  {year: 1993, efficiency: 28.4, sales: 8518000},
  {year: 1994, efficiency: 28.3, sales: 8991000},
  {year: 1995, efficiency: 28.6, sales: 8620000}
];

const filterDates = data => {
  return Object.keys(data)
    .filter(key => key > "2020-12-31")
    .reduce((obj, key) => {
      obj[key] = data[key]["1. open"];
      return obj;
    }, {});
};

const App = () => {
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    Promise.all([axios.get(`stocks/jks`), axios.get(`stocks/nio`)]).then(
      ([dataJKS, dataNIO]) =>
        setStockData({
          JKS: filterDates(dataJKS.data["Time Series (Daily)"]),
          NIO: filterDates(dataNIO.data["Time Series (Daily)"])
        })
    );
  }, []);
  console.log(stockData);
  return (
    <div className="App">
      <BarChart data={data} />
      <h1>Hi</h1>
    </div>
  );
};

export default App;
