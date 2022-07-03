const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const {validationResult} = require('express-validator');
//const bcrypt = require('bcryptjs');
const saltRounds = 10;

const registerControl = {
    getRegister: function (req, res) {
        res.render('register',{success:"hidden"});
    },

	postRegister: function (req, res) {
		var errors = validationResult(req);

		if (!errors.isEmpty()) {
            errors = errors.errors;
			
            var details = {};
            for(i = 0; i < errors.length; i++)
			{
				details[errors[i].param + 'Error'] = errors[i].msg;
				console.log(errors[i].msg);
			}

            res.render('register', details);
        }
		else{
			var studentid = req.body.studentid;
			var email = req.body.email;
			var name = req.body.name;
			var college = req.body.college;
			var program = req.body.program;
			var password = req.body.password;
			
			//bcrypt.hash(password, saltRounds, function(err, hash) {
			
				db.insertOne(User, {
					studentid: studentid,
					name: name,
					email: email,
					college: college,
					program: program,
					password: hash
				}, function(flag){});
			
			//});
			console.log('Created account of ' + studentid);
			res.render('login');
		}
	},

	checkID: function (req, res) {
        var studentid = req.query.studentid;
        db.findOne(User, {studentid: studentid}, {}, function (result) {
            res.send(result);
        });
    }
	
}

module.exports = registerControl;
