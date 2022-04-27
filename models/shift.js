var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShiftSchema = new Schema({
    date: {type: Date, default: Date.now}
});

// Virtual for this shift URL.
ShiftSchema
.virtual('url')
.get(function () {
  return '/timesheet/today/';
});

// Export model.
module.exports = mongoose.model('Shift', ShiftSchema);