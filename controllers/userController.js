var User = require('../models/user');
var Shift = require('../models/shift');
var async = require('async');
var mongoose = require('mongoose');
const { body,validationResult } = require("express-validator");

// Display User create form on GET.
exports.user_create_get = function(req, res, next) {
    res.render('userCreate', {title: 'Create new user'});
};

// Handle User create on POST.
exports.user_create_post = [

    // Validate and sanitize fields.
    body('name').trim().isLength({ min: 1 }).escape().withMessage('Name must be specified.'),
    body('position').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create Author object with escaped and trimmed data
        var user = new User(
            {
                name: req.body.name,
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

            // Save author.
            user.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.render('index');
            });
        }
    }
];