const db = require('../models/db.js');
const User = require('../models/UserModel.js');

//const saltRounds = 10;
const registerControl = {

    getRegister: function (req, res) {
        res.render('register',{success:"hidden"});
    },

	postRegister: function (req, res) {
		var email = req.body.email;
		var userid = req.body.userid;
		var name = req.body.name;
		var pw = req.body.pw;

		db.insertOne(User, {
			userid: userid,
			name: name,
			email: email,
			password: pw
		}, function(success){
			if (success) {
                res.render('home')
            }
		});
		/*
		db.insertOne(User, user, (success) => {
            if (success) {
                res.render('login')
            }
        })*/
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
	*/
	
	checkID: function (req, res) {
        var id = req.query.userid;
        db.findOne(User, {id: id}, "id", function (result) {
            res.send(result);
        });
    }
	
}

module.exports = registerControl;