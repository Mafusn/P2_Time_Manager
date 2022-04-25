var express = require('express');
var router = express.Router();

// Require our controllers.
var shiftManagement_controller = require('../controllers/shiftManagementController'); 

// GET timesheet page
router.get('/', shiftManagement_controller.index);

module.exports = router;