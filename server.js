var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const session = require('express-session');
app.use(session({ secret: 'currentUser' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Client Imports
const path = require('path');
app.use(express.static(path.join(__dirname, '/public/dist')));
// app.set('views', path.join(__dirname, './client/views'));
// app.set('view engine', 'ejs');

//Mongoose
var mongoose = require('./server/config/mongoose.js');

// Routes
var routes_setter = require('./server/config/routes.js');
routes_setter(app)
// Setting our Server to Listen on Port: 1337
app.listen(8000, function () {
    console.log(`listening on port 8000`);
})
