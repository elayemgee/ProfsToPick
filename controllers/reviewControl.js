const db = require('../models/db.js');
const Review = require('../models/ReviewModel.js');
const {validationResult} = require('express-validator');

//const bcrypt = require('bcrypt');
//const saltRounds = 10;

/**
 * reviewer: {
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
 */

const reviewControl = {

    getReview: function (req, res) {
        res.render('profpage',{success:"hidden"});
    },

	postReview: function (req, res) {
		var studentid = req.body.studentid;
        var profname = req.body.profname;
        var subject = req.body.subject;
        var review = req.body.review;
        var stars = req.body.stars;
        var date = req.body.date;


		db.insertOne(Review,{
			reviewer: reviewer,
			studentid: studentid,
            profname: profname,
			subject: subject,
            review: review,
            stars: stars,
            date: date
        }, function(flag){});

		console.log('Submitted review of ' + studentid);
		res.render('home');
	},
	
	checkID: function (req, res) {
        var studentid = req.query.studentid;
        db.findOne(Review, {studentid: studentid}, "studentid", function (result) {
            res.send(result);
        });
    }
	
}

module.exports = reviewControl;