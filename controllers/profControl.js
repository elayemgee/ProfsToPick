const db = require('../models/db.js');

const Prof = require('../models/ProfModel.js');
const Review = require('../models/ReviewModel.js');
const User = require('../models/UserModel.js');


const profController = {
    getProf: function (req, res) {
			var projection = "studentid profname subject review stars date";
			var profname = req.params.profname;
			db.findOne(Prof, {profname: profname}, null, function(x) {
				if(x != null){
					var query2 = {profname: profname};
					db.findManySort(Review, query2, projection, {date: -1}, function(y){
						res.render('profpage', {
							profname: x.profname,
							email: x.email,
							college: x.college,
							department: x.department,		
							subjects: x.subjects,
							stars: x.stars,
							reviewEntries: y
						});
						console.log('Review: ' + y);
					});
					console.log('Prof Name: ' + x.profname);
				}
				
			});
	},
		

	getRating: function (req, res){
		console.log('Going to make a rating');
		res.render('makeRating');
	},

	

	checkReview: function (req, res) {
		var subject = req.query.subject;
		var profname = req.session.profname;

		db.findOne(Review, {profname: profname, subject: subject}, null, function (result) { 
			res.send(result);
		});
	}
}


module.exports = profController;
