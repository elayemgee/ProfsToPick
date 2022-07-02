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

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'-'+today.getTime();
        console.log('post Review')
        var profemail = req.body.profemail;
        var studentid = req.session.studentid;
        var subject = req.body.subject;
        var review = req.body.review;
        var stars = req.body.stars;

        var projection = "studentid profname subject review stars date";

        console.log(profemail);
        console.log(studentid);

        db.findOne(Prof, {email: profemail}, projection, function(x) {
            console.log('Finding prof');
            console.log(x.profname);
            var profname = x.profname;
            
            db.insertOne(Review, {
                studentid: studentid,
                profname: profname,
                subject: subject,
                review: review,
                stars: stars,
                date: date
            }, function(flag){});
         
            var route = '/profPage/' + profname;
            res.redirect(route);
        });
/*
            console.log('post Review');
					var studentid = req.body.studentid;
                    var profname = req.body.name;
                    var subject = req.body.subject;
                    var date = req.body.date;
                    var review = req.body.review;
                    var stars = req.body.stars;
                    
            
                    db.insertOne(Review, {
                        studentid: studentid,
                        profname: profname,
                        subject: subject,
                        review: review,
                        stars: stars,
                        date: date

                    }, function(flag){});
                
                    console.log('Submitted review of ' + studentid);
                    res.redirect('/getHome');
                    */
				
	},
	
	checkID: function (req, res) {
        var studentid = req.query.studentid;
        db.findOne(Review, {studentid: studentid}, {}, function (result) {
            res.send(result);
        });
    }
	
}

module.exports = reviewControl;