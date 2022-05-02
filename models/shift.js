var mongoose = require('mongoose')
const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

var ShiftSchema = new Schema({
    date: {type: Date, default: Date.now},
    user: { type: Schema.ObjectId, ref: 'User', required: true }
});

// Virtual for this shift URL.
ShiftSchema
.virtual('url')
.get(function () {
  return '/timesheet/today/';
});

ShiftSchema.virtual('date_yyyy_mm_dd').get(function() {
  return DateTime.fromJSDate(this.date).toISODate(); //format 'YYYY-MM-DD'
});


// Export model.
module.exports = mongoose.model('Shift', ShiftSchema);