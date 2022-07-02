const mongoose = require('mongoose');
const db = require("./models/db.js");
const Prof = require('./models/ProfModel.js');
const Review = require('./models/ReviewModel.js');
const User = require('./models/UserModel.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;

db.connect();

mongoose.connection.on('connected', () => {
    console.log('Connected to Atlas!');
});

////////////////////////////////////////////////INSERTING SAMPLE PROFESSOR PAGE INFORMATION
var professor = {
	profname: "Arturo Caronongan",
	email: "arturo.caronongan@dlsu.edu.ph",
	college: "College of Computer Studies",
	department: "Software Technology",
	subjects:[
		{subject:"CCAPDEV", rating: 5.0}
	],
	stars: 5.0
}
db.insertOne(Prof, professor, function(flag){});

var professor = {
	profname: "Shirley Chu",
	email: "shirley.chu@dlsu.edu.ph",
	college: "College of Computer Studies",
	department: "Software Technology",
	subjects:[
		{subject:"CCDSTRU", rating: 5.0}
	],
	stars: 5.0
}
db.insertOne(Prof, professor, function(flag){});

var professor = {
	profname: "Roger Uy",
	email: "roger.uy@dlsu.edu.ph",
	college: "College of Computer Studies",
	department: "Computer Technology",
	subjects:[
		{subject:"CSARCH1", rating: 5.0}
	],
	stars: 5.0
}
db.insertOne(Prof, professor, function(flag){});

var professor = {
	profname: "Mutya Teodoro-Sambile",
	email: "mutya.teodoro_sambile@dlsu.edu.ph",
	college: "College of Liberal Arts",
	department: "Communication",
	subjects:[
		{subject:"GEARTAP", rating: 5.0}
	],
	stars: 5.0
}
db.insertOne(Prof, professor, function(flag){});

////////////////////////////////////////////////INSERTING SAMPLE REVIEWS
var review = {
	studentid: "12112345",
	profname: "Arturo Caronongan",
	subject: "CCAPDEV",
	review: "Sir Art is very lively in his lectures",
	stars: 5.0,
	date: "2022-07-01"
}
db.insertOne(Review, review, function(flag){});

var review = {
	studentid: "12112345",
	profname: "Mutya Teodoro-Sambile",
	subject: "GEARTAP",
	review: "asfdlasjkdfklasjdfldsajfklsajdflasjdflksajdfklasdjklfajsdklfjaslkdjfklsadjflsadkjfklasjdflksadjflkdsajklfjasdklfjaslk;djfklasdjflasdjfasdlfjkalskdfjklsadjfalskjdfklasjd",
	stars: 4.5,
	date: "2022-07-02"
}
db.insertOne(Review, review, function(flag){});

var review = {
	studentid: "12012345",
	profname: "Roger Uy",
	subject: "CSARCH1",
	review: "He makes sure that everyone is following his lectures",
	stars: 5.0,
	date: "2022-07-01"
}
db.insertOne(Review, review, function(flag){});

var review = {
	studentid: "11912345",
	profname: "Mutya Teodoro-Sambile",
	subject: "GEARTAP",
	review: "She's a fun prof to have and assignments are easy to do",
	stars: 5.0,
	date: "2022-07-01"
}
db.insertOne(Review, review, function(flag){});

////////////////////////////////////////////////INSERTING SAMPLE USERS

bcrypt.hash('password', saltRounds, function(err, hash) {
	var user = {
		studentid: 12112345,
		name: "Juan Dela Cruz",
		college: "College of Computer Studies",
		program: "BSCS",
		email: "juan_delacruz@dlsu.edu.ph",
		password: hash,
	}
	db.insertOne(User, user, function(flag){});

	var user = {
		studentid: 12012345,
		name: "John Smith",
		college: "College of Computer Studies",
		program: "BSCS",
		email: "john_smith@dlsu.edu.ph",
		password: hash,
	}
	db.insertOne(User, user, function(flag){});

	var user = {
		studentid: 11912345,
		name: "Bob",
		college: "College of Liberal Arts",
		program: "BACA",
		email: "bob@dlsu.edu.ph",
		password: hash,
	}
	db.insertOne(User, user, function(flag){});
});
