import React, {useEffect} from "react";
import * as d3 from "d3";
import "./index.css";

const LineChart = props => {
  const {data, width, height} = props;

  console.log(`width: ${width}`);
  console.log(`height: ${height}`);
  useEffect(() => {
    drawChart();
  }, [data]);

  console.log(data);

  const drawChart = () => {
    if (!props.data["PLTR"]) {
      return null;
    }
    // data processing
    const allValues = [];
    const allDates = [];
    Object.keys(data).forEach(ticker => {
      allValues.push(data[ticker].map(d => d.value));
      allDates.push(data[ticker].map(d => d.date));
    });

    const padding = {top: 30, right: 30, bottom: 30, left: 30};
    // for the domain of the x and y axis I will have to look at all values I have
    // not specific to each stock and build a large array of all those values
    const x = d3
      .scaleTime()
      .domain(d3.extent(allDates.flat(), d => d))
      .range([0, width - padding.right - padding.left]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(allValues.flat(), d => d)])
      .range([height - padding.bottom - padding.top, 0]);

    const svg = d3
      .select("#linechart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${padding.left}, ${padding.top})`);

    // call axis
    svg
      .append("g")
      .attr(
        "transform",
        `translate(0, ${height - padding.bottom - padding.top})`
      )
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    // create color object
    const colourScheme = {
      PLTR: "steelblue",
      NIO: "#004d1f",
      SPCE: "#7d2408"
    };

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
            .x(d => x(d.date))
            .y(d => y(d.value))
        );
    });
  };
  return <svg id="linechart" height={height} width={width}></svg>;
};

export default LineChart;