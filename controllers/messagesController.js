var User = require('../models/user');

// Display all messages
exports.manager_messages = function(req, res) {
    res.render('manager_messages');
};

// Display all messages
exports.employee_messages = function(req, res) {
    res.render('employee_messages');
};

exports.manager_settings_get = function(req, res) {
    User.find()
    .exec(function (err, users) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('manager_settings', {title: 'Settings', user_list: users } );
    });
};