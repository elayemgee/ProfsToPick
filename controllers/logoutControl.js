const db = require('../models/db.js');

const logoutControl = {

    getLogout: function (req, res) {
		
		if(req.session.studentid){
			
			var u = req.session.studentid;
			
			req.session.destroy(function(err) {
				if(err) throw err;

				console.log('>>>' + u + ' Successfully logged out');
				res.render('login');
			});
			
		}
		else{
			console.log('>>>>>>>>>You are not logged in');
			//res.render('error', {extra: "<br>You can't log out if you haven't even logged in yet!"});
		}
	
    }
}

module.exports = logoutControl;
