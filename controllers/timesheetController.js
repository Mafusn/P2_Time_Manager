var Shift = require('../models/timesheet');
var async = require('async');
var mongoose = require('mongoose');
const { body,validationResult } = require("express-validator");

// Display todays shifts
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