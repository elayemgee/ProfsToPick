
var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    studentid: {
        type: String,
        required: true
    },
    profname: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('reviews', ReviewSchema);
