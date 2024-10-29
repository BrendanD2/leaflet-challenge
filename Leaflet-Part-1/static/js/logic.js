let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  // Set Geojson url to a variable
  let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

  // Retrieve the data and get the necessary data values
  d3.json(url).then(function (data){
    console.log(data)
  });

  function createFeatures(earthquakeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the magnitude "mag", location "place", and depth "dmin" of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.mag}</h3><hr><p>${new Date(feature.properties.place)}</h3><hr>${new Date(feature.properties.dmin)}</p>`);
    };
     // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
};
