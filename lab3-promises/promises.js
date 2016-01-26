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

// getMovie('tt0120737');

function getThreeMovies(id1, id2, id3) {
    get("http://www.omdbapi.com/?i=" + id1 + "&plot=short&r=json")
        .then(function(url) {
            console.log(JSON.parse(url));
        })
        .catch(function(err) {
            console.error(err);
        })
    get("http://www.omdbapi.com/?i=" + id2 + "&plot=short&r=json")
        .then(function(url) {
            console.log(JSON.parse(url));    
        })
        .catch(function(err) {
            console.error(err);
        });
    get("http://www.omdbapi.com/?i=" + id3 + "&plot=short&r=json")
        .then(function(url) {
            console.log(JSON.parse(url));
        })
        .catch(function(err) {
            console.error(err);
        });            
};

// getThreeMovies('tt0120737','tt0120737','tt0120737');

function getThreeMoviesConcurrently(id1, id2, id3) {
    Promise.all([get("http://www.omdbapi.com/?i=" + id1 + "&plot=short&r=json"), get("http://www.omdbapi.com/?i=" + id2 + "&plot=short&r=json"), get("http://www.omdbapi.com/?i=" + id3 + "&plot=short&r=json")])
        .then(function(urls) {
            urls.forEach(function(url) {
                console.log(JSON.parse(url));    
            });    
        })
        .catch(function(err) {
            console.error(err);
        });
};

// getThreeMoviesConcurrently('tt0120737','tt0120737','tt0120737');

function getMoviePoster(movieId) {
    var movieJSON = {};
    get("http://www.omdbapi.com/?i=" + movieId + "&plot=short&r=json")
        .then(function(url) {
            movieJSON = JSON.parse(url);
        })
        .catch(function(err) {
            console.error(err);
        });
    console.log(movieJSON);
    //var image = movieJSON['Poster'];
    //console.log(image);
};

getMoviePoster('tt0120737');


