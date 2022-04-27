var express = require('express');
var router = express.Router();

// Require our controllers.
var messages_controller = require('../controllers/shiftManagementController'); 

// GET Message page
router.get('/', messages_controller.index);

module.exports = router;