const express = require(`express`);
const controller = require(`../controllers/controller.js`);
const loginController = require(`../controllers/loginControl.js`);
const registerController = require(`../controllers/registerControl.js`);

const app = express();

app.get(`/favicon.ico`, controller.getFavicon);
app.get(`/`, loginController.getLogin);
app.get(`/register`, registerController.getRegister);
app.post(`/register`, registerController.postRegister);
app.get(`/home`, controller.getIndex);

app.get(`/getCheckRefNo`, controller.getCheckRefNo);
app.get(`/add`, controller.getAdd);
app.get(`/delete`, controller.getDelete);

module.exports = app;