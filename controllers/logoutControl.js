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
		}
	
    }
}

module.exports = logoutControl;
