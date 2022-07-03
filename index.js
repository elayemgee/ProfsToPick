var PORT = process.env.PORT || 9090;
const express = require(`express`);
const app = express();

const mongoose = require('mongoose');
mongoose.createConnection(process.env.MONGODB_URI || 'mongodb://localhost:27017/ccapdev-profstopick'); // Create database connection

const session = require('express-session');
const hbs = require(`hbs`);
const port = 9090;



app.use(express.static(`public`));
app.set(`view engine`, `hbs`);

hbs.registerPartials(__dirname + `/views/partials`);

const routes = require(`./routes/routes.js`);

const db = require(`./models/db.js`);

const MongoStore = require('connect-mongo');

app.use(express.urlencoded({extended: true}));

// app.use(session({
//     'secret': 'sikret',
//     'resave': false,
//     'saveUninitialized': false,
//     store: MongoStore.create({
//         mongoUrl: 'mongodb://localhost:27017/ccapdev-profstopick'}),
//   }));

app.use(`/`, routes);

hostname = process.env.HOSTNAME;

// mongoose.connection.on('connected', () => {
//     console.log('Mongoose Connection');
// });

db.connect();

app.listen(PORT, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + `localhost` + `:` + port);
});

