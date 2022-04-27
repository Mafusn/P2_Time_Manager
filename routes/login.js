var express = require('express');
var router = express.Router();

// Require our controllers.
var login_controller = require('../controllers/loginController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login');
});

// Get login page
router.get('/login', login_controller.user_login_get);

// Login thing
router.post('/login', login_controller.user_login_post);

module.exports = router;