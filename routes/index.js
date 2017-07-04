var express = require('express'); // defining the Express application
var router = express.Router(); // defining the router, which define an app behavior when a specific reuest is received

db = require('../queries');

router.get('/', db.home);
router.get('/contact', db.contact);
router.get('/blog', db.blog);
router.get('/work', db.work);
router.get('/about', db.about);
router.get('/:id', db.getData);

module.exports = router;