
var mongoose = require('mongoose');

/*
    TODO:   Complete the TransactionSchema which will contain the name,
            reference number, and the amount of a transaction in the database.
*/

var ReviewSchema = new mongoose.Schema({
    // your code here
    //Lauren Garcia S13

    //first 3 digits of id number
    reviewer: {
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
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
