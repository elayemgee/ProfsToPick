const db = require('../models/db.js');
const Prof = require('../models/ProfModel.js');
const Review = require('../models/ReviewModel.js');

const homeControl = {
    getHome: function (req, res) {
        var projection = "studentid profname subject review stars, date";

        db.findMany(Review, {}, projection, function(y){
            res.render('home', {
                //thisHome: "this",
                reviewEntries:y
            });
        });
        /*
        db.findManyLimit(Review, {}, projection, 2, function(y){
            res.render('home', {
                //thisHome: "this",
                revEntries:y
            });
        });
        */
            

        /*
        if(req.session.studentid){
            db.findMany(Prof, null, {oaRating:-1}, {fuName:1, name:1, dpPath:1}, 3, function(x){
                
                db.findMany(Review, null, {_id:-1}, null, 4, function(y){
                    res.render('home', {
                        thisHome: "this",
                        revEntries:y
                    });
                    
                });
                
            });
        }
        else{
            console.log('You are not logged in');
            //res.render('error', {extra: '<br>Please try logging in.'});
        }
        */
    }
}

module.exports = homeControl;
