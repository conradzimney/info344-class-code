"use strict";

function add2(number) {
    var promise = new Promise(function(resolve, reject) {
        resolve(number);
    })
    .then(function(number) {
        return number+1;
    })
    .then(function(number) {
        return number+1;
    })
    .then(function(number) {
        console.log(number);
    });    
};
    
add2(0);

var http = require('http');

function get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        // Do the usual request stuff
        http.get(url, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                resolve(body);
            });
        }).on('error', function(err) {
            reject(err);
        });
    });
};

function getMovie(movieId) {
    get("http://www.omdbapi.com/?i=" + movieId + "&plot=short&r=json")
        .then(function(url) {
            console.log(JSON.parse(url));
        })
        .catch(function(err) {
            console.error(err);
        });   
};

getMovie('tt0120737');


