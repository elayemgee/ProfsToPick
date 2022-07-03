const express = require(`express`);
const mongoose = require(`mongoose`);
const app = express();
const session = require('express-session');
const hbs = require(`hbs`);
const port = 3000;

var PORT = process.env.PORT || 3000;

app.use(express.static(`public`));
app.set(`view engine`, `hbs`);

hbs.registerPartials(__dirname + `/views/partials`);

const routes = require(`./routes/routes.js`);

const db = require(`./models/db.js`);

const MongoStore = require('connect-mongo');

app.use(express.urlencoded({extended: true}));

app.use(session({
    'secret': 'sikret',
    'resave': false,
    'saveUninitialized': false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/ccapdev-profstopick'}),
  }));

app.use(`/`, routes);

hostname = process.env.HOSTNAME;

mongoose.connection.on('connected', () => {
    console.log('Mongoose Connection');
});

db.connect();

app.listen(port, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + `localhost` + `:` + port);
});

