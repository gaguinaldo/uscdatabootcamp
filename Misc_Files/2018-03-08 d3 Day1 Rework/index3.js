var booksReadThisYear = 50;


var svg = d3
  .select("#svg-area");


svg
  .append("svg")
  .attr("height", "600")
  .attr("width", "400")
  .append("rect")
  .attr("width", 100)
  .attr("height", 10 * booksReadThisYear)
  .attr("x", 0)
  .attr("y", 0)
  .attr('fill', 'red');
