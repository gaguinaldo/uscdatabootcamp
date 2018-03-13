// //Create an initial map object by setting the lat and long and the start/zoom levels

// var mymap = L.map('map', {
//     center: [45.5231, -122.6765], //Center at Portland
//     zoom: 13

// });

// //Adding a tile layer to the our mapbox.
// //Use the addTo method to add objects to the map.
// L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/' +
//     '{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3JhbnRhZ3VpbmFsZG8iLCJhIjoiY2plbHBnZ3NnNGxodzJ3cWU4Z3NtOWVnbyJ9' +
//     '.jp4qDIfhOO-GkoeSvRm-0Q').addTo(mymap);


// //Add marker on Map around Powell's Books in Portland
// var marker = L.marker([45.5206712506, -122.675615631], {
//     draggable: true,
//     title:  'My First Marker'
// }).addTo(mymap);

// marker.bindPopup('Hello There');


// //Create a circle around a center point.
// L.circle([45.52, -122.69], {
//     color: 'green',
//     fillColor: 'green',
//     fillOpacity: '0.75',
//     radius: 500
// }).addTo(mymap)

// //Create a polygon on the map.
// L.polygon([
//     [45.54, -122.68],
//     [45.55, -122.68],
//     [45.55, -122.66]
//     ],{
//         color: 'yellow',
//         fillColor: 'yellow',
//         fillOpacity: 0.75,


// }).addTo(mymap)

//**********************************************************************************

/*
Research how to find the population of a city based on the lat and long.
Create a list of the lat and long that we're interested in.
Create a list of the populations based on the cities that we're intersted in.
Use a for-loop to render the data into leaflet and place on the map.

Lincon NE = [40.806862, -96.681679]
NEpopulation = [10]
NYC = [40.785091, -73.968285]
NYCpopulation = [100]
LA = [34.052235 -118.243683]
LApopulatin = [30]

centerUS = [41.850033, -87.6500523]

Another option is to create a json of all of the data and then iterate through the json.
*/

var mymap = L.map('map', {
    center: [39.8097343, -98.5556199],
    zoom: 4
});

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/' +
    '{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3JhbnRhZ3VpbmFsZG8iLCJhIjoiY2plbHBnZ3NnNGxodzJ3cWU4Z3NtOWVnbyJ9' +
    '.jp4qDIfhOO-GkoeSvRm-0Q').addTo(mymap);

var cities = [[40.806862, -96.681679], [40.785091, -73.968285], [34.052235, -118.243683]];

var names = ['Los Angeles', 'Nebraska', 'New York City']

for (var i = 0; i < cities.length; i++){

    var marker = L.marker(cities[i], {
    draggable: true,
    title:  'My First Marker'
    }).addTo(mymap);

    marker.bindPopup(names[i]);

}

// ************************************
// //This is a another way of doing this exercise, if it assumed that the data comes in as a json
// //city is a json
// for (var i = 0; i < cities.length; i++){
//     var city = cities[i]
//     L.marker(city.location).bindPopup("<h1>" + city.name + "</h1><hr>" + "<h3>" + city.population + '</h3>')
// }
// ************************************

