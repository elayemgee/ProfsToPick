const db = require("./models/db.js");
const Prof = require('./models/ProfModel.js');

db.connect();

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> faculties START */

const sampleData = {
	setProfData: function (req, res) {
		console.log('Add prof data');
		var professor = {
			//dpPath: "antioquia.png",
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
	}
}

module.exports = sampleData;
