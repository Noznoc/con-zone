// function for the map
function addMap(center, zoom, minZoom, maxZoom, coordinates, source, cluster, id){

	mapboxgl.accessToken = "pk.eyJ1IjoianVsY29ueiIsImEiOiJjaWo1eHJqd2YwMDFkMXdtM3piZndjNzlxIn0.3fMbo8z3SxitKnkoNkZ2jw"; // access token for Mapbox API

	// create map, define certain options
	var map = new mapboxgl.Map({
		container: "header-map",
		style: "mapbox://styles/julconz/cj5qwq4al26aw2so9t7m40srp",
		center: center,
		zoom: zoom,
		maxZoom: maxZoom,
		minZoom: minZoom,
		dragRotate: false,
		logoPosition: 'bottom-right'
	});

	map.on('load', function() {

		if (source) {
			for (var i in coordinates) {
				coordinates[i] = JSON.parse('{"type":"Feature","properties":{"description":"' + coordinates[i][1] + '"},"geometry":{"type":"Point","coordinates":[' + coordinates[i][0] + ']}}');
			}
			addData(coordinates, cluster);
		}

		var geojson = [];
		var features = [];
		var	i = 1;

		if (source == false) {
			$.get(coordinates, function(data) {
				for (i in data) {
					if(data[i].geoJSON !== undefined) {
						data[i].geoJSON.coordinates = [data[i].geoJSON.coordinates[1], data[i].geoJSON.coordinates[0]]
						geojson.push([data[i].magnitude, data[i].geoJSON, data[i].origin_time]);
					}
				}

				for (var j in geojson){
					if (geojson[j][0] !== undefined){
						features.push(JSON.parse('{"type":"Feature","properties":{"description":"' + geojson[j][0] + ' Magnitude", "date":"' + geojson[j][2] + '"},"geometry":{"type":"Point","coordinates":[' + geojson[j][1].coordinates + ']}}'));
					}
				}
				addData(features, cluster);
			});
		}

		if (id == "blog"){
			map.setLayoutProperty("city", "visibility", "visible");
		}

		if (id == "docs"){
			map.setLayoutProperty("vancouver-crime", "visibility", "visible");
		}
		
		function addData(coordinates, cluster){
			var test = map.addSource("points", {
				type: "geojson",
				data: {
					"type": "FeatureCollection",
					"features": coordinates
				},
				cluster: cluster,
				clusterMaxZoom: 20, // Max zoom to cluster points on
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
							[2, "#3f2d34"],
							[4, "#3f2d34"],
							[6, "#3f2d34"],
							[8, "#3f2d34"],
							[10, "#3f2d34"]
						]
					},
					"circle-radius": {
						property: "point_count",
						type: "interval",
						stops: [
							[2, 10],
							[5, 15],
							[7, 20],
							[10, 25]
						]
					}
				}
			});			

			map.on("click", "layer", function(e) {
				if (cluster) {
					new mapboxgl.Popup()
						.setLngLat(e.features[0].geometry.coordinates)
						.setHTML(e.features[0].properties.description)
						.addTo(map);
				} else {
					new mapboxgl.Popup()
						.setLngLat(e.features[0].geometry.coordinates)
						.setHTML(e.features[0].properties.description + "<br>" + e.features[0].properties.date.split("T")[0])
						.addTo(map);
				}
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
	    			$("#header-map").animate({height: toggleContainer}, function(){
					    map.resize();
					});
		    		$(this).hide();
		    		map.panTo(points._data.features[i].geometry.coordinates);
		    		i += 1;
		    		$("#legend").find('h4').html("<i id='window-restore' class='fa fa-window-restore icon small' aria-hidden='true'></i><p>Click forward or back to continue slide show</p><i id='play-back' class='fa fa-step-backward icon' aria-hidden='true'></i><i id='play-forward' class='fa fa-step-forward icon' aria-hidden='true'></i>");
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
					$("#header-map").animate({height: toggleContainer}, function(){
					    map.resize();
					});
					$("#legend").find('h4').html(legend);
			    });
		    });
		}
	});
}