var promise = require('bluebird'); // http://bluebirdjs.com/docs/getting-started.html
var pgp = require('pg-promise')(options); // https://github.com/vitaly-t/pg-promise

var options = {
  promiseLib: promise // initialization options
};

var connectionString = process.env.DATABASE_URL || 'postgres://postgres:january2017*@127.0.0.1/projects'; // Heroku postgres OR local host postgres inventory database @localhost:5432
var db = pgp(connectionString); // using pg-promise, create database with connection details

function about(req, res, next){
  res.render('index', {page: 'about', title: '', body: ''})
}

function work(req, res, next){
  res.render('index', {page: 'work', title: '', body: ''})
}

function blog(req, res, next){
  res.render('index', {page: 'blog', title: '', body: ''})
}

function contact(req, res, next){
  res.render('index', {page: 'contact', title: '', body: ''})
}

function home(req, res, next){
  res.render('index', {page: 'home', title: '', body: ''})
}

// this Express middleware function gets the data based on the url request
function getData(req, res, next) {
  var geom = [], // to store the geometry 
      geojson = [], // to store the complete geojsons
      city = req.params.id; // to store the city requested from user
  // for each row in the database select the geometry and building type and centroid from the city's table
  db.each('select ST_AsGeoJSON(wkb_geometry)::json as geometry, type as type, ST_Area(wkb_geometry::geography) as area from ' + city, [], row => {
    var featureType = row.geometry.type, // store the feature type (e.g., polygon, point)
        buildingType = row.type; // store the building type

    // if the feature is a polygon
    if (featureType == "Polygon") {
      // create a single geojson's geometry and properties for the given row 
      var data = {
        'type': 'Feature',
        'geometry': row.geometry,
        'properties': {
          'building': row.type,
          'area': row.area
        }
      }
      geom.push(data); // push the geojson geometry and properties data in the geom array 
    }
  })
    .then(function () { // then create a complete feature collection from all the geojson geometry and properties
      var data = {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': geom
        }
      }
      geojson.push(data)
    })
    .then (function (data) {
      res.send(geojson); // this will send the final geojson feature collection to the client
    })
    .catch(function (err) {
      return next(err);
    });
}

// add query functions to app 
module.exports = {
  about: about,
  work: work,
  contact: contact,
  blog: blog,
  home: home,
  getData: getData
};
