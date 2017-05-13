window.onload = function() {init()}; // Initialize TableTop on window load

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1vmdowAjSUr4F2OjFqH4pJ5PanfwdRi6juVv5nuzqDjs/pubhtml'; // URL for Data Google Sheet 

function init() { // Function that initializes TableTop. Tabletop will pull the data from the Google Sheet that stores all the da
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: showInfo,
                     simpleSheet: true } )
}

function showInfo(data, tabletop) { // Function to show data from Google Sheet

	console.log(data)

    L.mapbox.accessToken = 'pk.eyJ1IjoianVsY29ueiIsImEiOiJjajAxZjBzenUwNjg2MzNxcnNqMmRndHk2In0.c_6Z_kM1Kno651JoOBDOuQ'; // Access token for Mapbox AP


	var map = L.mapbox.map('map', '', { // Creates new map and associated map id
		scrollWheelZoom: false, // Prevents scroll zoom
		center: [25.0321779,121.4850735], // Centers map
		zoom: 11, // Zoom tile level
		minZoom: 11, 
		maxZoom: 20
	});

	//var layer = L.tileLayer.provider('Stamen.Watercolor').addTo(map);

	var tile_layer = L.tileLayer('https://api.mapbox.com/styles/v1/julconz/cj2du5082003a2rp671hlp2lu/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsY29ueiIsImEiOiJjaWo1eHJqd2YwMDFkMXdtM3piZndjNzlxIn0.3fMbo8z3SxitKnkoNkZ2jw').addTo(map);
    var coordinates, // Variable to store coordinates
		marker, // Variable to store markers 
   		popupContent, // Variable to store popup content
   		all_markers = [], // Variable to store all the markers that are created 
   		overlayMaps; // Variable for the legend (seen on the map)

   	// This function creates the markers for the map 
    function addMarkers(data) {
	    for (var i = 0; i < data.length; i++){ // For loop to run through all elements within a province array (e.g., w)
	    	var markerIcon = L.icon({ 
				iconUrl: './images/icon.svg',
				iconSize: [30, 30],
				iconAnchor: [15, 30],
				popupAnchor: [0, -10],
				shadowUrl: '',
				shadowRetinaUrl: '',
				shadowSize: [68, 95],
				shadowAnchor: [22, 94]
			});
			var id = data[i].id,
				description = data[i].description,
				image = data[i].image,
				address = data[i].address,
				name = data[i].name;
			
			// Now that the style is created... if the data has a latitude and longitude value that is not zero (to make sure that a lat/long value exists in the Google Sheet) ,create a marker, a marker popup, and then store it 
    		coordinates = new L.LatLng(data[i].lat, data[i].lng); // Create coordinates from the latitude and longitude 
    		marker = new L.Marker(coordinates, {icon: markerIcon, id: id, address: address, name: name, description: description, riseOnHover: true}); // Create a new marker from the coordinates and style icon. Add values associated with the marker so that it can be accessed with the filters 
    		marker.on('click', onClick)
    		marker.addTo(map) // Push the marker to the all_markers array 
	    	all_markers.push(marker);
	    	function onClick(){
	    		$('.map-menu-text').html("<h3>" + this.options.name + "</h3><p>" + this.options.address + "</p><p>" + this.options.description + "</p>")
	    		//map.setView([marker._latlng.lat, marker._latlng.lng], 20)
	    		map.panTo(new L.LatLng(marker._latlng.lat, marker._latlng.lng));
	    	}
	    }
	    return all_markers;
	}	

	var markers = addMarkers(data); // Store all the markers in the all_markers array
	console.log(markers)
	var i = -1;

    $('#next').on('click', function(){
    	console.log(i)
    	console.log(markers.length)
    	i += 1
		if (i < markers.length){
			map.panTo(new L.LatLng(markers[i]._latlng.lat, markers[i]._latlng.lng));
			$('.map-menu-text').html("<h3>" + markers[i].options.name + "</h3><p>" + markers[i].options.address + "</p><p>" + markers[i].options.description + "</p>")
		} else {
			i = 0
			map.panTo(new L.LatLng(markers[i]._latlng.lat, markers[i]._latlng.lng));
			$('.map-menu-text').html("<h3>" + markers[i].options.name + "</h3><p>" + markers[i].options.address + "</p><p>" + markers[i].options.description + "</p>")
		}
		console.log(i)
		return i;
    });

    $('#back').on('click', function(){
    	console.log(i)
    	console.log(markers.length)
    	i -= 1
    	if (i == 0){
    		map.setZoom(25);
    	}
		if (i < markers.length){
			map.panTo(new L.LatLng(markers[i]._latlng.lat, markers[i]._latlng.lng));
			$('.map-menu-text').html("<h3>" + markers[i].options.name + "</h3><p>" + markers[i].options.address + "</p><p>" + markers[i].options.description + "</p>")
		} else {
			i = 0
			map.panTo(new L.LatLng(markers[i]._latlng.lat, markers[i]._latlng.lng));
			$('.map-menu-text').html("<h3>" + markers[i].options.name + "</h3><p>" + markers[i].options.address + "</p><p>" + markers[i].options.description + "</p>")
		}
		console.log(i)
		return i;
    });

	// This creates a back button on the map so users can easily zoom out 
	L.easyButton('<span class="filterButton">&larrhk;</span>', function(){
		map.setView([23.7304988, 121.5090558], 7)
	}, "Zoom out to Canada").addTo(map);

	/* This creates the content for the map's legend 
	overlayMaps = {
		'<div class="legend"><img src="./images/icon.svg" height="30" width="30"> <strong> Governments </strong></div>': ''
	}; */

	/* This initiates the legend onto the map 
	L.control.layers("",overlayMaps, {
		collapsed: false,
		position: 'topleft'
	}).addTo(map);*/

	/* This modifies the features on the legend to have have checkboxes (only text)
	var checks = document.querySelectorAll('[type = "checkbox"]');
	checks[0].outerHTML = '<div type="checkbox" class="leaflet-control-layers-selector" disabled=""></div>'*/
}