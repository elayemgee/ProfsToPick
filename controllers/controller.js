const db = require('../models/db.js');
const Transaction = require('../models/ReviewModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getAllProfs: function(req, res) {
        // your code here        
        res.render('allProfs');
    },

    getAllColleges: function(req, res) {
        // your code here        
        res.render('colleges');
    },

    getProfile: function(req, res) {
        // your code here        
        res.render('user');
    },

    getProfPage: function(req, res) {
        // your code here        
        res.render('profpage');
    },


    getIndex: function(req, res) {
        // your code here        
        res.render('home');
    }
}

module.exports = controller;
