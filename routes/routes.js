const express = require(`express`);
const controller = require(`../controllers/controller.js`);
const loginController = require(`../controllers/loginControl.js`);
const registerController = require(`../controllers/registerControl.js`);
//const validation = require('../validators.js');

const app = express();

app.get(`/favicon.ico`, controller.getFavicon);
app.get(`/home`, controller.getIndex);

app.get(`/`, loginController.getLogin);
app.post(`/login`, loginController.postLogin);

//register
app.get(`/register`, registerController.getRegister);
app.post(`/registeruser`, registerController.postRegister);

//making a review
app.get(`/writeReview`, reviewController.getRegister);
app.post(`/profpage`, reviewController.postRegister);


app.get(`/getCheckRefNo`, controller.getCheckRefNo);
app.get(`/add`, controller.getAdd);
app.get(`/delete`, controller.getDelete);

module.exports = app;


