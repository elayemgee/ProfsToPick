const db = require('../models/db.js');
const Prof = require('../models/ProfModel.js');

const viewControl = {

    getProfs: function (req, res) {
		var projection = "profname email college department stars";
		//if(req.session.name){
		db.findManySort(Prof, {}, projection, {profname: 1}, function(result) {										
			res.render('allProfs', {
				profEntries: result
			}); 
		});
		//}
		/*else{
			console.log('You are not logged in');
			res.render('error', {extra: '<br>Please try logging in.'});
		}*/	
	},

	getSearch: function (req, res) {
		var key = req.query.key;
		console.log(key);
		var projection = "profname email college department stars";
		var query = { $or: [ {name: { $regex: key}}, {email: { $regex: key}}]};
		//{profname: { $regex: key}}
		db.findMany(Prof, query, projection, function(result) {
			res.render('searchResults', {
				searchKey: key,
				results: result
			});
			console.log(result.name);
			console.log('searched');
		});	
    }
}


module.exports = viewControl;