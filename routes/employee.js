var express = require('express');
var router = express.Router();

// Require our controllers.
var messages_controller = require('../controllers/messagesController'); 
var user_controller = require('../controllers/userController');
var shiftManagement_controller = require('../controllers/shiftManagementController'); 
var timesheet_controller = require('../controllers/timesheetController'); 

/* GET manager index page. */
router.get('/', function(req, res) {
    res.render('employee_index');
  });

  // GET Message page
router.get('/messages', messages_controller.employee_messages);

// Get settings page
router.get('/settings', function(req, res) {
    res.render('employee_settings');
  });





        /* Profile pages */
// Redirects /profile to /profile/create
router.get('/profile', function(req, res) {
    res.render('employee_profile');
  });

// GET user create page
router.get('/profile/create', user_controller.user_create_get);

// POST request for creating user
router.post('/profile/create', user_controller.user_create_post);





        /* Timesheet pages */
// Redirects /timesheet to /timesheet/today
router.get('/timesheet', function(req, res) {
    res.redirect('/timesheet/today');
  });

// GET timesheet today page
router.get('/timesheet/today', timesheet_controller.employee_timesheet_today);

// GET timesheet individual page
router.get('/timesheet/individual', timesheet_controller.employee_timesheet_individual);

// GET timesheet department page for a week
router.get('/timesheet/department/week', timesheet_controller.employee_timesheet_department_week);

// GET timesheet department page for a month
router.get('/timesheet/department/month', timesheet_controller.employee_timesheet_department_month);




    /* Shift management pages */
// Redirects /shift-management to /shift-management/available-shifts
router.get('/shift-management', function(req, res) {
    res.redirect('/shift-management/available-shifts');
  });

// GET available shifts page
router.get('/shift-management/available-shifts', shiftManagement_controller.employee_shiftmanagement_available_shifts);

// GET swap shifts page
router.get('/shift-management/swap-shifts', shiftManagement_controller.employee_shiftmanagement_swap);

// GET absence page
router.get('/shift-management/absence', shiftManagement_controller.employee_shiftmanagement_absence);

module.exports = router;