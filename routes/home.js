var express = require('express');
var router = express.Router();


// Require our controllers.
var timesheet_controller = require('../controllers/timesheetController'); 


/// BOOK ROUTES ///

// GET home page.
router.get('/', timesheet_controller.index); 