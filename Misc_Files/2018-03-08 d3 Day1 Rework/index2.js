var svgWidth = "100%";
var svgHeight = "400";

var svg = d3
  .select("#svg-area")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

svg
  .append("rect")
  .attr("x", 100)
  .attr("y", 100)
  .attr("width", 100)
  .attr("height", 100)
  .attr("fill", "blue");


svg
    .append('circle')
    .attr('cx', 300)
    .attr('cy', 300)
    .attr('r', 10)
    .attr('fill', 'red')


