var Shift = require('../models/shift');
var User = require('../models/user');
var async = require('async');
var mongoose = require('mongoose');
const { body,validationResult } = require("express-validator");
const user = require('../models/user');

// Display todays shifts
// Display list of all Authors.
exports.timesheet_tester = function(req, res, next) {
    Shift.find()
      .sort([['date', 'ascending']])
      .exec(function (err, list_shifts) {
        if (err) { return next(err); }
        // Successful, so render
        res.render('timesheet_tester', { title: 'Timesheet list', shift_list: list_shifts });
      });
  
  };

// Display shift create form on GET.
exports.shift_create = function(req, res, next) {
    User.find({},'username')
    .exec(function (err, users) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('timesheet_create', {title: 'Create new shift', user_list: users } );
    });
  
  };

// Handle User create on POST.
exports.shift_create_post = [

  // Validate and sanitize fields.
  body('date', 'Invalid date').isISO8601().toDate(),
  body('user', 'User must be specified').trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);
      
      // Create Shift object with escaped and trimmed data
      var shift = new Shift (
        {
            date: req.body.date,
            user: req.body.user
        }
    );

    if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values and error messages.
        User.find({},'username')
            .exec(function (err, users) {
                if (err) { return next(err); }
                // Successful, so render.
                res.render('timesheet_create', { title: 'Create new shift', user_list: users, selected_user: shift.user._id, errors: errors.array(), shift: shift });
        });
        return;
    }
    else {
        // Data from form is valid
        shift.save(function (err) {
            if (err) { return next(err); }
               // Successful - redirect to new record.
               res.render('index');
            });
    }
  }
];

exports.timesheet_today = function(req, res) {
    res.render('timesheet_today');
};

// Display the individual time schedule
exports.timesheet_individual = function(req, res) {
    res.render('timesheet_individual')
};

// Display timesheet for department on GET.
exports.timesheet_department = function(req, res, next) {

    // Get users and shifts for form.
    async.parallel({
        user: function(callback) {
            User.find(callback)
        },
        shifts: function(callback) {
            Shift.find(callback)
        },

        }, function(err, results) {
            if (err) { return next(err); }
            if (results.user==null) { // No results.
                var err = new Error('No users found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('timesheet_department', { title: 'Timesheet Department', shift_list : results.shifts, user_list: results.user });
        });

};