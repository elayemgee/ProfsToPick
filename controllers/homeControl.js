const db = require('../models/db.js');
const Prof = require('../models/ProfModel.js');
const Review = require('../models/ReviewModel.js');

const homeControl = {
    getHome: function (req, res) {
        var projection = "studentid profname subject review stars date";

        db.findManyLimit(Review, {}, projection, 3, {date: -1},function(y){
            res.render('home', {
                reviewEntries:y
            });
        });
}
}

module.exports = homeControl;
