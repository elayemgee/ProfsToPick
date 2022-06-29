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
        res.render('makeRating',{success:"hidden"});
    },

	postReview: function (req, res) {
		var reviewer = req.body.reviewer;
        var profname = req.body.profname;
        var subject = req.body.subject;
        var review = req.body.review;
        var stars = req.body.stars;
        var date = req.body.date;


		let reviews = {
			reviewer: reviewer,
            profname: profname,
			subject: subject,
            review: review,
            stars: stars,
            date: date
        }
		/*
		db.insertOne(User, {
			studentid : studentid,
			name : name,
			email : email,
			password : pw
		}, function(flag){}); */

		//db.insertOne(User,user);

		db.insertOne(Review, reviews, (success) => {
            if (success) {
                res.render('home') 
            }
        })
		/*
		bcrypt.hash(pw, saltRounds, function(err, hash) {
			
			db.insertOne(User, {
				studentid : studentid,
				name : name,
				email : email,
				password : hash
			}, function(flag){});
		
		}); */
		console.log('Submitted review of ' + reviewer);
		res.render('home');
	},
	
	checkID: function (req, res) {
        var reviewer = req.query.reviewer;
        db.findOne(Review, {reviewer: reviewer}, "reviewer", function (result) {
            res.send(result);
        });
    }
	
}

module.exports = reviewControl;