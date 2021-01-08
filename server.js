const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
// const api = `http://api.openweathermap.org/data/2.5/weather?q=london,uk&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`;
app.use(cors());

const getApiUrl = ticker =>
  `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${process.env.ALPHA_VANTAGE_KEY}`;

console.log(getApiUrl("JKS"));
app.get("/", (req, res) => {
  res.send("go to /weather to see weather");
});

app.get("/stocks/:ticker", (req, res) => {
  console.log(req.params.ticker);
  console.log("I am getting hit");
  res.json("Hallo");
  axios.get(getApiUrl(req.params.ticker));

  res.json();
  // axios
  //   .get(api)
  //   .then(response => {
  //     res.json(response.data);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`App running on port ${PORT} `));

console.log();
