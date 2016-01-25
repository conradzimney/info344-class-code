'use strict';

var mysql = require('mysql');
var bluebird = require('bluebird');

// load connection information
var dbConfig = require('./secret/config-maria.json');

// create a connection to the database
var conn = bluebird.promisifyAll(mysql.createConnection(dbConfig));

// id of newly inserted row
var id;

function logRow(row) {
    console.log(row);
}

function logRows(rows) {
    rows.forEach(logRow);
}

conn.queryAsync('insert into stories (url) values (?)', ['http://google.com'])
    .then(function(results) {
        console.log('Row inserted, new id = %s', results.insertId);
        id = results.insertId;
        return conn.queryAsync('select * from stories where id=?', [results.insertId]);
    })
    .then(logRows)
    .then(function() {
        return conn.queryAsync('update stories set votes=votes+1 where id=?', [id]);
    })
    .then(function(results) {
        console.log('%d rows affected', results.affectedRows);
        return conn.queryAsync('select * from stories where id=?', [id]);
    })
    .then(logRows) // passes reference to function logRows for when the promise completes
    .then(function() {
        return conn.queryAsync('delete from stories where id=?', [id]);
    })
    .then(function(results) {
        console.log('%d rows affected', results.affectedRows);
    })
    .then(function() {
        conn.end();
    })
    .catch(function(err) {
       console.error(err);
       conn.end(); 
    });

// Promises will replace this code
/*
conn.query('select * from stories', function(err, rows) {
    if (err) {
        console.error(err);
    } else {
        console.log('%d rows returned', rows.length);
        
        rows.forEach(function(row) {
           console.log(row); 
        });
    }
    conn.end();
});
*/
