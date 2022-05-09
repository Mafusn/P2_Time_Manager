var mongoose = require('mongoose')
const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

var ShiftSchema = new Schema({
    date: { type: Date, default: Date.now, required: true},
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

ShiftSchema
.virtual('week')
.get(function() {
  let curr = this.date
  let startdate = new Date(curr.getFullYear(), 0, 1);
  let days = Math.floor((curr - startdate) / (24 * 60 * 60 * 1000))
  let weeknumber = Math.floor((curr.getDay() + days + 1) / 7)

  return weeknumber + 1; // return weeknumber
})

ShiftSchema.virtual('date_yyyy_mm_dd').get(function() {
  return DateTime.fromJSDate(this.date).toISODate(); //format 'YYYY-MM-DD'
});


// Export model.
module.exports = mongoose.model('Shift', ShiftSchema);