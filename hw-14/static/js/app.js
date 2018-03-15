// var dataJSON = [{
//     state: 'AK',
//     droveAlone: 11.6,
//     fivePlusYears: 13.2
// },

// {
//     state: 'AZ',
//     droveAlone: 10.6,
//     fivePlusYears: 8.4
// },

// {
//     state: 'AL',
//     droveAlone: 9.8,
//     fivePlusYears: 8.3
// }]

// var stateList = [];
// var dataList = [];

// var droveAloneList = [[11.6, 13.2], [10.6, 8.4], [9.8, 8.3]]

// dataJSON.forEach(function(data){
//     stateList.push(data.state)
//     droveAloneList.push(data.droveAlone, data.fivePlusYears)

// })

// console.log(droveAloneList)

var data = [[11.6, 13.2], [10.6, 8.4], [9.8, 8.3]]

var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 15,
    bottom: 60,
    left: 60
}

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3
    .select('body')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
    .append('g')
        .attr('transform', 'translate(' + chartWidth + ", " + chartHeight + ")");

// set the ranges with scaling functions
  var xLinearScale = d3.scaleLinear().range([0, chartWidth]);
  var yLinearScale = d3.scaleLinear().range([chartHeight, 0])

// functions to create axes
var bottomAxis = d3.axisBottom(xLinearScale);

var leftAxis = d3.axisLeft(yLinearScale);

var radius = d3.scaleSqrt().range([2,5]);

var xAxis = d3.axisBottom().scale(xLinearScale);

var yAxis = d3.axisLeft().scale(yLinearScale);



d3.csv('data1.csv' function(error, data){
    data.forEach(function(d){
        d.droveAlone = +d.droveAlone;
        d.fivePlusYears = +d.fivePlusYears;
    });


    xLinearScale.domain(d3.extent(data, function(d){
        return d.droveAlone;
    })).nice();

    yLinearScale.domain(d3.extent(data, function(d){
        return d.fivePlusYears;
    })).nice();




});

svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr("r", 3.5)
