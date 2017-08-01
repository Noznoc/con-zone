// function for the map
function addMap(center, zoom, minZoom, coordinates){

	mapboxgl.accessToken = "pk.eyJ1IjoianVsY29ueiIsImEiOiJjaWo1eHJqd2YwMDFkMXdtM3piZndjNzlxIn0.3fMbo8z3SxitKnkoNkZ2jw"; // access token for Mapbox API

	// create map, define certain options
	var map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/julconz/cj5qwq4al26aw2so9t7m40srp",
		center: center,
		zoom: zoom,
		maxZoom: 14,
		minZoom: minZoom
	});

	for (var i in coordinates){
		coordinates[i] = JSON.parse('{"type":"Feature","properties":{"description":"' + coordinates[i][1] + '"},"geometry":{"type":"Point","coordinates":[' + coordinates[i][0] + ']}}');
	}

	map.on('load', function() {
		var markers = map.addSource("points", {
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

		map.on("click", "layer", function (e) {
	        new mapboxgl.Popup()
	            .setLngLat(e.features[0].geometry.coordinates)
	            .setHTML(e.features[0].properties.description)
	            .addTo(map);
	    });

		map.on("mouseenter", "layer", function () {
	        map.getCanvas().style.cursor = "pointer";
	    });

	    map.on("mouseleave", "layer", function () {
	        map.getCanvas().style.cursor = "";
	    });

	    var i = 0,
	    	points = map.getSource("points");

	    $("#play-circle").on("click", function () {
	    	if (i == 0){
	    		$(this).hide();
	    		map.panTo(points._data.features[i].geometry.coordinates);
	    		i += 1;
	    		$("#legend").find('h4').html("Click forward or back to continue slide show <i id='play-back' class='fa fa-step-backward icon' aria-hidden='true'></i><i id='play-forward' class='fa fa-step-forward icon' aria-hidden='true'></i>");
	    	}
	    	$("#play-back").on("click", function () {
		    	i -= 1;
		    	map.panTo(points._data.features[i].geometry.coordinates);
		    	if (i == 0){
		    		$(this).hide();
		    	} else {
		    		$(this).show();
		    	}
		    });

		    $("#play-forward").on("click", function () {
		    	i += 1;
		    	map.panTo(points._data.features[i].geometry.coordinates);
		    	if (i == points._data.features.length - 1){
		    		$(this).hide();
		    	} else {
		    		$(this).show();
		    	}
		    });
	    });
	});
}