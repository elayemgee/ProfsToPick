const mongoose = require('mongoose');
const db = require('../models/db.js');
const Review = require('../models/ReviewModel.js');
const Prof = require('../models/ProfModel.js');
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
            console.log('post Review');
					var studentid = req.body.studentid;
                    var profname = req.body.name;
                    var subject = req.body.subject;
                    var date = req.body.date;
                    var review = req.body.review;
                    var stars = req.body.stars;
                    

                /*    let rev = {
                        studentid: studentid,
                        profname: prof,
                        subject: subject,
                        
                        review: review,
                        stars: stars,
                        date: date
                    }*/
                
                    db.insertOne(reviews, {
                        studentid: studentid,
                        profname: profname,
                        subject: subject,
                        
                        review: review,
                        stars: stars,
                        date: date
                    }, function(flag){});
                
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