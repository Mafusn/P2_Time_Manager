var Shift = require('../models/timesheet');
var async = require('async');
var mongoose = require('mongoose');
const { body,validationResult } = require("express-validator");

// Display home page.

exports.index = function(req, res) {
    res.render('shiftManagement');
};

// Display list of all Genre.
exports.timesheet_today = function(req, res) {
    res.send('Not implemented yet: Shift management')
};