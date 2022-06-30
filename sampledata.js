const mongoose = require('mongoose');
const profsDB = require("./models/db.js");

const Prof = require('./models/ProfModel.js');
const User = require('./models/UserModel.js');
const Review = require('./models/ReviewModel.js');

const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

profsDB.connect();

mongoose.connection.on('connected', () => {
    console.log('Mongoose Connection');
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
profsDB.insertOne(Prof, professor, function(flag){});