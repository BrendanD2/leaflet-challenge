// Build the map
let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add map layer from open street map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
// Build URl to geojson
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Build a function to choose the color based on depth value
function chooseColor(value) {
  return value > 90 ? 'red' :
        value > 70 ? 'orangered' :
        value > 50 ? 'orange' :
        value > 30 ? 'yellow' :
        value > 10 ? 'greenyellow' :
                      'green';
};
// Do a d3.json on url and a function to build the markers
d3.json(url).then(function(response) {
  // Console log the response to view the data set
  console.log(response)
  // Set the feature to a variable
  let earthquakeData = response.features
  // View the features of the variable 'earthquake'
  console.log(earthquakeData)
  // Go through each earthquake in the data set
  for (let index = 0; index < earthquakeData.length; index++) {
    // Set the current earthquake to a variable
    let earthquake = earthquakeData[index];
    // Build the marker with the coordinate points, choose color from depth, and the size from the magnitude (multiple by a factor of 5 to increase size)
    let marker = L.circleMarker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
      fillColor: chooseColor(earthquake.geometry.coordinates[2]), // HEX color code
      color: "black",
      weight: 0.5,
      opacity: 0.5,
      fillOpacity: 0.8,
      radius: earthquake.properties.mag * 5
    }).addTo(myMap)
    // Build a pop-up that displays the magnitude, where the earthquake happened, and the depth. 
    marker.bindPopup(`Magnitude: ${earthquake.properties.mag}<hr> Place: ${(earthquake.properties.place)}<hr> Depth: ${(earthquake.geometry.coordinates[2])}<hr>`);
  
  }
  // Create a legend
  let legend = L.control({ position: 'bottomright' });
  
  legend.onAdd = function () {
      let div = L.DomUtil.create('div', 'info legend');
      let depth = [-10, 10, 30, 50, 70, 90];
      //let colors = ['green', 'lightgreen', 'yellow', 'orange', 'orangered', 'red'];
      let labels = [];

    // Loop through the depth and generate a label with a colored square for each
    for (let i = 0; i < depth.length - 1; i++) {
      div.innerHTML +=
        "<div class=\"labels\">" +
        depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        labels.push("<li style=\"background-color: " + chooseColor(depth[i+1]) + "\"></li>");
      }
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
};
legend.addTo(myMap)
});
 