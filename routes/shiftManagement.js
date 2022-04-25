var express = require('express');
var router = express.Router();

// Require our controllers.
var shiftManagement_controller = require('../controllers/shiftManagementController'); 

// Redirects /shift-management to /shift-management/available-shifts
router.get('/', function(req, res) {
    res.redirect('/shift-management/available-shifts');
  });

// GET available shifts page
router.get('/available-shifts', shiftManagement_controller.shiftmanagement_available_shifts);

// GET swap shifts page
router.get('/swap-shifts', shiftManagement_controller.shiftmanagement_swap);

// GET absence page
router.get('/absence', shiftManagement_controller.shiftmanagement_absence);

// GET shift management page
router.get('/manage-shifts', shiftManagement_controller.shiftmanagement_manage_shifts);

module.exports = router;