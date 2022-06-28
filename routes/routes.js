const express = require(`express`);
const controller = require(`../controllers/controller.js`);
const loginController = require(`../controllers/loginControl.js`);
const registerController = require(`../controllers/registerControl.js`);

const app = express();

app.get(`/favicon.ico`, controller.getFavicon);
app.get(`/home`, controller.getIndex);

app.get(`/`, loginController.getLogin);
app.get(`/login`, loginController.postLogin);

//register
app.get(`/register`, registerController.getRegister);
app.post(`/registeruser`, registerController.postRegister);

app.get(`/getCheckRefNo`, controller.getCheckRefNo);
app.get(`/add`, controller.getAdd);
app.get(`/delete`, controller.getDelete);

module.exports = app;


