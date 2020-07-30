const express = require('express'); // defining the Express application
const router = express.Router(); // defining the router, which define an app behavior when a specific reuest is received
const mods = require('../modules');

router.get('/', mods.home);
router.get('/blog', mods.blog);
router.get('/projects', mods.projects);
router.get('/about', mods.about);
router.get('/blog/:id', mods.getData);
router.get('/docs', mods.docs);
router.get('/docs/:id', mods.getData);

module.exports = router;
