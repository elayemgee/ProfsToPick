
var mongoose = require('mongoose');
/*
    TODO:   Complete the TransactionSchema which will contain the name,
            reference number, and the amount of a transaction in the database.
*/

var UserSchema = new mongoose.Schema({
    studentid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
