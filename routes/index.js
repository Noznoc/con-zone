var express = require('express'); // defining the Express application
var router = express.Router(); // defining the router, which define an app behavior when a specific reuest is received

db = require('../queries');

router.get('/', function(req,res){
	res.render('index', {title: 'Hello, my name is Julia Conzon', body: 'In May 2016, I graduated from McGill University, Canada, with a B.A. in Geography and minors in Geographic Information Systems (GIS) and Anthropology. Through my hard work, discpline, and self-motivation I have harnessed a variety of skills in both quantitative/technical and qualitiative/social backgrounds. My work experiences as a freelance web developer and open data consultant has allowed me to develop websites, data visualizations, and web maps. On my spare time, I am active in the open web mapping community, teaching individuals, for example, about OpenStreetMap and Mapbox. My ultimate goal is to reduce the digital divide through opening up data and opening source code for all to use/repurpose.'})
}); 

router.get('/contact', db.contact);
router.get('/blog', db.blog);
router.get('/work', db.work);
router.get('/about', db.about);
router.get('/:id', db.getData);

module.exports = router;