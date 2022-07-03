const dotenv = require(`dotenv`);
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

/*
app.use(session({
    'secret': 'sikret',
    'resave': false,
    'saveUninitialized': false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/ccapdev-profstopick'}),
  }));*/

app.use(session({
    'secret': 'ccapdev-session',
    'resave': false,
    'saveUninitialized': false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(`/`, routes);

//hostname = process.env.HOSTNAME;
db.connect();

mongoose.connection.on('connected', () => {
    console.log('Mongoose Connection');
});
/*
app.get('/', function(req, res){
    res.sendFile(__dirname + '/' + 'login.hbs');
});
*/

app.listen(PORT, function () {
    console.log('app listening at port ' + PORT);
});

/*
app.listen(PORT, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + `localhost` + `:` + PORT);
});
*/

