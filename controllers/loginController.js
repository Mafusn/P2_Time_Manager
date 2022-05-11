var User = require('../models/user');
var async = require('async');


// Display User login on GET.
exports.user_login_get = function(req, res, next) {
    res.render('login');
};

// Handle user login on POST
exports.user_login_post = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;


    User.findOne({username: username, password: password}, function(err, user){
        if (err) {
            console.log(err);
            return res.status(500).send();
        }

        if (!user) {
            res.redirect('/login');
        } else if (user.position === 'Manager') {
            res.redirect('/manager')
        } else {
            res.redirect('/employee');
        }
    })
};