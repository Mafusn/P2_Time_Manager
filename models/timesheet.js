var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShiftSchema = new Schema({
    name: {type: Date, default: Date.now}
});

// Virtual for this genre instance URL.
ShiftSchema
.virtual('url')
.get(function () {
  return '/timesheet/today/';
});

// Export model.
module.exports = mongoose.model('Shift', ShiftSchema);
