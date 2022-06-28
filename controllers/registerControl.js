const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const {validationResult} = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerControl = {

    getRegister: function (req, res) {
        res.render('register',{success:"hidden"});
    },

	postRegister: function (req, res) {
		var email = req.body.email;
		var userid = req.body.userid;
		var name = req.body.name;
		var pw = req.body.pw;

		bcrypt.hash(pw, saltRounds, function(err, hash) {
			
			db.insertOne(User, {
				userid : userid,
				name : name,
				email : email,
				password : hash
			}, function(flag){});
		
		});
		console.log('Created account of ' + userid);
		res.render('register');

		/*
		db.insertOne(User, user, (success) => {
            if (success) {
                res.render('login')
            }
        })*/
	},
	
	checkID: function (req, res) {
        var id = req.query.userid;
        db.findOne(User, {id: id}, "id", function (result) {
            res.send(result);
        });
    }
	
}

module.exports = registerControl;