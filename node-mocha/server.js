'use strict';

const API_ROOT = '/api/v1';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');
var mysql = require('mysql');

var urlsApi = require('./controllers/urls-api');
var urls = require('./models/urls');
var shorten = require('./lib/shorten');

var app = express();
var dbConfig = {
    host: process.env.DBHOST || '127.0.0.1',
    user: process.env.DBUSER || 'root',
    password: process.env.DBPWD || null,
    database: 'shorty'
};

var cnPool = bluebird.promisifyAll(mysql.createPool(dbConfig));
var urlsModel = urls.Model(cnPool, shorten);
var urlsApiRouter = urlsApi.Router(urlsModel, API_ROOT);

app.use(morgan('dev'));
app.use(bodyParser.json());

//add URLs API router under API root prefix
//doing this will prefix all the routes in
//the returned router with the value of API_ROOT
app.use(API_ROOT, urlsApiRouter);

//route for any short path that is requested from the server
app.get('/:shortPath', function(req, res, next) {
    urlsModel.resolve(req.params.shortPath)
        .then(function(url) {
            //if it resolves to a URL...
            if (url) {
                //redirect the client to that URL
                res.redirect(url);            
            }
            else {
                //tell the client that it's not
                //a registered short URL
                res.status(404)
                    .type('text/plain')
                    .send('Sorry, that short url is not yet registered!');
            }
        })
        .catch(next);
});

app.listen(80, function() {
    console.log('server is listening...');
});
