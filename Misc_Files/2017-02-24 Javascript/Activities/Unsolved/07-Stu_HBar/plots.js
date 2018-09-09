// @TODO: Complete the following sections

// console.log(data);
// Sort the data array using the greekSearchResults value

var sortedData = data.sort(function compareFunction(firstNum, secondNum) {

    return secondNum.greekSearchResults - firstNum.greekSearchResults
});

// Slice the first 10 objects for plotting

var slicedData = sortedData.slice(0, 11);

// Trace1 for the Greek Data

slicedData = slicedData.reverse()

var trace1 = {

    x: slicedData.map(row => row.greekSearchResults),
    y: slicedData.map(row => row.greekName),
    text: slicedData.map(row => row.greekName),
    name: 'Greek',
    type: 'bar',
    orientation: 'h'
}

// set up the data variable

var data = [trace1]

// set up the layout variable

var layout = {

    title: 'Greek Sort',
    barmode: 'group'
}

// Render the plot to the div tag with id "plot"
Plotly.newPlot('plot', data, layout)
