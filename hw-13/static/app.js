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

function getData() {

        sampleValue = document.getElementById("selDataset").value;
        console.log(sampleValue)

        var endPoint = '/api/v1/metadata/' + sampleValue.split('_')[1]

        Plotly.d3.json(endPoint, function(error, response) {
            if (error) return console.warn(error);

            d3.select('ul').append('li').text('BB Type: ' + response[0]['BBTYPE'])
            d3.select('ul').append('li').text('Ethnicity: '+ response[0]['ETHNICITY'])
            d3.select('ul').append('li').text('Gender: ' + response[0]['GENDER'])
            d3.select('ul').append('li').text('Location: ' + response[0]['LOCATION'])
            d3.select('ul').append('li').text('Sample ID: ' + response[0]['SAMPLEID'])
            d3.select('ul').append('li').text('Age: ' + response[0]['age'])

            })  //Closes Plotly.d3.json(endPoint)

        var endPointSampleData = '/api/v1/samples/' + sampleValue
        console.log(endPointSampleData)

        Plotly.d3.json(endPointSampleData, function(error, response) {

            if (error) return console.warn(error);
            console.log(response['otu_ids'])
            console.log(response['sample_values'])

            function graphData(){

                var data = [{
                    values: response['sample_values'],
                    labels: response['otu_ids'],
                    type: 'pie'
                }];

                var layout = {
                    height: 600,
                    width: 800
                };

            Plotly.plot('pie', data, layout);
            }

        graphData()

        })
}
