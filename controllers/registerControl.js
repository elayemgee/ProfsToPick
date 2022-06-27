const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const saltRounds = 10;
const RegisterControl = {

    getRegister: function (req, res) {
        res.render('register',{success:"hidden"});
    },

	/*
    postRegister: function (req, res) {
		
		var errors = validationResult(req);
		
		if (!errors.isEmpty()) {

            errors = errors.errors;
			
            var details = {};
            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;

            res.render('signup', details);
        }
		else{

			var email = req.body.email;
            var userid = req.body.userid;
			var name = req.body.name;
			var pass = req.body.pass + "";
			
			bcrypt.hash(pass, saltRounds, function(err, hash) {
			
				db.insertOne(User, {
					uuName: uuName,
					password: hash,
					dpPath:'user.png',
					
					name: name,
					id: id,
					email: email,
					course: course
				}, function(flag){});
			
			});

			console.log('Created account of ' + id);
			res.render('signup');
		}
    },
	
	checkID: function (req, res) {
        var id = req.query.studentid;
        db.findOne(User, {id: id}, "id", function (result) {
            res.send(result);
        });
    }
	*/
}

module.exports = RegisterControl;