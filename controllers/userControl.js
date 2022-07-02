const db = require('../models/db.js');
const Faculty = require('../models/ProfModel.js');
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
			var projection = "studentid profname subject review stars, date";
			db.findMany(Review, query2, projection, function(y){
				res.render('user', {
					thisProfile: "", //not sure what this does/ is for
					name: x.name,
					email: x.email,
					college: x.college,
					program: x.program,
					studentid: x.studentid,
					reviewEntries: y
				});
			});
				
			/*
			var query2 = {reviewer: req.session.studentid};
			db.findMany(Review, query2, {_id:-1}, null, 0, function(y){
				res.render('user', {
					//thisProfile: "this", //not sure what this does/ is for
					name: x.name,
					studentid: x.studentid, //120******
					email: x.email,
					college: x.college,
					program: x.program
					//reviewEntries: y
				});
			});
			*/
			
		});
		
	},
	
	checkAuthority: function (req, res) { //to edit
		
		db.findOne(User, {studentid:req.session.studentid}, {studentid:1}, function (result) {
			console.log('authority checked');
			res.send(result);
		});
		
	},

	deleteReview: function(req, res) {
		var reviewer = req.query.reviewer;
		var profname = req.query.profname;
		var subject = req.query.subject;
		var stars = parseFloat(req.query.star, 10);
	
		var conditions = {reviewer:reviewer, profname:profname, subject:subject, star:star};
		// finding the fuName of the prof
		db.findOne(Review, conditions, null, function(a) {
			db.findOne(Faculty, {profname:a.profname}, null, function(b) {
				
				var query1 = {profname: b.profname};
				db.findMany(Review, query1, null, null, 0, function(allRevs) {

					var numTotalReviews = allRevs.length;// total number of reviews for the prof
					console.log('Total no of Reviews: ' + numTotalReviews)
					
					var query2 = {$and: [{profname: b.profname}, {subject: subject}]};
					db.findMany(Review, query2, null, null, 0, function(subjectRevs) {

						var numSubjectReviews = subjectRevs.length;//number of reviews for the prof about the specific subject
						console.log('No of subject Reviews: ' + numSubjectReviews);

						if(numSubjectReviews == 1){ // >>>>>>>>>>>>>>>>>>>> if the review is the last review for the specific subject
							console.log('Remove this: ' + revCourse);

							// removing the subject and rating from the prof
							var filter = {profname: b.profname}
							db.updateOne(Faculty, filter, {
								$pull: {
									subjects: {
										subject: subject
									}
								}
							});

							var oaRating = b.star;
							console.log('Original oaRating: ✯' + star);
							console.log('Stars: ' + star);

							var resOaRating = ((oaRating*numTotalReviews)-star)/(numTotalReviews-1);
							if(numTotalReviews == 1){ // >>>>>>>>>>>>>>>>>>>> if the review is the last review for the prof
								console.log('Last Review deleted, Resetting Faculty Rating');

								// resetting ratings
								var filter = {profname: b.profname};
								db.updateOne(Faculty, filter, {star: 0.00});

								console.log('Resulting oaRating: ✯0');
							}
							else{ // >>>>>>>>>>>>>>>>>>>> if there are more reviews for the prof
								console.log('Recomputing Faculty Rating');

								// recomputing ratings
								var filter = {profname: b.profname};
								db.updateOne(Faculty, filter, { 	
									$set:{
										oaRating: resOaRating
									}					
								});
								console.log('(oaRating*numTotalReviews): ' + (star*numTotalReviews));
								console.log('((oaRating*numTotalReviews)-revStar): ' + (((star*numTotalReviews)-star)));
								console.log('(numTotalReviews-1): ' + (numTotalReviews-1));
								console.log('Resulting oaRating: ✯' + resOaRating);
							}

							db.deleteOne(Review, conditions);

						}
						else{ //if there are more reviews left for the specific subject
							console.log('Update this: ' + subject);
							
							var subjRating;
							var i;
							for(i=0; i<b.subjects.length; i++){
								if(b.subjects[i].subject == subject){
									subjRating = parseFloat(b.subjects[i].rating, 10); //not sure abt this
								}
							}
							var oaRating = b.oaRating;
							console.log('Original oaRating: ✯' + oaRating);
							console.log('Original ' + subject + ' Rating: ✯' + subjRating);
							console.log('Stars: ' + stars);

							var resOaRating = ((oaRating*numTotalReviews)-star)/(numTotalReviews-1);
							var resSubjRating = ((subjRating*numSubjectReviews)-star)/(numSubjectReviews-1);
							var filter = {profname: b.profname, 'subjects.subject': subject};
							console.log(filter);
							db.updateOne(Faculty, filter, { 	
								$set:{
									oaRating: resOaRating,
									'subjects.$.rating': resSubjRating
								}					
							});
							console.log('(oaRating*numTotalReviews): ' + (oaRating*numTotalReviews));
							console.log('((oaRating*numTotalReviews)-revStar): ' + (((oaRating*numTotalReviews)-star)));
							console.log('(numTotalReviews-1): ' + (numTotalReviews-1));
							console.log('Resulting oaRating: ✯' + resOaRating);

							console.log('(subjRating*numSubjectReviews): ' + (subjRating*numSubjectReviews));
							console.log('((subjRating*numSubjectReviews)-revStar): ' + ((subjRating*numSubjectReviews)-star));
							console.log('(numSubjectReviews-1): ' + (numSubjectReviews-1));
							console.log('Resulting ' + subject + ' Rating: ✯' + resSubjRating);

							db.deleteOne(Review, conditions);
							
						}

					});

				});

			});
		});

	},

	editReview: function(req, res) {
		var reviewer = req.query.reviewer;
		var profname = req.query.profname;
		var subject = req.query.subject;
		var star = parseFloat(req.query.star, 10);
		
		//to edit
		var review = req.query.newRev;
		var course = req.query.newCourse;
		var stars = parseFloat(req.query.newStars, 10);
		
		//deleteReview
		console.log('Deleting the Review')
		var conditions = {reviewer:reviewer, profname:profname, subject:subject, star:star};
		// finding the fuName of the prof
		db.findOne(Review, conditions, null, function(a) {
			db.findOne(Faculty, {profname:a.reviewee_u}, null, function(b) {
				var u = b.fuName;
				
				var query1 = {reviewee_u: b.fuName};
				db.findMany(Review, query1, null, null, 0, function(allRevs) {

					var numTotalReviews = allRevs.length;// total number of reviews for the prof
					console.log('Total no of Reviews: ' + numTotalReviews)
					
					var query2 = {$and: [{reviewee_u: b.fuName}, {revCourse: revCourse}]};
					db.findMany(Review, query2, null, null, 0, function(subjectRevs) {

						var numSubjectReviews = subjectRevs.length;//number of reviews for the prof about the specific subject
						console.log('No of subject Reviews: ' + numSubjectReviews);

						if(numSubjectReviews == 1){ // >>>>>>>>>>>>>>>>>>>> if the review is the last review for the specific subject
							console.log('Remove this: ' + revCourse);

							// removing the subject and rating from the prof
							var filter = {fuName: b.fuName}
							db.updateOne(Faculty, filter, {
								$pull: {
									subjects: {
										subject: revCourse
									}
								}
							});

							var oaRating = b.oaRating;
							console.log('Original oaRating: ✯' + oaRating);
							console.log('Stars: ' + revStar);

							var resOaRating = ((oaRating*numTotalReviews)-revStar)/(numTotalReviews-1);
							if(numTotalReviews == 1){ // >>>>>>>>>>>>>>>>>>>> if the review is the last review for the prof
								console.log('Last Review deleted, Resetting Faculty Rating');

								// resetting ratings
								var filter = {fuName: b.fuName};
								db.updateOne(Faculty, filter, {oaRating: 0.00});

								console.log('Resulting oaRating: ✯0');
							}
							else{ // >>>>>>>>>>>>>>>>>>>> if there are more reviews for the prof
								console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Recomputing Faculty Rating');

								// recomputing ratings
								var filter = {fuName: b.fuName};
								db.updateOne(Faculty, filter, { 	
									$set:{
										oaRating: resOaRating
									}					
								});
								console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(oaRating*numTotalReviews): ' + (oaRating*numTotalReviews));
								console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>((oaRating*numTotalReviews)-revStar): ' + (((oaRating*numTotalReviews)-revStar)));
								console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(numTotalReviews-1): ' + (numTotalReviews-1));
								console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Resulting oaRating: ✯' + resOaRating);
							}

							db.deleteOne(Review, conditions);
							
							db.findMany(User, null, {_id:-1}, null, 1, function(funky){
								console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>A nice trick');
								
								var query1 = {$and: [{fuName: u}, {'subjects.subject': course}]};
								db.findOne(Faculty, query1, null, function(x) {
									console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Step1: checking if the prof already have the subject on his/her record');
									console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Result1:');
									console.log(x);

									if(x != null){ // >>>>>>>>>>>>>>>>>>>> if the prof has the subject already
										console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SOMETHING WENT WRONG: the prof has the subject already');
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
														
														//do nothing

													});
												});

											});

										});
									}
									
								});
							});

						}
						else{ // >>>>>>>>>>>>>>>>>>>> if there are more reviews left for the specific subject
							console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Update this: ' + revCourse);
							
							var subjRating;
							var i;
							for(i=0; i<b.subjects.length; i++){
								if(b.subjects[i].subject == revCourse){
									subjRating = parseFloat(b.subjects[i].rating, 10);
								}
							}
							var oaRating = b.oaRating;
							console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Original oaRating: ✯' + oaRating);
							console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Original ' + revCourse + ' Rating: ✯' + subjRating);
							console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Stars: ' + revStar);

							var resOaRating = ((oaRating*numTotalReviews)-revStar)/(numTotalReviews-1);
							var resSubjRating = ((subjRating*numSubjectReviews)-revStar)/(numSubjectReviews-1);
							var filter = {fuName: b.fuName, 'subjects.subject': revCourse};
							console.log(filter);
							db.updateOne(Faculty, filter, { 	
								$set:{
									oaRating: resOaRating,
									'subjects.$.rating': resSubjRating
								}					
							});
							console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(oaRating*numTotalReviews): ' + (oaRating*numTotalReviews));
							console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>((oaRating*numTotalReviews)-revStar): ' + (((oaRating*numTotalReviews)-revStar)));
							console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(numTotalReviews-1): ' + (numTotalReviews-1));
							console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Resulting oaRating: ✯' + resOaRating);

							console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(subjRating*numSubjectReviews): ' + (subjRating*numSubjectReviews));
							console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>((subjRating*numSubjectReviews)-revStar): ' + ((subjRating*numSubjectReviews)-revStar));
							console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(numSubjectReviews-1): ' + (numSubjectReviews-1));
							console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Resulting ' + revCourse + ' Rating: ✯' + resSubjRating);

							db.deleteOne(Review, conditions);
							
							db.findMany(User, null, {_id:-1}, null, 1, function(funky){
								console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>A nice trick');
							
								var query1 = {$and: [{fuName: u}, {'subjects.subject': course}]};
								db.findOne(Faculty, query1, null, function(x) {
									console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Step1: checking if the prof already have the subject on his/her record');
									console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Result1:');
									console.log(x);

									if(x != null){ // >>>>>>>>>>>>>>>>>>>> if the prof has the subject already
										console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>the prof has the subject already');
										
										var query2 = {reviewee_u: u};
										db.findMany(Review, query2, null, null, 0, function(allRevs) {

											var numTotalReviews = allRevs.length;// total number of reviews for the prof
											console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Total no of Reviews: ' + numTotalReviews);
											
											var query3 = {$and: [{reviewee_u: u}, {revCourse: course}]};
											db.findMany(Review, query3, null, null, 0, function(subjectRevs) {

												var numSubjectReviews = subjectRevs.length;// number of reviews for the prof about the specific subject
												console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>No of subject Reviews: ' + numSubjectReviews);

												var subjRating;
												var i;
												for(i=0; i<x.subjects.length; i++){
													if(x.subjects[i].subject == course){
														subjRating = parseFloat(x.subjects[i].rating, 10);
													}
												}
												var oaRating = x.oaRating;
												console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Original oaRating: ✯' + oaRating);
												console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Original ' + course + ' Rating: ✯' + subjRating);
												console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Stars: ' + stars);

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
												console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(oaRating*numtotalReviews): ' + (oaRating*numTotalReviews));
												console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(oaRating*numTotalReviews)+stars: ' + ((oaRating*numTotalReviews)+stars));
												console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(numTotalReviews+1): ' + (numTotalReviews+1));
												console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Resulting oaRating: ✯' + resOaRating);
												
												console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(subjRating*numSubjectReviews): ' + (subjRating*numSubjectReviews));
												console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(subjRating*numSubjectReviews)+stars: ' + ((subjRating*numSubjectReviews)+stars));
												console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(numSubjectReviews+1): ' + (numSubjectReviews+1));
												console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Resulting ' + course + ' Rating: ✯' + resSubjRating);

												// finding the logged user
												db.findOne(User, {uuName:req.session.uuName}, null, function(loggedUser) {
													// adding the review
													db.insertOne(Review, {reviewee_u:u, imagePath:loggedUser.dpPath, reviewer:loggedUser.uuName, reviewee:x.name, revCourse:course, revStar:stars, revDet:review}, function(flag) {

														//do nothing

													});
												});

											});

										});
										
									}
									else{ // >>>>>>>>>>>>>>>>>>>> if the prof does not have the subject yet
										console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SOMETHING WENT WRONG: the prof does not have the subject yet');
									}
									
								});
							});
						}

					});

				});

			});
		});
		
	}
   
}
module.exports = userControl;
