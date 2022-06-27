const db = require('../models/db.js');
const User = require('../models/UserModel.js');

//const bcrypt = require('bcrypt');

const LoginControl = {

    getLogin: function (req, res) {

        res.render('login')
        /*
        if(req.session.userid)
			req.session.destroy(function(err) {
				if(err) throw err;
			});

        res.render('login',{error:"hidden"});
        */
    }

    /*
    postLogin: function (req, res) {
		
        var u = req.body.userid;
        var pw = req.body.password;

        var query1 = {userid: u};
		db.findOne(User, query1, null, function(x) {
            
			if(x)
				bcrypt.compare(pw, x.password, function(err, equal) {
					
					if(equal){
						
						req.session.uuName = x.uuName;
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>' + x.uuName + ' Successfully Logged In');
						//res.redirect('/user/');
					}
					else{
						res.render('login');
					}
					
				});
			else
				res.render('login');
        });
        
    }*/
}

module.exports = LoginControl;