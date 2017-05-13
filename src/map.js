function map(){

    L.mapbox.accessToken = 'pk.eyJ1IjoianVsY29ueiIsImEiOiJjajAxZHdmd3MwNjlxMzNuaHFpbDE0cDU0In0.p27Cm1TX1q05Xzl7jN9lhA';

    var geocoder = L.mapbox.geocoder('mapbox.places'),
        map = L.map('map').setView([49.2496, -123.0016], 10);

    L.tileLayer('https://api.mapbox.com/styles/v1/julconz/cj2cnoq0h002v2rpao8h6wmyl/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsY29ueiIsImEiOiJjaWo1eHJqd2YwMDFkMXdtM3piZndjNzlxIn0.3fMbo8z3SxitKnkoNkZ2jw', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'julconz',
        accessToken: 'pk.eyJ1IjoianVsY29ueiIsImEiOiJjajAxZHdmd3MwNjlxMzNuaHFpbDE0cDU0In0.p27Cm1TX1q05Xzl7jN9lhA'
    }).addTo(map);

    var glocation = ["5287 Malaspina Place, North Vancouver", "1212, Commercial Drive, Vancouver", ];   
        
    for (var i = 0; i < glocation.length; i++){ //for loop that reads through the array's items
        geocoder.query(glocation[i], addMarkers);
    }

    map.scrollWheelZoom.disable();

    function addMarkers(err, data) {
        console.log(data);

        if (data.latlng) {
            //map.setView([data.latlng[0], data.latlng[1]], 13);
            L.mapbox.featureLayer({
                // this feature is in the GeoJSON format: see geojson.org
                // for the full specification
                type: 'Feature',
                properties: {
                        title: data.results.query[0], //this goes into the object and grabs the city name
                        description: 'This is a city in Canada',
                        'marker-size': 'large',
                        'marker-color': '#fff',
                        'marker-symbol': 'restaurant'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [
                      data.latlng[1], data.latlng[0]]
                } 
            }).addTo(map);
        }
    }

}
