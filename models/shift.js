var mongoose = require('mongoose')
const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

var ShiftSchema = new Schema({
    date: { type: Date, default: Date.now, required: true},
    timestart: {type: String, required: true, maxlength: 100},
    timeend: {type: String, required: true, maxlength: 100},
    user: { type: Schema.ObjectId, ref: 'User', required: true }, // Reference to the associated user.
});

// Virtual for this shift URL.
ShiftSchema
.virtual('url')
.get(function () {
  return '/timesheet/today/';
});

ShiftSchema
.virtual('dd')
.get(function() {
  return this.date.getDate(); // return shifts day of the month
})

ShiftSchema
.virtual('month')
.get(function() {
  return this.date.getMonth() + 1; // return month
})

ShiftSchema.virtual('date_yyyy_mm_dd').get(function() {
  return DateTime.fromJSDate(this.date).toISODate(); //format 'YYYY-MM-DD'
});


// Export model.
module.exports = mongoose.model('Shift', ShiftSchema);