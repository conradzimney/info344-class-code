'use strict';

var express = require('express');
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

