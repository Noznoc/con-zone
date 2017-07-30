// function for the map
function addMap(center, zoom, coordinates){

	mapboxgl.accessToken = "pk.eyJ1IjoianVsY29ueiIsImEiOiJjaWo1eHJqd2YwMDFkMXdtM3piZndjNzlxIn0.3fMbo8z3SxitKnkoNkZ2jw"; // access token for Mapbox API

	// create map, define certain options
	var map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/julconz/cj5qwq4al26aw2so9t7m40srp",
		center: center,
		zoom: zoom,
		maxZoom: 14,
		minZoom: 2
	});

	for (var i in coordinates){
		coordinates[i] = JSON.parse('{"type":"Feature","geometry":{"type":"Point","coordinates":[' + coordinates[i] + ']}}');
	}

	console.log(coordinates)

	map.on('load', function() {
		map.addSource("points", {
			"type": "geojson",
			"data": {
				"type": "FeatureCollection",
				"features": coordinates
			}
		});
		map.addLayer({
			"id": "layer",
			"type": "circle",
			"source": "points",
			"paint": {
				"circle-radius": 8,
				"circle-color": "#7c1f44"
			}
		});
	});
}