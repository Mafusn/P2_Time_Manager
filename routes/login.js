var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login');
});

// Get login page
router.get('/login', user_controller.user_login_get);

// Login thing
router.post('/login', user_controller.user_login_post);

module.exports = router;