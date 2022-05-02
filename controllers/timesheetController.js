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
    User.find()
      .sort([['username', 'ascending']])
      .exec(function (err, list_users) {
        if (err) { return next(err); }
        // Successful, so render
        res.render('timesheet_create', { title: 'Timesheet list', user_list: list_users });
      });
  
  };

// Handle User create on POST.
exports.shift_create_post = [

  // Validate and sanitize fields.
  body('date', 'Invalid date').optional({checkFalsy: true }).isISO8601().toDate(),

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);
      
      // Create Shift object with escaped and trimmed data
      var shift = new Shift(
          {
              date: req.body.date,
          }
      );

      if (!errors.isEmpty()) {
          // There are errors. Render form again with sanitized values/errors messages.
          res.render('timesheet_create', { title: 'Create shift', shift: shift, errors: errors.array() });
          return;
      }
      else {
          // Data from form is valid.

          // Save author.
          shift.save(function (err) {
              if (err) { return next(err); }
              // Successful - redirect to home page.
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

// Display time schedule for the department
exports.timesheet_department = function(req, res) {
    res.render('timesheet_department')
};