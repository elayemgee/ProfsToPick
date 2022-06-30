const express = require(`express`);
const controller = require(`../controllers/controller.js`);
const loginController = require(`../controllers/loginControl.js`);
const registerController = require(`../controllers/registerControl.js`);
const reviewController = require(`../controllers/reviewControl.js`);
const collegeController = require(`../controllers/collegeControl.js`);

const validation = require('../validation.js');

const app = express();

app.get(`/favicon.ico`, controller.getFavicon);
app.get(`/home`, controller.getIndex);

//login
app.get(`/`, loginController.getLogin);
app.post(`/loginuser`, loginController.postLogin);

//register
app.get(`/register`, registerController.getRegister);
app.get(`/checkID`, registerController.checkID);
app.post(`/register`, validation.registerValidation(), registerController.postRegister);

//going to different pages
app.get(`/allProfs`, controller.getAllProfs);
app.get(`/allColleges`, controller.getAllColleges);

//going to user profile
app.get(`/profileTitle`, controller.getProfile);

//going to prof page
app.get(`/profPage`, controller.getProfPage);

//going to different college pages
app.get(`/ccs`, collegeController.getCCS);
app.get(`/cla`, collegeController.getCLA);
app.get(`/cob`, collegeController.getCOB);
app.get(`/coe`, collegeController.getCOE);
app.get(`/coed`, collegeController.getCOED);
app.get(`/colaw`, collegeController.getCOLAW);
app.get(`/cos`, collegeController.getCOS);
app.get(`/soe`, collegeController.getSOE);

//making a review
app.get(`/writeReview`, reviewController.getReview); //landing on the review page
app.post(`/profpage`, reviewController.postReview); //posting the review details on prof's page and user's page


app.get(`/getCheckRefNo`, controller.getCheckRefNo);
app.get(`/add`, controller.getAdd);
app.get(`/delete`, controller.getDelete);

module.exports = app;


