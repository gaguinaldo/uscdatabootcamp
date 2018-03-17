var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3
    .select('.iframeContainer')
    .attr('class','svg-area')
    .append('svg')
    .attr('height',svgHeight)
    .attr('width',svgWidth)
    .append('g')
    .attr("height", chartHeight)
    .attr("width", chartWidth)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xBandScale = d3.scaleLinear().range([0,chartWidth])

var yLinearScale = d3.scaleLinear().range([chartHeight,0]);

d3.csv('./data/data.csv',function(error, data){
    if (error) throw error;

    data.forEach(function(dataItems) {
    dataItems.fivePlusYears = +dataItems.fivePlusYears;
    dataItems.droveAlone20to24yrs = +dataItems.droveAlone20to24yrs;})
    console.log(data)

    //Find the max in the 'droveAlone20to24yrs' array.
    xBandScale.domain([0, d3.max(data, function(d) {
    return d.droveAlone20to24yrs;
  })]);

    //Find the max in the 'fivePlusYears' array.
    yLinearScale.domain([0, d3.max(data, function(d) {
    return d.fivePlusYears;
  })]);

    //Create variables for the axis.
    var xaxis = d3.axisBottom(xBandScale);
    var yaxis = d3.axisLeft(yLinearScale);

    svg
    .selectAll("circle")
    .data(data)
    .enter()
        .append('circle')
        .attr('cx', d => xBandScale(d.droveAlone20to24yrs))
        .attr('cy', d => yLinearScale(d.fivePlusYears))
        .attr('r',10)
        .style("stroke", "red")
        .attr("fill-opacity", .5)
        .attr("fill", "purple");
    svg
    .selectAll("text")
    .data(data)
    .enter()
        .append('text')
        .attr('x', d => xBandScale(d.droveAlone20to24yrs))
        .attr('y', d => yLinearScale(d.fivePlusYears-.1))
        .style('text-anchor','middle')
        .text(d=>d.state)
        .attr("fill", "white")
        .attr("font-size",10)
        .attr("font-family","sans-serif");

    svg
    .append("g")
    .attr("transform", "translate(0," + chartHeight + ")")
    .call(xaxis);
    svg
    .append("text")
    .attr("transform",
          "translate(" + (chartWidth) + " ," +
                         (chartHeight + (margin.top)) + ")")
    .style("text-anchor", "middle")
    .text("% Drove Alone Between 20-24 Yrs Old")
    .attr("font-size",12)
    .attr("font-family","sans-serif");

    svg
    .append("g")
    .call(yaxis);

    svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - (margin.left))
    .attr("x",0 - (chartHeight))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("% That Have Not Been to the Doctor in Five or More Years")
    .attr("font-size",12)
    .attr("font-family","sans-serif");

});
