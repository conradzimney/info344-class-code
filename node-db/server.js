'use strict';

var express = require('express');
<<<<<<< HEAD
var morgan = require('morgan');                 // logging middleware
var bodyParser = require('body-parser');        // parse JSON that gets passed to the server 
var mysql = require('mysql');
var dbConfig = require('./secret/config-maria.json');
var bluebird = require('bluebird');

// create a connection pool to the MariaDB server
// this allows multiple queries to execute against the
// database in parallel
var connPool = bluebird.promisifyAll(mysql.createPool(dbConfig));

// require our stories controller
var storiesAPI = require('./controllers/stories-api'); // don't need to write .js after path for some reason 
// require out story model
var Story = require('./models/story.js').Model(connPool);

// create the express application
var app = express();

// log requests
app.use(morgan('dev'));
// parse JSON inthe request body
app.use(bodyParser.json());

// serve static files from the /static subdirectory
app.use(express.static(__dirname + '/static'));

// mount the stories API router under /api/v1
// mount all APIs under API directory to better organize different versions of APIs as we write them
app.use('/api/v1', storiesAPI.Router(Story));

app.listen(80, function() {
   console.log('Server is listening...'); 
});

=======
var morgan = require('morgan');                         //logging
var bodyParser = require('body-parser');                //body parsing
var mysql = require('mysql');                           //database
var dbConfig = require('./secret/config-maria.json');   //database config
var bluebird = require('bluebird');                     //promise wrapper

//create a connection pool to the MariaDB server
//this allow multiple queries to execute against
//the database in parallel
var connPool = bluebird.promisifyAll(mysql.createPool(dbConfig));

//require our stories controller
var storiesApi = require('./controllers/stories-api');
//require our story model
var stories = require('./models/stories.js').Model(connPool);

//create the express application
var app = express();

//log requests
app.use(morgan('dev'));
//parse JSON in the request body
app.use(bodyParser.json());

//serve static files from the /static subdirectory
app.use(express.static(__dirname + '/static'));

//mount the stories API router under /api/v1
app.use('/api/v1', storiesApi.Router(stories));

//start listening for HTTP requests on port 80
app.listen(80, function() {
    console.log('server is listening...'); 
});
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a
