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


    getIndex: function(req, res) {
        // your code here        
        res.render('home');
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getCheckRefNo`. This function checks if a
            specific reference number is stored in the database. If the number
            is stored in the database, it returns an object containing the
            reference number, otherwise, it returns an empty string.
    */
    getCheckRefNo: function(req, res) {
        // your code here

        var refno = req.query.refno;
        db.findOne(Transaction, {refno: refno}, {}, function (result) {
            res.send(result);
        });
        
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getAdd`. This function adds the transaction
            sent by the client to the database, then appends the new
            transaction to the list of transactions in `index.hbs`.
    */
    getAdd: function(req, res) {
        // your code here
        var profname = req.query.profname
        var subject = req.query.subject
        var review = req.query.review

        let rate = {
            profname: profname,
            subject: subject,
            review: review
        }

        db.insertOne(Review, req.query, (success) => {
            if (success) {
                res.render('partials/review', rate)
            }
        })
  
    },

    getDelete: function (req, res) {
        // your code here

        db.deleteOne(Review, req.query, (success) => {
            if (success) {
                res.status(204).send();
            }
        })
    }

}

module.exports = controller;
