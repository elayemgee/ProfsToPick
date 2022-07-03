const db = require('../models/db.js');
const Prof = require('../models/ProfModel.js');
const User = require('../models/UserModel.js');
const Review = require('../models/ReviewModel.js');

const userControl = {
    getUser: function (req, res) {

		var user = req.params.name;

		if(req.session.name){
			if(req.session.name == user){
				res.redirect('/user/'); //have to add route
			}
			else{

				var query1 = {name: user};
				db.findOne(User, query1, null, function(x) {
					
					if(x != null){
						var query2 = {reviewer: user};//hays bagal ng live share -to edit based on model
						db.findMany(Review, query2, {_id:-1}, null, 0, function(y){
							
							res.render('profile', {
								name: x.name,
								id: x.id,
								email: x.email,
								program: x.program,		
								reviewEntries: y
							});
						});
					}
					else{
						console.log('User not found');
						//res.render('error', {extra: '<br>The User may not exist here'});
					}
					
				});

			}
		}
		else{
			console.log('You are not logged in');
			res.render('error', {extra: '<br>Please try logging in.'});
		}
	},
	
	getLoggedUser: function (req, res) {
		console.log('Logged User');
		var query1 = {studentid: req.session.studentid};
		db.findOne(User, query1, null, function(x){
			var query2 = {studentid: req.session.studentid};
			var projection = "studentid profname subject review stars date";
			db.findManySort(Review, query2, projection, {date: -1}, function(y){
				res.render('user', {
					name: x.name,
					email: x.email,
					college: x.college,
					program: x.program,
					studentid: x.studentid,
					reviewEntries: y
				});
			});
				
		});
		
	},
	
	checkAuthority: function (req, res) { //to edit
		db.findOne(User, {studentid:req.session.studentid}, {studentid:1}, function (result) {
			console.log('authority checked');
			res.send(result);
		});
	},

	deleteReview: function(req, res) {
		console.log("gonna delete");
		var studentid = req.session.studentid; 
		var reviewer = req.session.reviewer;
		var profname = req.query.profname;
		var subject = req.query.subject;
		
		var review = req.query.review;
		var stars = req.query.stars;
		var date = req.query.date;

		console.log(studentid);
		console.log(reviewer);
		console.log(profname);
		console.log(subject);
		console.log(review);
		console.log(stars);
		console.log(date);

		var form = {studentid:studentid, profname:profname, subject:subject, review:review, stars:stars, date:date};
		
		db.deleteOne(Review, form, function (flag) {
			res.redirect('/user/');
		});
				
	},

	editReview: function(req, res) {
		var studentid = req.session.studentid; 
		var profname = req.query.profname;
		var subject = req.query.subject;
		var review = req.query.review; //edited review
		var stars = req.query.stars;
		var date = req.query.date;

		var form = {studentid:studentid, profname:profname, subject:subject, stars:stars, date:date};
		
		var today = new Date();
        var isoTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes());
		//edited
		console.log(isoTime);

		var projection = "studentid profname subject review stars date";
		db.findOne(Prof, {profname: profname}, projection, function(x) {
            console.log('Finding prof');
            console.log(x.profname);
            var profname = x.profname;
            db.insertOne(Review, {
                studentid: studentid,
                profname: profname,
                subject: subject,
                review: review,
                stars: stars,
                date: isoTime
            }, function(flag){
				db.deleteOne(Review, form, function (flag) {
					res.redirect('/user/');
				});
			});
         
        });
	}
   
}
module.exports = userControl;
