const express = require(`express`);
const controller = require(`../controllers/controller.js`);
const loginController = require(`../controllers/loginControl.js`);
const logoutController = require(`../controllers/logoutControl.js`);
const registerController = require(`../controllers/registerControl.js`);
const reviewController = require(`../controllers/reviewControl.js`);
const collegeController = require(`../controllers/collegeControl.js`);
const profController = require(`../controllers/profControl.js`);
const userController = require(`../controllers/userControl.js`);
const homeController = require(`../controllers/homeControl.js`);
const viewController = require(`../controllers/viewControl.js`);

const validation = require('../validation.js');

const app = express();


app.get(`/favicon.ico`, controller.getFavicon);
//home page
app.get(`/getHome`, homeController.getHome);

//register
app.get(`/register`, registerController.getRegister);
app.get(`/checkID`, registerController.checkID);
//app.post(`/register`,  registerController.postRegister);
app.post(`/register`, validation.registerValidation(), registerController.postRegister);

//login
app.get(`/`, loginController.getLogin);
app.post(`/login`, loginController.postLogin);

//logout
app.get(`/logout`, logoutController.getLogout);

//user - to fix userControl
//app.get('/user/:uuName', userController.getUser);
app.get('/user/', userController.getLoggedUser);
//app.get('/authorityCheck', userController.checkAuthority);
app.get('/editReview', userController.editReview);
app.get('/deleteReview', userController.deleteReview);

//going to different pages
//app.get(`/allProfs`, controller.getAllProfs);
app.get(`/allProfs`, viewController.getProfs);
app.get(`/allColleges`, controller.getAllColleges);

//going to user profile
app.get(`/profileTitle`, controller.getProfile);

//going to prof page
//app.get(`/profPage`, controller.getProfPage);
app.get('/profpage/:profname', profController.getProf);

//going to write review from prof page
app.get('/makeRating', profController.getRating);

//search for prof
app.get('/search', viewController.getSearch);

//going to different college pages
app.get(`/ccs`, collegeController.getCCS);
app.get(`/cla`, collegeController.getCLA);
app.get(`/cob`, collegeController.getCOB);
app.get(`/coe`, collegeController.getCOE);
app.get(`/coed`, collegeController.getCOED);
app.get(`/colaw`, collegeController.getCOLAW);
app.get(`/cos`, collegeController.getCOS);
app.get(`/coec`, collegeController.getCOEC);

//making a review
app.get(`/profpage`, reviewController.getReview); //landing on the review page
app.post(`/profpage`, reviewController.postReview); //posting the review details on prof's page and user's page

module.exports = app;


