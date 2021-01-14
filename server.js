const express = require("express");

const app = express();
var yahooFinance = require("yahoo-finance");

const getApiUrl = ticker =>
  `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${process.env.ALPHA_VANTAGE_KEY}`;

app.get("/yahoo/:ticker", (req, res) => {
  yahooFinance.historical({
      symbol: req.params.ticker,
      from: "2021-01-01",
      to: new Date(),
      period: "d"
    },
    (err, quotes) => {
      let dailyData = [];
      Object.keys(quotes).forEach(day => {
        dailyData.push([quotes[day]["date"], quotes[day]["open"]]);
      });
      res.json(dailyData);
    }
  );
});

const PORT = process.env.PORT || 4000;

// Serve static assets
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, console.log(`App running on port ${PORT} `));