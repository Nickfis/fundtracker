import React, {useEffect} from "react";
import * as d3 from "d3";
import "./index.css";

// .tickFormat(5, "+");
const LineChart = ({
  data,
  width,
  height,
  colourScheme,
  stockToShow,
  allSelected
}) => {
  useEffect(() => {
    drawChart();
  }, [data, stockToShow, allSelected]);

  console.log(data);
  const drawChart = () => {
    d3.selectAll("path").remove();
    d3.selectAll("g").remove();
    // data processing
    const allValues = [];
    const allDates = [];
    Object.keys(data).forEach(ticker => {
      allValues.push(data[ticker].map(d => d[1]));
      allDates.push(data[ticker].map(d => d[0]));
    });

    const padding = {top: 50, right: 20, bottom: 30, left: 50};
    // for the domain of the x and y axis I will have to look at all values I have
    // not specific to each stock and build a large array of all those values
    const x = d3
      .scaleTime()
      .domain(d3.extent(allDates.flat(), d => d))
      .range([0, width - padding.right - padding.left]);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min([d3.min(allValues.flat(), d => d), 0.8]),
        d3.max(allValues.flat(), d => d)
      ])
      .range([height - padding.bottom - padding.top, 0]);

    const svg = d3
      .select("#linechart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${padding.left}, ${padding.top})`);

    // call x axis
    svg
      .append("g")
      .attr(
        "transform",
        `translate(0, ${height - padding.bottom - padding.top})`
      )
      .style("font", "14px times")
      .call(d3.axisBottom(x).ticks(5));

    // y axis
    var percentFormat = d3.format("%");
    svg
      .append("g")
      .style("font", "14px times")
      .call(
        d3
          .axisLeft(y)
          .tickFormat(d => Math.round((d - 1) * 100) + "%")
          .ticks(5)
      );

    var tooltip = svg
      .append("g")
      .attr("class", "focus")
      .style("display", "none");

    tooltip
      .append("rect")
      .attr("class", "tooltip")
      .attr("width", 130)
      .attr("height", 65)
      .attr("x", 10)
      .attr("y", -22)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", "rgb(215, 215, 215)")
      .attr("stroke", "#000");

    tooltip
      .append("text")
      .attr("class", "tooltipTicker")
      .attr("x", 18)
      .attr("y", -2);

    tooltip
      .append("text")
      .attr("class", "tooltipDate")
      .attr("x", 18)
      .attr("y", 18);

    tooltip
      .append("text")
      .attr("class", "tooltipValue")
      .attr("x", 18)
      .attr("y", 38);

    const dateFormatter = d3.timeFormat("%d.%m.%y");

    const onMouseover = (e, ticker) => {
      console.log(e);
      const currentDate = x.invert(e.layerX - padding.left);
      const currentValue = y.invert(e.layerY - padding.top);
      console.log(currentValue);
      const xValue = e.layerX - 4 * padding.left;
      const yValue = e.layerY - 3.5 * padding.bottom;

      tooltip
        .style("display", null)
        .attr("transform", `translate(${xValue}, ${yValue})`);

      tooltip
        .select(".tooltipDate")
        .text(d3.timeFormat("%d.%m.%Y")(currentDate));
      tooltip
        .select(".tooltipValue")
        .text(`Return: ${Math.round(100 * (currentValue - 1))}%`);

      tooltip.select(".tooltipTicker").text(`Ticker: ${ticker}`);
    };

    const onMouseout = () => {
      tooltip.style("display", "none");
    };

    if (!allSelected) {
      svg
        .append("path")
        .datum(data[stockToShow])
        .attr("fill", "none")
        .attr("stroke", colourScheme[stockToShow])
        .attr("stroke-width", 3)
        .attr(
          "d",
          d3
            .line()
            .x(d => x(d[0]))
            .y(d => y(d[1]))
        )
        .on("mouseover", e => onMouseover(e, stockToShow))
        .on("mouseout", () => onMouseout());
    } else {
      Object.keys(data).forEach(ticker => {
        svg
          .append("path")
          .datum(data[ticker])
          .attr("fill", "none")
          .attr("stroke", colourScheme[ticker])
          .attr("stroke-width", 3)
          .attr(
            "d",
            d3
              .line()
              .x(d => x(d[0]))
              .y(d => y(d[1]))
          )
          .on("mouseover", e => onMouseover(e, ticker))
          .on("mouseout", () => onMouseout());
      });
    }
  };
  return (
    <svg id="linechart" height={height} width={width}>
      {" "}
    </svg>
  );
};

export default LineChart;
