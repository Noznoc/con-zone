// function for the map
function addMap(center, zoom, minZoom, maxZoom, coordinates){

	mapboxgl.accessToken = "pk.eyJ1IjoianVsY29ueiIsImEiOiJjaWo1eHJqd2YwMDFkMXdtM3piZndjNzlxIn0.3fMbo8z3SxitKnkoNkZ2jw"; // access token for Mapbox API

	// create map, define certain options
	var map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/julconz/cj5qwq4al26aw2so9t7m40srp",
		center: center,
		zoom: zoom,
		maxZoom: maxZoom,
		minZoom: minZoom,
		dragRotate: false,
		logoPosition: 'bottom-right'
	});

	map.on('load', function() {

		for (var i in coordinates) {
			coordinates[i] = JSON.parse('{"type":"Feature","properties":{"description":"' + coordinates[i][1] + '"},"geometry":{"type":"Point","coordinates":[' + coordinates[i][0] + ']}}');
		}

			
		map.addSource("points", {
			type: "geojson",
			data: {
				"type": "FeatureCollection",
				"features": coordinates
			},
			cluster: true,
			clusterMaxZoom: 4, // Max zoom to cluster points on
			clusterRadius: 100 // Radius of each cluster when clustering points (defaults to 50)
		});

		map.addLayer({
			id: "layer",
			type: "circle",
			source: "points",
			paint: {
				"circle-color": {
					property: "point_count",
					type: "interval",
					stops: [
						[2, "#7a2d5f"],
						[5, "#7a2d5f"],
						[10, "#7a2d5f"],
					]
				},
				"circle-radius": {
					property: "point_count",
					type: "interval",
					stops: [
						[2, 15],
						[5, 20],
						[10, 25]
					]
				}
			}
		});

		map.addLayer({
			id: "cluster-count",
			type: "symbol",
			source: "points",
			filter: ["has", "point_count"],
			layout: {
				"text-field": "{point_count_abbreviated}",
				"text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
				"text-size": 15,
			},
			paint: {
				"text-color": "#FFF"
			}
		});

		map.addLayer({
			id: "unclustered-point",
			type: "circle",
			source: "points",
			filter: ["!has", "point_count"],
			paint: {
				"circle-radius": 8,
				"circle-color": "#7A2D5F"
			}
		});

		map.on("click", "layer", function(e) {
			new mapboxgl.Popup()
				.setLngLat(e.features[0].geometry.coordinates)
				.setHTML(e.features[0].properties.description)
				.addTo(map);
		});

		map.on("mouseenter", "layer", function() {
			map.getCanvas().style.cursor = "pointer";
		});

	    var legend = $("#legend").html(),
	    	points = map.getSource("points");

	    $("#play-circle").on("click", function () {
	    	var i = 0;
	    	if (i == 0){
	    		var toggleContainer = $(".map-container").outerHeight() == 500 ? "200px" : "500px";
    			$(".map-container").animate({height: toggleContainer});
    			$("#map").animate({height: toggleContainer}, function(){
				    map.resize();
				});
	    		$(this).hide();
	    		map.panTo(points._data.features[i].geometry.coordinates);
	    		i += 1;
	    		$("#legend").find('h4').html("<p style='text-align: right; font-size: 10px'><i id='window-restore' class='fa fa-window-restore icon small' aria-hidden='true'></i></p><p>Click forward or back to continue slide show</p><i id='play-back' class='fa fa-step-backward icon' aria-hidden='true'></i><i id='play-forward' class='fa fa-step-forward icon' aria-hidden='true'></i>");
	    	}
	    	$("#play-back").on("click", function () {
		    	i -= 1;
		    	map.panTo(points._data.features[i].geometry.coordinates);
		    });
		    $("#play-forward").on("click", function () {
		    	i += 1;
		    	map.panTo(points._data.features[i].geometry.coordinates);
		    });
		    $("#window-restore").on("click", function () {
		    	i = 0;
		    	var toggleContainer = $(".map-container").outerHeight() == 200 ? "500px" : "200px";
				$(".map-container").animate({height: toggleContainer});
				$("#map").animate({height: toggleContainer}, function(){
				    map.resize();
				});
				$("#legend").find('h4').html(legend);
		    });
	    });
	});
}