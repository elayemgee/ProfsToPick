const mongoose = require('mongoose');
const db = require("./models/db.js");
const Prof = require('./models/ProfModel.js');

db.connect();

mongoose.connection.on('connected', () => {
    console.log('Connected to Atlas!');
});

/*faculties START */
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
		{subject:"CCAPDEV", rating: 5.0}
	],
	stars: 5.0
}
db.insertOne(Prof, professor, function(flag){});


/*const sampleData = {
	setProfData: function (req, res) {
		console.log('Add prof data');
		var professor = {
			//dpPath: "antioquia.png",
			name: "Arturo Caronongan",
			email: "arturo.caronongan@dlsu.edu.ph",
			college: "College of Computer Studies",
			department: "Software Technology",
			subjects:"CCAPDEV",
			stars: 5.0,
		}
		db.insertOne(Prof, professor, function(flag){});
	}
	

}
module.exports = sampleData;
*/

