
var mongoose = require('mongoose');

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

    subjects: {
        type: [{
            subject: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            }
        }],
        required: true
    },
    stars: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('profs', ProfSchema);
