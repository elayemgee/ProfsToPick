const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const bcrypt = require('bcryptjs');

const loginController = {

    getLogin: function (req, res) {

        if(req.session.studentid)
			 req.session.destroy(function(err) {
			 	if(err) throw err;
			 });

        res.render('login',{error:"hidden"});
    },

    postLogin: function (req, res) {
        var s = req.body.studentid; 
        var p = req.body.password; 
        var query1 = {studentid: s};
		db.findOne(User, query1, null, function(x) {
			if(x){
				bcrypt.compare(p, x.password, function(err, equal) { 
				if(err) 
				{
					console.log('Error!');
					throw err;
					
				}
				if(equal)
				{
						req.session.studentid = x.studentid;
						console.log(x.name + ' Successfully Logged In');
						res.redirect('/getHome');
				}
				else{
						res.render('login');
					}
					
				});
			}
			else
			  	res.render('login');
        });
    }
}

module.exports = loginController;