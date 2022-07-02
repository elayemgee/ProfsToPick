const db = require('../models/db.js');
const Prof = require('../models/ProfModel.js');

const collegeControl = {

    getCCS: function(req, res) {
        var projection = "profname email college department stars";
        var college = "College of Computer Studies";
        db.findManySort(Prof, {college: college}, projection, {profname: 1}, function(result) {										
            res.render('colleges/ccs', {
                profEntries: result
            }); 
        });
    },

    getCLA: function(req, res) {
        var projection = "profname email college department stars";
        var college = "College of Liberal Arts";
        db.findMany(Prof, {college: college}, projection, function(result) {										
            res.render('colleges/cla', {
                profEntries: result
            }); 
            console.log(result);
        });
    },

    getCOB: function(req, res) {
        var projection = "profname email college department stars";
        var college = "College of Business";
        db.findMany(Prof, {college: college}, projection, function(result) {										
            res.render('colleges/cob', {
                profEntries: result
            }); 
        });
    },

    getCOE: function(req, res) {
        var projection = "profname email college department stars";
        var college = "College of Engineering";
        db.findMany(Prof, {college: college}, projection, function(result) {										
            res.render('colleges/coe', {
                profEntries: result
            }); 
        });
    },

    getCOED: function(req, res) {
        var projection = "profname email college department stars";
        var college = "College of Education";
        db.findMany(Prof, {college: college}, projection, function(result) {										
            res.render('colleges/coed', {
                profEntries: result
            }); 
        });
    },

    getCOLAW: function(req, res) {
        var projection = "profname email college department stars";
        var college = "College of Law";
        db.findMany(Prof, {college: college}, projection, function(result) {										
            res.render('colleges/colaw', {
                profEntries: result
            }); 
        });
    },

    getCOS: function(req, res) {
        var projection = "profname email college department stars";
        var college = "College of Science";
        db.findMany(Prof, {college: college}, projection, function(result) {										
            res.render('colleges/cos', {
                profEntries: result
            }); 
        });
    },

    getCOEC: function(req, res) {
        var projection = "profname email college department stars";
        var college = "College of Economics";
        db.findMany(Prof, {college: college}, projection, function(result) {										
            res.render('colleges/coec', {
                profEntries: result
            }); 
        });
    }
}

module.exports = collegeControl;
