var mongoose = require('mongoose');
const { body,validationResult } = require("express-validator");

// Display all messages
exports.manager_messages = function(req, res) {
    res.render('manager_messages');
};

// Display all messages
exports.employee_messages = function(req, res) {
    res.render('employee_messages');
};