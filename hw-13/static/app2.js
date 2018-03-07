var dropDownData = d3
  .select("#selDataset")




var namesUrl = "/api/v1/names";
Plotly.d3.json(namesUrl, function(error, response) {
    if (error) return console.warn(error);

    for (var i = 0; i < response.length; i++){
        dropDownData
              .append('option')
              .attr('value', response[i])
              .text(response[i])
    }

});



function apiCallMetaData(endPoint){

    Plotly.d3.json(endPoint, function(error, response) {
    if (error) return console.warn(error);

    d3.select('#metaList').append('li').text('BB Type: ' + response[0]['BBTYPE'])
    d3.select('#metaList').append('li').text('Ethnicity: '+ response[0]['ETHNICITY'])
    d3.select('#metaList').append('li').text('Gender: ' + response[0]['GENDER'])
    d3.select('#metaList').append('li').text('Location: ' + response[0]['LOCATION'])
    d3.select('#metaList').append('li').text('Sample ID: ' + response[0]['SAMPLEID'])
    d3.select('#metaList').append('li').text('Age: ' + response[0]['age'])

    })  //Closes Plotly.d3.json(endPoint)

};




function graphPieData(response){

    var dataPie = [{
        values: response['sample_values'],
        labels: response['otu_ids'],
        type: 'pie'
    }];

    var layoutPie = {
        height: 500,
        width: 800
    };

Plotly.plot('pie', dataPie, layoutPie);
};





function graphBubbleData(response){
    sizeList = []
    for (var i = 0; i < response['sample_values'].length; i++){
        sizeList.push(100 * response['sample_values'][i])
    };

    var trace = {
        x: response['otu_ids'],
        y: response['sample_values'],
        mode: 'markers',
        marker: {
            size: [sizeList],
        }
    };

    var data = [trace];

    var layout = {
          title: 'Bubble Chart of the Bacteria Distrubution (all data)',
          showlegend: false,
          height: 600,
          width: 600
        };
Plotly.plot('bubble', data, layout);
};


function clearPage(){

    //https://stackoverflow.com/questions/22593759/how-do-i-clear-inner-html
    document.getElementById("metaList").innerHTML = ""
    document.getElementById("pie").innerHTML = ""
};


function getData() {

        clearPage()

        sampleValue = document.getElementById("selDataset").value;

        var endPoint = '/api/v1/metadata/' + sampleValue.split('_')[1]

        apiCallMetaData(endPoint)

        var endPointSampleData = '/api/v1/samples/' + sampleValue

        Plotly.d3.json(endPointSampleData, function(error, response) {

            if (error) return console.warn(error);

            graphPieData(response)
            graphBubbleData(response)

        })


};
