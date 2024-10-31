  // Set Geojson url to a variable
// let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

//   // Perform a GET request to the query URL/
// d3.json(url).then(function (data) {
//   // Once we get a response, send the data.features object to the createFeatures function.
//   createMarkers(data.features);
// });


// function createMarkers(earthquakeData) {
//   console.log("each earthquake")
//   console.log(earthquakeData)
let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';


d3.json(url).then(function(response) {
  console.log(response)
  let earthquakeData = response.features
  console.log(earthquakeData)
  for (let index = 0; index < earthquakeData.length; index++) {
    let earthquake = earthquakeData[index];
    console.log(earthquake.geometry.coordinates)

    let marker = L.circleMarker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
      color: earthquake.geometry.coordinates[2], // Circle color
       // HEX color code
      fillOpacity: 0.7, // Set the fill opacity 
      radius: earthquake.properties.mag * 5
    }).addTo(myMap)

    marker.bindPopup(`Magnitude: ${earthquake.properties.mag}<hr> Place: ${(earthquake.properties.place)}<hr> Depth: ${(earthquake.properties.dmin)}<hr>`);

  }
});
 