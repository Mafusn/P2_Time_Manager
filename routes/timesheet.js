var express = require('express');
var router = express.Router();

// Require our controllers.
var timesheet_controller = require('../controllers/timesheetController'); 

// GET timesheet page
router.get('/', timesheet_controller.index);

router.get('/timesheet-today', timesheet_controller.timesheet_today);


module.exports = router;