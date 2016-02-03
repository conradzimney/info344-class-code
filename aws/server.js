'use strict';

var bluebird = require('bluebird');
var mysql = require('mysql');
var express = require('express');
var morgan = require('morgan');


var dbConfig = require('./secret/db-config.json');
var connPool = bluebird.promisifyAll(mysql.createPool(dbConfig));

var app = express();
app.use(morgan(process.env.LOG_FORMAT || 'common'));

app.get('/', function(req, res) {
    connPool.queryAsync('select ? as message', ['Hello AWS!'])
        .then(function(rows) {
            res.contentType('text/plain').send('The database says ' + rows[0].message);
        })
        .catch(function(err) {
            res.status(500).contentType('text/plain').send(err.message);
        });
});

app.get('/databases', function(req, res) {
    connPool.queryAsync('show databases')
        .then(function(rows) {
            res.contentType('text/plain');
            var body = '';
            rows.forEach(function(row) {
                body += row.Database + '\n';
            });
            res.send(body);
        });
});

app.listen(80, function() {
    console.log('server listening...');
});
