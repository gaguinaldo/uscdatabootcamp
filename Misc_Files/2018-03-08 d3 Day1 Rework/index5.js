var dataSet = [14, 15.0, 10, 31, 10, 25, 39];

//Size of the chart
var svgHeight = 600;
var svgWidth = 400;

var svg = d3
  .select("#svg-area")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

svg
  .selectAll("rect")
  .data(dataSet)
  .enter()
  .append('rect')
  .attr('width', 50)
  .attr('height', function(data){
    return data * 10;
  })
  .attr('x', function(data, index){
    return index * 60;
  })
  .attr('y', function (data){
    return 600 - data * 10;
  })
  .attr('class', 'bar');


