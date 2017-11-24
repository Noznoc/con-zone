function salkantay() {	
	mapboxgl.accessToken = "pk.eyJ1IjoianVsY29ueiIsImEiOiJjaWo1eHJqd2YwMDFkMXdtM3piZndjNzlxIn0.3fMbo8z3SxitKnkoNkZ2jw"; // access token for Mapbox API

	var map = new mapboxgl.Map({
		container: "post-map",
		style: "mapbox://styles/julconz/cj95rwbpt16tk2rnzmnlslw5h",
		center: [-72.5679, -13.3038],
		zoom: 8.66,
		logoPosition: 'bottom-right',
		hash: true,
		maxBounds: [-73.688221,-13.917572,-71.716175,-12.712186]
	});

	var panTo = [
		[8.53, [-72.6271, -13.3156], 'day0'],
		[16.22, [-71.98387, -13.52048], 'day0'],
		[15.77, [-72.1987, -13.3302], 'day0'],
		[15.19, [-72.1594, -13.2994], 'day0'],
		[15.08, [-71.9823, -13.5284], 'day0'], 
		[15.75, [-72.5293, -13.5084], 'day1'], 
		[16.37, [-72.55098, -13.4875], 'day1'], 
		[14.43, [-72.5555, -13.4546], 'day1'], 
		[15.25, [-72.5767, -13.3864], 'day1'], 
		[16.25, [-72.58545, -13.37843], 'day1'], 
		[17.37, [-72.58572, -13.38159], 'day1'],
		[15.15, [-72.5642, -13.3689], 'day2'],
		[15.2, [-72.5639, -13.3618], 'day2'], 
		[15.3, [-72.5683, -13.3477], 'day2'],
		[14.64, [-72.5937, -13.3331], 'day2'], 
		[15.15, [-72.6117, -13.3217], 'day2'],
		[15.15, [-72.639, -13.3127], 'day2'],
		[17.53, [-72.66543, -13.32498], 'day2'],
		[15.49, [-72.6694, -13.3247], 'day3'],
		[16.64, [-72.67162, -13.31695], 'day3'],
		[13.86, [-72.6706, -13.3009], 'day3'],
		[15.39, [-72.6517, -13.2966], 'day3'],
		[15.32, [-72.6319, -13.2303], 'day3'],
		[15.66, [-72.619, -13.2133], 'day3'],
		[11.42, [-72.6338, -13.088], 'day3'],
		[14.03, [-72.5947, -13.1853], 'day4'],
		[15.59, [-72.5766, -13.1875], 'day4'],
		[16.83, [-72.55786, -13.17476], 'day4'],
		[14.85, [-72.5559, -13.1609], 'day4'],
		[15.42, [-72.526, -13.1538], 'day4'],
		[18.23, [-72.54348, -13.16516], 'day5'],
		[16.8, [-72.54603, -13.16334], 'day5'],
		[16.83, [-72.5437, -13.1674], 'day5'],
		[16.24, [-72.53599, -13.16906], 'day5']
	];

	$(".mapboxgl-canvas").removeAttr("style")

	var i = 0;

	$(".map-button").on("click", function(e){
		$(".post-map-legend").find('p').html('');
		$(".post-map-legend").find('img').hide();

		if (e.delegateTarget.id == "forward") {
			i++;
			map.flyTo({
				center: panTo[i][1], 
				zoom: panTo[i][0],
				speed: 0.8,
				curve: 1,
				easing(t) {
					return t;
				}
			});
		}
		if (e.delegateTarget.id == "backward") {
			i--;
			map.flyTo({
				center: panTo[i][1], 
				zoom: panTo[i][0]
			});
		}

		map.on('render', function(){
			var features = map.queryRenderedFeatures({ layers: [panTo[i][2] + '-points'] });
			popup(features, i);	
		});
	});

	function popup(features, i){
		if (features.length){
			if (features[0].properties.id.charAt(3) !== '0') {
				$(".post-map-legend").find('p').html('DAY ' + features[0].properties.id.charAt(3) + ': ' + features[0].properties.description);
			} else {
				$(".post-map-legend").find('p').html('OCTOBER 7-8: ' + features[0].properties.description);
			}
			if (i !== 0){
				$('.image').replaceWith(function() {
					return $("<img class='image-medium image' src='/images/" + features[0].properties.id + ".jpg'>");
			    })
			} else {
				$('.image').replaceWith(function() {
					return $("<video class='image-round image' src='/images/day0_0.mp4' autoplay>");
			    })
			}
		}
	}
}