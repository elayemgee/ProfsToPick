var PORT = process.env.PORT || 9090;
const express = require(`express`);
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.createConnection(process.env.MONGODB_URI || 'mongodb+srv://lei:1PYgZIvqsSpQXl1K@cluster0.15ihh5e.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true }); // Create database connection

const session = require('express-session');
const hbs = require(`hbs`);
const port = 3000;


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
     // store: MongoStore.create({
     //     mongoUrl: 'mongodb+srv://lei:1PYgZIvqsSpQXl1K@cluster0.15ihh5e.mongodb.net/?retryWrites=true&w=majority'}),
    }));

app.use(`/`, routes);

hostname = process.env.HOSTNAME;
db.connect();

// mongoose.connection.on('connected', () => {
//     console.log('Mongoose Connection');
// });

db.connect();


app.listen(PORT, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + `localhost` + `:` + port);
});

/*
app.listen(port, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + `localhost` + `:` + port);
});
*/

/*
app.listen(PORT, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + `localhost` + `:` + PORT);
});
*/

