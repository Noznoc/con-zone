$(function(){

	mapboxgl.accessToken = 'pk.eyJ1IjoianVsY29ueiIsImEiOiJjaWo1eHJqd2YwMDFkMXdtM3piZndjNzlxIn0.3fMbo8z3SxitKnkoNkZ2jw'; // access token for Mapbox API

	// create map, define certain options
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/julconz/cj44ppr9e02ew2sn6ddnqrh3r', // 'mapbox://styles/julconz/cj33i2moc00062rpijkxs89rg', mapbox://styles/julconz/cj2dfnoic002f2rphyv5cs7k1
		center: [-93.2063061, 61.1445745],
		zoom: 3,
		maxZoom: 14,
		minZoom: 3
	});

	// when a city is selected
	$('#cities').on('change', function() {
		var city = this.value, // selected city
			url =  'http://localhost:3000/' + city; // the api url to get the city data
		buildMap(city, url);
	});

	function buildMap(city, url){
		$('#legend').show();
		if (city !== 'Select city') {
			$.getJSON(url, function(data) {
				// add the source
				var geojson = map.addSource(city + "-geojson", {
					'type': 'geojson',
					'data': data[0].data // geojson data from api url
				})

				// add layer from source
				map.addLayer({
					'id': city + '-geojson',
					'type': 'fill',
					'source': city + '-geojson', // use the above geojson source
					'paint': {
						'fill-color': {
							property: 'building',
							type: 'categorical',
							default: '#BB4430',
							stops: [
								['yes', '#7EBDC2']
								//[{zoom: 0, value: 0}, 0],
							]
						}
					}
					//'filter': ['==', 'building', 'yes'], []
				})
				map.on('click', city + '-geojson', function(e){
					$('#legend').html('<h4>Building Type</h4><div><span style="background-color: #7EBDC2"></span>yes<br><span style="background-color: #BB4430"></span>other</div><br><strong>Area </strong>' + round(e.features[0].properties.area, 2) + ' m&sup2;<br><strong>Building type </strong>' + e.features[0].properties.building);
				});
				map.on('mouseenter', city + '-geojson', function () {
				    map.getCanvas().style.cursor = 'pointer';
				});	
			});
		}
	}
	
});