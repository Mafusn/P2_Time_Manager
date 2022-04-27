var User = require('../models/user');
var Shift = require('../models/shift');
var async = require('async');
const { body,validationResult } = require('express-validator');

// Display User create form on GET.
exports.user_create_get = function(req, res, next) {
    res.render('userCreate', {title: 'Create new user'});
};

// Handle User create on POST.
exports.user_create_post = [

    // Validate and sanitize fields.
    //body('username').trim().isLength({ min: 1 }).escape().withMessage('Username must be specified.'),
    //body('password').trim().isLength({ min: 1 }).escape().withMessage('Password must be specified.'),
    //body('position').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create Author object with escaped and trimmed data
        var user = new User(
            {
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
                res.render('index');
            });
        }
    }
];