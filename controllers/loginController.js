var User = require('../models/user');
var async = require('async');


// Display User login on GET.
exports.user_login_get = function(req, res, next) {
    res.render('login');
};

exports.user_login_post = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username, password: password}, function(err, user){
        if (err) {
            console.log(err);
            return res.status(500).send();
        }

        if (!user) {
            res.render('login');
        }

        req.session.user = user;
        
        res.render('index');
    })
};