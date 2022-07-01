const mongoose = require('mongoose');
const db = require('../models/db.js');
const Review = require('../models/ReviewModel.js');
const {validationResult} = require('express-validator');
db.connect();

mongoose.connection.on('connected', () => {
    console.log('Connected to Atlas!');
});

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
        var errors = validationResult(req);

		if (!errors.isEmpty()) {
            errors = errors.errors;
			
            var details = {};
            for(i = 0; i < errors.length; i++)
			{
				details[errors[i].param + 'Error'] = errors[i].msg;
				console.log(errors[i].msg);
			}

            res.render('profpage', details);
        }
        var studentid = req.body.studentid;
        var profname = req.body.profname;
        var subject = req.body.subject;
        var date = req.body.date;
        var review = req.body.review;
        var stars = req.body.stars;
        
        var rev = {
            studentid: studentid,
            profname: profname,
			subject: subject,
            
            review: review,
            stars: stars,
            date: date
        }
       
		db.insertOne(Review, rev, function(flag){});
    
		

		console.log('Submitted review of ' + studentid);
		res.render('profpage');
        
    
	},
	
	checkID: function (req, res) {
        var studentid = req.query.studentid;
        db.findOne(Review, {studentid: studentid}, {}, function (result) {
            res.send(result);
        });
    }
	
}

module.exports = reviewControl;