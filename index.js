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

hostname = process.env.HOSTNAME;

mongoose.connection.on('connected', () => {
    console.log('Mongoose Connection');
});

db.connect();

app.listen(port, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + `localhost` + `:` + port);
    //console.log(`http://` + hostname + `:` + port);
});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/ccapdev-profstopick";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = [
      { name: 'Arturo Caronongan', email: 'Highway 71'}
    ];
    db.collection("profs").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });