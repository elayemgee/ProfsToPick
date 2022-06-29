const db = require('../models/db.js');
const Prof = require('../models/ProfModel.js');

const collegeControl = {

    getCCS: function(req, res) {
        res.render('colleges/ccs');
    },

    getCLA: function(req, res) {
        res.render('colleges/cla');
    },

    getCOB: function(req, res) {
        res.render('colleges/cob');
    },

    getCOE: function(req, res) {
        res.render('colleges/coe');
    },

    getCOED: function(req, res) {
        res.render('colleges/coed');
    },

    getCOLAW: function(req, res) {
        res.render('colleges/colaw');
    },

    getCOS: function(req, res) {
        res.render('colleges/cos');
    },

    getSOE: function(req, res) {
        res.render('colleges/soe');
    }
}

module.exports = collegeControl;
