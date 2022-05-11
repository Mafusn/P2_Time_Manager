var Shift = require('../models/shift');
var async = require('async');
var mongoose = require('mongoose');
const { body,validationResult } = require("express-validator");

// Display all available shifts
exports.manager_shiftmanagement_available_shifts = function(req, res) {
    res.render('manager_shift_management_available_shifts');
};

// Display the page to swap shifts
exports.manager_shiftmanagement_swap = function(req, res) {
    res.render('manager_shift_management_swap_shifts');
};

// Display absence page
exports.manager_shiftmanagement_absence = function(req, res) {
    res.render('manager_shift_management_absence');
};

// Display the page for managing shifts (only available for managers)
exports.shiftmanagement_manage_shifts = function(req, res) {
    res.render('manager_shift_management_manage_shifts');
};

// Display all available shifts
exports.employee_shiftmanagement_available_shifts = function(req, res) {
    res.render('employee_shift_management_available_shifts');
};

// Display the page to swap shifts
exports.employee_shiftmanagement_swap = function(req, res) {
    res.render('employee_shift_management_swap_shifts');
};

// Display absence page
exports.employee_shiftmanagement_absence = function(req, res) {
    res.render('employee_shift_management_absence');
};