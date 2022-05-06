var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstname: {type: String, required: true, maxlength: 100},
    lastname: {type: String, required: true, maxlength: 100},
    username: {type: String, required: true, maxlength: 100},
    password: {type: String, required: true, maxlength: 100},
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
