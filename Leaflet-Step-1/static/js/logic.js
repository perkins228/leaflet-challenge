var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
d3.json(queryUrl, function(data) {
    console.log(data.features)
    createFeatures(data.features);
});

function createFeatures(eqData){
    function onEachFeature(feature, layer){
        layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    };

    var earthquakes = L.geoJSON(eqData, {
        onEachFeature: onEachFeature
      });

    function chooseSize(magnitude){
        return magnitude * 50000
    }

    function chooseColor(depth){
        if (depth < 10) {
        color = "#80ff00";
        }
        else if(depth < 30) {
        color = "#bfff00";
        }
        else if(depth < 50) {
        color = "#ffff00";
        }
        else if(depth < 70) {
        color = "#ffbf00";
        }
        else if(depth < 90) {
        color = "#ff8000";
        }
        else {
        color = "#ff0000";
        }
    }
    function setStyle(feature){
        fillOpacity: 0.5,
        color: chooseColor(feature.geometry.coordinates[2]),
        fillColor: chooseColor(feature.geometry.coordinates[2]),
        // Adjust radius
        radius: chooseSize(feature.properties.mag)
      }
    
    var earthquakes = L.geoJSON(eqData, {
        pointToLayer: function (feature, latlng) {
            return L.circle(latlng, eqMarker).bindPopup("<h3>" + eqData[i].properties.place +
            "</h3><hr><p>" + new Date(eqData[i].properties.time) + "</p>");;
        }
    });
}
    createMap(earthquakes);

}   
 

function createMap(earthquakes){
   
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
    });

    var baseMaps = {
        "Street Map": streetmap
    };

    var overlayMaps = {
        Earthquakes: earthquakes
    };

    var myMap = L.map("map", {
        center: [39.739, -104.99],
        zoom: 3,
        layers: [streetmap, earthquakes]
        });
    
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
}