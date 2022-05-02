var express = require('express');
var router = express.Router();

// Require our controllers.
var user_controller = require('../controllers/userController');

// Redirects /profile to /profile/create
router.get('/', function(req, res) {
    res.render('profile');
  });

// GET user create page
router.get('/create', user_controller.user_create_get);

// POST request for creating user
router.post('/create', user_controller.user_create_post);

module.exports = router;