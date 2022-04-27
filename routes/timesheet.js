var express = require('express');
var router = express.Router();

// Require our controllers.
var timesheet_controller = require('../controllers/timesheetController'); 

// Redirects /timesheet to /timesheet/today
router.get('/', function(req, res) {
    res.redirect('/timesheet/today');
  });

// GET list of shifts today page
router.get('/shifts', timesheet_controller.timesheet_tester);

// GET timesheet today page
router.get('/today', timesheet_controller.timesheet_today);

// GET timesheet individual page
router.get('/individual', timesheet_controller.timesheet_individual);

// GET timesheet department page
router.get('/department', timesheet_controller.timesheet_department);

// GET timesheet create page
router.get('/create', timesheet_controller.shift_create);

// POST request for creating shift
router.post('/create', timesheet_controller.shift_create_post);


module.exports = router;