var express = require('express');
var router = express.Router();

// Require our controllers.
var messages_controller = require('../controllers/messagesController'); 
var user_controller = require('../controllers/userController');
var shiftManagement_controller = require('../controllers/shiftManagementController'); 
var timesheet_controller = require('../controllers/timesheetController'); 

/* GET manager index page. */
router.get('/', user_controller.manager_index);
router.post('/', user_controller.manager_index_post);

  // GET Message page
router.get('/messages', messages_controller.manager_messages);

// Get settings page
router.get('/settings', messages_controller.manager_settings_get);


        /* Profile pages */
// Redirects /profile to /profile/create
router.get('/profile', function(req, res) {
    res.render('manager_profile');
  });

// GET user create page
router.get('/profile/create', user_controller.user_create_get);

// POST request for creating user
router.post('/profile/create', user_controller.user_create_post);

router.get('/profile/:id', user_controller.manager_user_get)

router.get('/profile/:id/update', user_controller.manager_user_get)
router.post('/profile/:id/update', user_controller.manager_user_get)

router.get('/profile/:id/delete', user_controller.manager_user_get)
router.post('/profile/:id/delete', user_controller.manager_user_get)





        /* Timesheet pages */
// Redirects /timesheet to /timesheet/today
router.get('/timesheet', function(req, res) {
    res.redirect('/timesheet/today');
  });

// GET timesheet today page
router.get('/timesheet/today', timesheet_controller.manager_timesheet_today);

// GET timesheet individual page for a week
router.get('/timesheet/individual/week', timesheet_controller.manager_timesheet_individual_week);

// GET timesheet individual page for a month
router.get('/timesheet/individual/month', timesheet_controller.manager_timesheet_individual_month);

// GET timesheet department page for a week
router.get('/timesheet/department/week', timesheet_controller.manager_timesheet_department_week);

// GET timesheet department page for a month
router.get('/timesheet/department/month', timesheet_controller.manager_timesheet_department_month);

// GET timesheet create page
router.get('/timesheet/create', timesheet_controller.shift_create);

// POST request for creating shift
router.post('/timesheet/create', timesheet_controller.shift_create_post);




    /* Shift management pages */
// Redirects /shift-management to /shift-management/available-shifts
router.get('/shift-management', function(req, res) {
    res.redirect('/shift-management/available-shifts');
  });

// GET available shifts page
router.get('/shift-management/available-shifts', shiftManagement_controller.manager_shiftmanagement_available_shifts);

// GET swap shifts page
router.get('/shift-management/swap-shifts', shiftManagement_controller.manager_shiftmanagement_swap);

// GET absence page
router.get('/shift-management/absence', shiftManagement_controller.manager_shiftmanagement_absence);


// GET shift management page
router.get('/shift-management/manage-shifts', shiftManagement_controller.shiftmanagement_manage_shifts);



    /* Update and delete shifts */
router.get('/timesheet/today/:id', timesheet_controller.shift_detail)

router.get('/timesheet/today/:id/update', timesheet_controller.shift_update_get)
router.post('/timesheet/today/:id/update', timesheet_controller.shift_update_post)

router.get('/timesheet/today/:id/delete', timesheet_controller.shift_delete_get)
router.post('/timesheet/today/:id/delete', timesheet_controller.shift_delete_post)

module.exports = router;