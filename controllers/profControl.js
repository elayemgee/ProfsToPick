const db = require('../models/db.js');

const Prof = require('../models/ProfModel.js');
const Review = require('../models/ReviewModel.js');
const User = require('../models/UserModel.js');

/**
 * profname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    subjects: { //might be used for making a rating
        type: [{
            subject: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            }
        }],
        required: true
    },
    stars: {
        type: Number,
        required: true
    }
 */
const profController = {
    getProf: function (req, res) {
		//if(req.session.profname){
			var projection = "studentid profname subject review stars date";
			var profname = req.params.profname;
			db.findOne(Prof, {profname: profname}, null, function(x) {
				if(x != null){
					var query2 = {profname: profname};
					db.findMany(Review, query2, projection, function(y){
						res.render('profpage', {
							profname: x.profname,
							email: x.email,
							college: x.college,
							department: x.department,		
							subjects: x.subjects,
							stars: x.stars,
							reviewEntries: y
						});
						console.log('>> Review: ' + y);
					});
					console.log('>> Prof Name: ' + x.profname);
				}
				
			});
	},
		

	getRating: function (req, res){
		console.log('Going to make a rating');
		res.render('makeRating');
	},

	/*postReview: function (req, res) {
		var u = req.query.profname;

		var review = req.query.review; //not sure..
		var course = req.query.subject;
		var stars = parseFloat(req.query.stars, 10);

		// checking if the prof already have the subject on his/her record
		var query1 = {$and: [{profname: u}, {'subjects.subject': subject}]};
		db.findOne(Prof, query1, null, function(x) {
            console.log('>>>>>>>>>Step1: checking if the prof already have the subject on his/her record');
            console.log('>>>>Result1:');
            console.log(x);

            if(x != null){ // >>>>>>>>>>>>>>>>>>>> if the prof has the subject already
                console.log('>>>>>>>>>>the prof has the subject already');
                
				var query2 = {profname: u};
				db.findMany(Review, query2, null, null, 0, function(allRevs) {

					var numTotalReviews = allRevs.length;// total number of reviews for the prof
					console.log('>>>>>>>Total no of Reviews: ' + numTotalReviews);
					
					var query3 = {$and: [{profname: u}, {subject: subject}]};
					db.findMany(Review, query3, null, null, 0, function(subjectRevs) {

						var numSubjectReviews = subjectRevs.length;// number of reviews for the prof about the specific subject
						console.log('>>>>>>>>No of subject Reviews: ' + numSubjectReviews);

						var subjRating;
						var i;
						for(i=0; i<x.subjects.length; i++){
							if(x.subjects[i].subject == subject){
								subjRating = parseFloat(x.subjects[i].rating, 10);
							}
						}
						var oaRating = x.oaRating;
						console.log('>>>>>>Original oaRating: ✯' + oaRating);
						console.log('>>>>>>Original ' + course + ' Rating: ✯' + subjRating);
						console.log('>>>>>>Stars: ' + stars);

						// computing for average
						var resOaRating = ((oaRating*numTotalReviews)+stars)/(numTotalReviews+1);
						var resSubjRating = ((subjRating*numSubjectReviews)+stars)/(numSubjectReviews+1);
						var filter = {fuName: x.fuName, 'subjects.subject': course};
						db.updateOne(Faculty, filter, { 	
							$set:{
								oaRating: resOaRating,
								'subjects.$.rating': resSubjRating
							}					
						});
						console.log('>>>>>(oaRating*numtotalReviews): ' + (oaRating*numTotalReviews));
						console.log('>>>>>(oaRating*numTotalReviews)+stars: ' + ((oaRating*numTotalReviews)+stars));
						console.log('>>>>>(numTotalReviews+1): ' + (numTotalReviews+1));
						console.log('>>>>>Resulting oaRating: ✯' + resOaRating);
						
						console.log('>>>>>(subjRating*numSubjectReviews): ' + (subjRating*numSubjectReviews));
						console.log('>>>>>(subjRating*numSubjectReviews)+stars: ' + ((subjRating*numSubjectReviews)+stars));
						console.log('>>>>>(numSubjectReviews+1): ' + (numSubjectReviews+1));
						console.log('>>>>>Resulting ' + course + ' Rating: ✯' + resSubjRating);

						// finding the logged user
						db.findOne(User, {uuName:req.session.uuName}, null, function(loggedUser) {
							// adding the review
							db.insertOne(Review, {reviewee_u:u, imagePath:loggedUser.dpPath, reviewer:loggedUser.uuName, reviewee:x.name, revCourse:course, revStar:stars, revDet:review}, function(flag) {

								res.render('partials/revEntryCreated', {reviewee_u:u, imagePath:loggedUser.dpPath, reviewer:loggedUser.uuName, reviewee:x.name, revCourse:course, revStar:stars, revDet:review, isNew:false, resOaRating:resOaRating, resSubjRating:resSubjRating}, function (err, html){
									res.send(html);
								});

							});
						});

					});

				});
				
			}
			else{ // >>>>>>>>>>>>>>>>>>>> if the prof does not have the subject yet
                console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>the prof does not have the subject yet');

				// adding the subject and rating to the prof
				var filter = {fuName: u, 'subjects.subject': {$ne: course}};
				db.updateOne(Faculty, filter, {
					$addToSet: {
						subjects: {
							subject: course,
							rating: stars
						}
					}
				});

				var query2 = {fuName: u};
				db.findOne(Faculty, query2, null, function(prof) {
					
					var query3 = {reviewee_u: u};
					db.findMany(Review, query3, null, null, 0, function(allRevs) {

                        var numTotalReviews = allRevs.length;// total number of reviews for the prof
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Total no of Reviews: ' + numTotalReviews);

						var oaRating = prof.oaRating;
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Original oaRating: ✯' + oaRating);
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Stars: ' + stars);

						// computing for average
						var resOaRating = ((oaRating*numTotalReviews)+stars)/(numTotalReviews+1);
						var filter = {fuName: prof.fuName, 'subjects.subject': course};
						db.updateOne(Faculty, filter, { 	
							$set:{
								oaRating: resOaRating
							}					
						});
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(oaRating*numtotalReviews): ' + (oaRating*numTotalReviews));
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(oaRating*numTotalReviews)+stars: ' + ((oaRating*numTotalReviews)+stars));
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(numTotalReviews+1): ' + (numTotalReviews+1));
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Resulting oaRating: ✯' + resOaRating);

						// finding the logged user
						db.findOne(User, {uuName:req.session.uuName}, null, function(loggedUser) {
							// adding the review
							db.insertOne(Review, {reviewee_u:u, imagePath:loggedUser.dpPath, reviewer:loggedUser.uuName, reviewee:prof.name, revCourse:course, revStar:stars, revDet:review}, function(flag) {
								res.render('partials/revEntryCreated', {reviewee_u:u, imagePath:loggedUser.dpPath, reviewer:loggedUser.uuName, reviewee:prof.name, revCourse:course, revStar:stars, revDet:review, isNew:true, resOaRating:resOaRating, resSubjRating:stars}, function(err, html) {
									res.send(html);
								});

							});
						});

					});

				});
			}
            
		});
	},*/

	checkReview: function (req, res) {
		var subject = req.query.subject;
		var profname = req.session.profname;

		db.findOne(Review, {profname: profname, subject: subject}, null, function (result) { 
			res.send(result);
		});
	}
}


module.exports = profController;
