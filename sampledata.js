const db = require("./models/db.js");
const Prof = require('./models/ProfModel.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;

db.connect();

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
db.insertOne(Prof, professor, function(flag){});