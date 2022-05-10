var mongoose = require('mongoose');
const { body,validationResult } = require("express-validator");

// Display all messages
exports.messages = function(req, res) {
    res.render('messages');
};