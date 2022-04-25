var express = require('express');
var router = express.Router();

// Require our controllers.
var timesheet_controller = require('../controllers/timesheetController'); 

// Redirects /timesheet to /timesheet/today
router.get('/', function(req, res) {
    res.redirect('/timesheet/today');
  });

// GET timesheet today page
router.get('/today', timesheet_controller.timesheet_today);

// GET timesheet individual page
router.get('/individual', timesheet_controller.timesheet_individual);

// GET timesheet department page
router.get('/department', timesheet_controller.timesheet_department);


module.exports = router;