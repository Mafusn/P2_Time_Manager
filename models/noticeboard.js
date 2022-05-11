var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoticeBoardSchema = new Schema({
    notes: {type: String},
});

// Export model.
module.exports = mongoose.model('NoticeBoard', NoticeBoardSchema);
