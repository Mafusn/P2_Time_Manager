var User = require('../models/user');
var Shift = require('../models/shift');
var NoticeBoard = require('../models/noticeboard');
var async = require('async');
const { body,validationResult } = require('express-validator');

exports.employee_index = function(req,res,next) {
    NoticeBoard.findById('627b9e6d381a8e68176bc15d')
      .populate('notes')
      .exec(function (err, noticeboard) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('employee_index', { title: 'Home Page', noticeboard: noticeboard });
      });
}

exports.manager_index = function(req,res,next) {
    NoticeBoard.findById('627b9e6d381a8e68176bc15d')
      .populate('notes')
      .exec(function (err, noticeboard) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('manager_index', { title: 'Home Page', noticeboard: noticeboard });
      });
}

// Handle User create on POST.
exports.manager_index_post = [

    // Validate and sanitize fields.
    body('notes').trim().escape(),
  
    // Process request after validation and sanitization.
    (req, res, next) => {
  
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create Shift object with escaped and trimmed data
        var noticeboard = new NoticeBoard (
          {
              notes: req.body.notes,
              _id: '627b9e6d381a8e68176bc15d'
          }
      );
  
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values and error messages.
        User.find({}, 'username')
            .exec(function (err, users) {
                if (err) { return next(err); }
                // Successful, so render.
                res.render('/manager', { title: 'Home Page', user_list: users, selected_user: shift.user._id, errors: errors.array(), shift: shift });
        });
        return;
    }
    else {
        // Data from form is valid
        NoticeBoard.findByIdAndUpdate('627b9e6d381a8e68176bc15d', noticeboard, function (err, theshift) {
            if (err) { return next(err); }
               // Successful - redirect to new record.
               res.redirect('/manager');
            });
    }
  }
  ];


// Display User create form on GET.
exports.user_create_get = function(req, res, next) {
    res.render('userCreate', {title: 'Create new user'});
};

// Handle User create on POST.
exports.user_create_post = [

    // Validate and sanitize fields.
    body('username').trim().isLength({ min: 1 }).escape().withMessage('Username must be specified.'),
    body('firstname').trim().isLength({ min: 1 }).escape().withMessage('Username must be specified.'),
    body('lastname').trim().isLength({ min: 1 }).escape().withMessage('Username must be specified.'),
    body('password').trim().isLength({ min: 1 }).escape().withMessage('Password must be specified.'),
    body('position').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create Author object with escaped and trimmed data
        var user = new User(
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: req.body.password,
                position: req.body.position
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('userCreate', { title: 'Create User', user: user, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save user.
            user.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new user record.
            });
            NoticeBoard.findById('627b9e6d381a8e68176bc15d')
            .populate('notes')
            .exec(function (err, noticeboard) {
                if (err) { return next(err); }
                //Successful, so render
                res.render('manager_index', { title: 'Home Page', noticeboard: noticeboard });
            });
        }
    }
];


// Display User create form on GET.
exports.manager_user_get = function(req, res, next) {

    User.findById(req.params.id)
    .exec(function (err, user) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('profile_page', {title: 'Settings', user: user } );
    });

};