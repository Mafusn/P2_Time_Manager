var Shift = require('../models/timesheet');
var async = require('async');
var mongoose = require('mongoose');
const { body,validationResult } = require("express-validator");

// Display all available shifts
exports.shiftmanagement_available_shifts = function(req, res) {
    res.render('shift_management_available_shifts');
};

// Display the page to swap shifts
exports.shiftmanagement_swap = function(req, res) {
    res.render('shift_management_swap_shifts');
};

// Display absence page
exports.shiftmanagement_absence = function(req, res) {
    res.render('shift_management_absence');
};

// Display the page for managing shifts (only available for managers)
exports.shiftmanagement_manage_shifts = function(req, res) {
    res.render('shift_management_manage_shifts');
};