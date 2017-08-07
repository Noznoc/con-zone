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

	// Add zoom and rotation controls to the map.
	map.addControl(new mapboxgl.NavigationControl());

	map.on('load', function() {

		var markers = [];
		
		// create markers from all the coordinates
		coordinates.forEach(function(coordinates) {
			var el = document.createElement('div');
			el.className = 'marker';
			
			// make a marker for each feature and add to the map
			var marker = new mapboxgl.Marker(el, { offset: [0, -25 / 2] })
				.setLngLat([coordinates[0][0],coordinates[0][1]])
				.setPopup(new mapboxgl.Popup() // add popups
  				.setHTML('<h3>' + coordinates[1] + '</h3>'))
				.addTo(map);

			markers.push(marker);
		})

	    var legend = $("#legend").html();

	    $("#play-circle").on("click", function () {
	    	var i = 0;
	    	if (i == 0){
	    		var toggleContainer = $(".map-container").outerHeight() == 500 ? "200px" : "500px";
    			$(".map-container").animate({height: toggleContainer});
    			$("#map").animate({height: toggleContainer}, function(){
				    map.resize();
				});
	    		$(this).hide();
	    		map.panTo([markers[i]._lngLat.lng,markers[i]._lngLat.lat]);
	    		i += 1;
	    		$("#legend").find('h4').html("<p style='text-align: right; font-size: 10px'><i id='window-restore' class='fa fa-window-restore icon small' aria-hidden='true'></i></p><p>Click forward or back to continue slide show</p><i id='play-back' class='fa fa-step-backward icon' aria-hidden='true'></i><i id='play-forward' class='fa fa-step-forward icon' aria-hidden='true'></i>");
	    	}
	    	$("#play-back").on("click", function () {
		    	i -= 1;
		    	map.panTo([markers[i]._lngLat.lng,markers[i]._lngLat.lat]);
		    });
		    $("#play-forward").on("click", function () {
		    	i += 1;
		    	map.panTo([markers[i]._lngLat.lng,markers[i]._lngLat.lat]);
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