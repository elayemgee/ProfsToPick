const express = require(`express`);
const controller = require(`../controllers/controller.js`);
const loginController = require(`../controllers/loginControl.js`);
const registerController = require(`../controllers/registerControl.js`);
const reviewController = require(`../controllers/reviewControl.js`);

//const validation = require('../validators.js');

const app = express();

app.get(`/favicon.ico`, controller.getFavicon);
app.get(`/home`, controller.getIndex);

//login
app.get(`/`, loginController.getLogin);
app.post(`/loginuser`, loginController.postLogin);

//register
app.get(`/register`, registerController.getRegister);
app.post(`/registeruser`, registerController.postRegister);

//going to different pages
app.get(`/allProfs`, controller.getAllProfs);
app.get(`/allColleges`, controller.getAllColleges);

//going to profile
app.get(`/profileTitle`, controller.getProfile);

//going to prof page
app.get(`/profileTitle`, controller.getProfPage);

//making a review
app.get(`/writeReview`, reviewController.getRegister);
app.post(`/profpage`, reviewController.postRegister);


app.get(`/getCheckRefNo`, controller.getCheckRefNo);
app.get(`/add`, controller.getAdd);
app.get(`/delete`, controller.getDelete);

module.exports = app;


