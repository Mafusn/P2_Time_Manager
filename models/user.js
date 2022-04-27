var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String, required: true, maxlength: 100},
    position: {type: String, required: true, enum: ['Employee', 'Manager'], default: 'Employee'},
    absence: {type: Date}
});

// Virtual for this user instance URL.
UserSchema
.virtual('url')
.get(function () {
    return '/profile' + this.id;
});

// Export model.
module.exports = mongoose.model('User', UserSchema);
