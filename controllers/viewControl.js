const db = require('../models/db.js');
const Prof = require('../models/ProfModel.js');

const viewControl = {

    getProfs: function (req, res) {
		
		if(req.session.name){
			db.findMany(Prof, {name:1}, {name:1, profname:1}, 0, function(result) {										
				res.render('allProfs', {
					profEntries: result
				}); 
			});
		}
		else{
			console.log('You are not logged in');
			res.render('error', {extra: '<br>Please try logging in.'});
		}
		
	}
}


module.exports = viewControl;
