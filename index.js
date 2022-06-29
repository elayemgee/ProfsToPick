//const dotenv = require(`dotenv`);
const express = require(`express`);
const mongoose = require(`mongoose`);
const app = express();
const session = require('express-session');
const hbs = require(`hbs`);
const port = 9090;

var PORT = process.env.PORT || 9090;

app.use(express.static(`public`));
app.set(`view engine`, `hbs`);

hbs.registerPartials(__dirname + `/views/partials`);

const routes = require(`./routes/routes.js`);

const db = require(`./models/db.js`);

const MongoStore = require('connect-mongo');

//const bodyParser = require(`body-parser`);
app.use(express.urlencoded({extended: true}));

app.use(session({
    'secret': 'somegibberishsecret',
    'resave': false,
    'saveUninitialized': false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/ccapdev-profstopick'}),
    //store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }));

app.use(`/`, routes);


//dotenv.config();
//port = process.env.PORT;
hostname = process.env.HOSTNAME;


db.connect();

app.listen(port, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + `localhost` + `:` + port);
    //console.log(`http://` + hostname + `:` + port);
});


/* FROM PREVIOUS STUDENTS
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const hbs = require('hbs');
const port = 9090;

var PORT = process.env.PORT || 9090;

app.use(express.static('public'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials/');

const routes = require('./routes/routes.js');

const db = require('./models/db.js');

const MongoStore = require('connect-mongo')(session);
app.use(express.urlencoded({extended: true}));

app.use(session({
    'secret': 'ccapdev-session',
    'resave': false,
    'saveUninitialized': false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use('/', routes);

app.use(function (req, res) {
    res.render('error');
});
db.connect();

mongoose.connection.on('connected', () => {
    console.log('Connected to Atlas!');
});

app.listen(PORT, function () {
    console.log('app listening at port ' + PORT);
});
*/