
var mongoose = require('mongoose');

/*
    TODO:   Complete the TransactionSchema which will contain the name,
            reference number, and the amount of a transaction in the database.
*/

var ProfSchema = new mongoose.Schema({
    // your code here
    //Lauren Garcia S13
    profname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    subject: { 
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Profs', ProfSchema);
