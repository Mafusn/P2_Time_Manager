var Shift = require('../models/shift');
var User = require('../models/user');
var async = require('async');
var mongoose = require('mongoose');
const { body,validationResult } = require("express-validator");
const user = require('../models/user');

// Display shift create form on GET.
exports.shift_create = function(req, res, next) {

    User.find()
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
  body('timestart', 'Invalid time').trim().isLength({ min: 1 }).escape(),
  body('timeend', 'Invalid time').trim().isLength({ min: 1 }).escape(),
  body('user', 'User must be specified').trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);
      
      // Create Shift object with escaped and trimmed data
      var shift = new Shift (
        {
            date: req.body.date,
            timestart: req.body.timestart,
            timeend: req.body.timeend,
            user: req.body.user
        }
    );

    if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values and error messages.
        User.find()
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
               res.redirect('/manager/timesheet/department/week');
            });
    }
  }
];

exports.manager_timesheet_today = function(req, res) {
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
            res.render('manager_timesheet_today', { title: "Today's shifts", shift_list : results.shifts, user_list: results.user});
        });
};

// Display timesheet for department on GET.
exports.manager_timesheet_department_week = function(req, res, next) {

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
            res.render('manager_timesheet_department_week', { title: 'Department schedule', shift_list : results.shifts, user_list: results.user});
        });

};

// Display timesheet for department on GET.
exports.manager_timesheet_department_month = function(req, res, next) {
    
    // Get users and shifts for form.
    async.parallel({
        user: function(callback) {
            User.find(callback)
        },
        shifts: function(callback) {
            Shift.find(callback).sort([['date', 'ascending']])
        },

        }, function(err, results) {
            if (err) { return next(err); }
            if (results.user==null) { // No results.
                var err = new Error('No users found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('manager_timesheet_department_month', { title: 'Department schedule', shift_list : results.shifts, user_list: results.user});
        });

};

// Display timesheet for department on GET.
exports.employee_timesheet_department_week = function(req, res, next) {

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
            res.render('employee_timesheet_department_week', { title: 'Department schedule', shift_list : results.shifts, user_list: results.user});
        });

};

// Display timesheet for department on GET.
exports.employee_timesheet_department_month = function(req, res, next) {
    
    // Get users and shifts for form.
    async.parallel({
        user: function(callback) {
            User.find(callback)
        },
        shifts: function(callback) {
            Shift.find(callback).sort([['date', 'ascending']])
        },

        }, function(err, results) {
            if (err) { return next(err); }
            if (results.user==null) { // No results.
                var err = new Error('No users found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('employee_timesheet_department_month', { title: 'Department schedule', shift_list : results.shifts, user_list: results.user});
        });

};

exports.employee_timesheet_today = function(req, res) {
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
            res.render('employee_timesheet_today', { title: "Today's shifts", shift_list : results.shifts, user_list: results.user});
        });
};

// Display the individual time schedule

exports.employee_timesheet_individual_week = function(req, res) {
    res.render('employee_timesheet_individual_week', { title: 'Your schedule'})
};

exports.employee_timesheet_individual_month = function(req, res) {
    res.render('employee_timesheet_individual_month', { title: 'Your schedule'})
};

exports.manager_timesheet_individual_week = function(req, res) {
    res.render('manager_timesheet_individual_week', { title: 'Your schedule'})
};

exports.manager_timesheet_individual_month = function(req, res) {
    res.render('manager_timesheet_individual_month', { title: 'Your schedule'})
};


// Display detail page for a specific shift.
exports.shift_detail = function(req, res, next) {

    // Get shift and users for form.
    async.parallel({
        shift: function(callback) {
            Shift.findById(req.params.id).populate('user').exec(callback)
        },
        users: function(callback) {
            User.find(callback)
        },

        }, function(err, results) {
            if (err) { return next(err); }
            if (results.shift==null) { // No results.
                var err = new Error('Shift not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('shift_detail', { title: 'Shift details', user_list: results.users, selected_user : results.shift.user.fullname, shift: results.shift });
        });
};

exports.shift_update_get = function(req, res, next) {

    // Get shift and books for form.
    async.parallel({
        shift: function(callback) {
            Shift.findById(req.params.id).populate('user').exec(callback)
        },
        users: function(callback) {
            User.find(callback)
        },

        }, function(err, results) {
            if (err) { return next(err); }
            if (results.shift==null) { // No results.
                var err = new Error('Shift not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('timesheet_create', { title: 'Update Shift', user_list: results.users, selected_user : results.shift.user._id, shift: results.shift });
        });
};

// Handle User create on POST.
exports.shift_update_post = [

    // Validate and sanitize fields.
    body('date', 'Invalid date').isISO8601().toDate(),
    body('timestart', 'Invalid time').trim().isLength({ min: 1 }).escape(),
    body('timeend', 'Invalid time').trim().isLength({ min: 1 }).escape(),
    body('user', 'User must be specified').trim().isLength({ min: 1 }).escape(),
  
    // Process request after validation and sanitization.
    (req, res, next) => {
  
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create Shift object with escaped and trimmed data
        var shift = new Shift (
          {
              date: req.body.date,
              timestart: req.body.timestart,
              timeend: req.body.timeend,
              user: req.body.user,
              _id: req.params.id
          }
      );
  
      if (!errors.isEmpty()) {
          // There are errors. Render form again with sanitized values and error messages.
          User.find({}, 'username')
              .exec(function (err, users) {
                  if (err) { return next(err); }
                  // Successful, so render.
                  res.render('timesheet_create', { title: 'Update shift', user_list: users, selected_user: shift.user._id, errors: errors.array(), shift: shift });
          });
          return;
      }
      else {
          // Data from form is valid
          Shift.findByIdAndUpdate(req.params.id, shift, {}, function (err, theshift) {
              if (err) { return next(err); }
                 // Successful - redirect to new record.
                 res.redirect('/manager/timesheet/department/week');
              });
      }
    }
  ];

// Display shift delete form on GET.
exports.shift_delete_get = function(req, res, next) {

    Shift.findById(req.params.id)
    .populate('user')
    .exec(function (err, shift) {
        if (err) { return next(err); }
        if (shift==null) { // No results.
            res.redirect('/manager/timesheet/department/week');
        }
        // Successful, so render.
        res.render('shift_delete', { title: 'Delete shift', shift:  shift});
    })

};

// Handle shift delete on POST.
exports.shift_delete_post = function(req, res, next) {
    
    // Assume valid shift id in field.
    Shift.findByIdAndRemove(req.body.shiftid, function deleteShift(err) {
        if (err) { return next(err); }
        // Success, so redirect to list of shift items.
        res.redirect('/manager/timesheet/department/week');
        });

};