const mongoose = require('mongoose');
const profsToPickDB = require("./models/db.js");

const Prof = require('./models/profModel.js');
const User = require('./models/UserModel.js');
const Review = require('./models/ReviewModel.js');

const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

profsToPickDB.connect();

mongoose.connection.on('connected', () => {
    console.log('Connected to Atlas!');
});

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> faculties START */
var professor = {
	dpPath: "antioquia.png",
	name: "Arturo Caronongan",
	email: "arturo.caronongan@dlsu.edu.ph",
	college: "College of Computer Studies",
	department: "Software Technology",
	subjects:[
		{subject:"CCAPDEV", rating: 5.0}
	],
    stars: 5.0
}
profsToPickDB.insertOne(Prof, professor, function(flag){});