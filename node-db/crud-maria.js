'use strict';

<<<<<<< HEAD
var mysql = require('mysql');
var bluebird = require('bluebird');

// load connection information
var dbConfig = require('./secret/config-maria.json');

// create a connection to the database
var conn = bluebird.promisifyAll(mysql.createConnection(dbConfig));

// id of newly inserted row
=======
//mysql driver
var mysql = require('mysql');

//promise wrapper library--converts older
//callback-style APIs in to APIs that return
//JavaScript Promises instead
var bluebird = require('bluebird');

//load connection info
//copy the secret/config-maria.json.template file
//to secret/config-maria.json and enter the correct
//user name and password
var dbConfig = require('./secret/config-maria.json');

//create a connection to the database
//use bluebird.promisfyAll() to turn all the callback-style
//APIs into APIs that return Promises instead
var conn = bluebird.promisifyAll(mysql.createConnection(dbConfig));

//id of newly inserted row
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a
var id;

function logRow(row) {
    console.log(row);
}

function logRows(rows) {
    rows.forEach(logRow);
}

<<<<<<< HEAD
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
=======
//Bluebird adds new methods to the connection object, 
//one for each method in the original interface, but with the name
//<name>Async(); this allows you to use the original callback-style
//methods as well as the new Promise-returning ones
//so query() expects a callback function, but queryAsync() returns a Promise

//insert a new row into our stories table 
//queryAsync() returns a promise, and the funciton passed
//to the Promise's then() method will be executed when the query is complete
//Note the ? is a parameter marker, and just like in PHP, it
//defends against a SQL injection attack
conn.queryAsync('insert into stories (url) values (?)', ['http://google.com'])
     .then(function(results) {
         //this runs only after the query has completed
         //the newly-assigned auto_increment key value is in results.insertId
         console.log('row inserted, new id = %s', results.insertId);
         id = results.insertId;
         
         //select the row from the database
         //this returns another Promise, and the next .then()
         //function will wait for it to complete
         return conn.queryAsync('select * from stories where id=?', [results.insertId]);
     })
     .then(logRows)
     .then(function() {
         //update the row
         return conn.queryAsync('update stories set votes=votes+1 where id=?', [id]);
     })
     .then(function(results) {
         //after the update the number of affected rows is in results.affectedRows
         console.log('%d rows affected', results.affectedRows);
         
         //select the row again to see the updated value
         return conn.queryAsync('select * from stories where id=?', [id]);         
     })
     .then(logRows)
     .then(function() {
         //delete the row
         return conn.queryAsync('delete from stories where id=?', [id]);
     })
     .then(function(results) {
         console.log('%d rows affected', results.affectedRows);
     })
     .catch(function(err) {
         //this function will be called if any of the above
         //generate an error; this is like the catch block
         //of a try/catch in Java
         console.error(err);
     })
    .then(function() {
        //this executes always 
        conn.end();
     });
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a
