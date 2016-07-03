var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

var db = require('./config/db');
require('./app/model/Post');
require('./app/model/Comment');

// set our port
var port = process.env.PORT || 8080;

mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

// routes
var routes = require('./app/routes');
app.use('/', routes);

//start app at localhost:8080
app.listen(port);

console.log('Testing on  port ' + port);

exports = module.exports = app;
