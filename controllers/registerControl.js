const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const {validationResult} = require('express-validator');

//const bcrypt = require('bcrypt');
//const saltRounds = 10;

const registerControl = {

    getRegister: function (req, res) {
        res.render('register',{success:"hidden"});
    },

	postRegister: function (req, res) {
		var email = req.body.email;
		var studentid = req.body.studentid;
		var name = req.body.name;
		var password = req.body.password;

		let user = {
			studentid: studentid,
            name: name,
			email: email,
            password: password
        }
		/*
		db.insertOne(User, {
			studentid : studentid,
			name : name,
			email : email,
			password : pw
		}, function(flag){}); */

		//db.insertOne(User,user);

		db.insertOne(User, user, (success) => {
            if (success) {
                res.render('login') 
            }
        })
		/*
		bcrypt.hash(pw, saltRounds, function(err, hash) {
			
			db.insertOne(User, {
				studentid : studentid,
				name : name,
				email : email,
				password : hash
			}, function(flag){});
		
		}); */
		console.log('Created account of ' + studentid);
		res.render('login');
	},
	
	checkID: function (req, res) {
        var studentid = req.query.studentid;
        db.findOne(User, {studentid: studentid}, "id", function (result) {
            res.send(result);
        });
    }
	
}

module.exports = registerControl;