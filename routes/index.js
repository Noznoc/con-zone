var express = require('express'); // defining the Express application
var router = express.Router(); // defining the router, which define an app behavior when a specific reuest is received

db = require('../queries');

router.get('/', db.home);
router.get('/contact', db.contact);
router.get('/blog', db.blog);
router.get('/projects', db.projects);
router.get('/about', db.about);
router.get('/blog/:id', db.blog_post);

module.exports = router;