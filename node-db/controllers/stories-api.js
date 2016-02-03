'use strict';

<<<<<<< HEAD
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

module.exports.Router = function(Story) {
    var router = express.Router();
    
    router.get('/stories', function(req, res, next) {
        // return all stories from the database 
        Story.getAll()
=======
var express = require('express');           //sub-routers 
var request = require('request');           //request URLs
var htmlparser = require('htmlparser2');    //parse html

module.exports.Router = function(stories) {
    //create a new Express Router
    //an Express application is a router, but we can also
    //create sub-routers that we can add to the application
    //this router will handle all routes related to stories
    var router = express.Router();
    
    //GET /stories
    router.get('/stories', function(req, res, next) {
        //return the first page of stories from the database
        //TODO: support offset and limit as query string parameters
        //so the clients can page through all stories
        stories.getAll()
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a
            .then(function(rows) {
                res.json(rows);
            })
            .catch(next);
    });
    
<<<<<<< HEAD
    router.post('/stories', function(req, res, next) {
        // insert a new story into the database
        // and return the data with default values applied
        request.get(req.body.url, function(err, response, body) {
            if (err) {
                req.body.title = req.body.url;
            }
            else {
                var $ = cheerio.load(body);
                req.body.title = $('head title').text();     
            }
            
            Story.insert(req.body)
                .then(function(row) {
                    res.json(row);
                })
                .catch(next);
        });
        
    });
    
    router.post('/stories/:id/votes', function(req, res, next) {  // : is wild card, anything can follow it
        // upvote the story and return the full story
        // with current number of votes 
        Story.upVote(req.params.id)
=======
    //POST /stories
    router.post('/stories', function(req, res, next) {
        //insert a new story into the database
        //and return the data with default values
        //applied
        
        //TODO: validate that req.body.url exists and is a valid URL
        
        //fetch the HTML for the new URL
        var inTitleElem = false;
        //create a new WriteableStream parser
        //this takes a set of callbacks that are called when the parser
        //encounters an open tag, text, and a close tag
        var parser = new htmlparser.WritableStream({
            //called whenever the parser encounters an open tag
            onopentag: function(name, attrs) {
                //detect if the tag is named 'title' 
                inTitleElem = ('title' === name);
            },
            ontext: function(text) {
                //if we are in the title element
                if (inTitleElem) {
                    //ontext may be called several times, so append
                    //the text value to req.body.title, or set 
                    //req.body.title if it doesn't exist yet
                    if (req.body.title) {
                        req.body.title += text;
                    }
                    else {
                        req.body.title = text;
                    }
                }
            },
            onclosetag: function() {
                //once the tag closes we are no longer
                //in the title element by definition
                inTitleElem = false;
            }
        }, {decodeEntities: true});
        
        //get the URL and pipe it into the parser
        request.get(req.body.url, {followRedirect: false})
            .on('error', function() {
                console.error('error requesting page, using url for title');
                req.body.title = req.body.url;
            })
            .on('end', function() {
                //insert the new story
                stories.insert(req.body)
                    .then(function(row) {
                        //echo back the story with all default values applied
                        res.json(row);
                    })
                    .catch(next); //forwards the error to Express                                
            })
            .pipe(parser);
            
    });
    
    //POST /stories/1234/votes
    //the :id is like a wildcard--it matches any value
    //and express will make the value it matches available as req.params.id
    router.post('/stories/:id/votes', function(req, res, next) {
        //upvote the story and return the
        //full story with current number of votes
        //the property on req.params will have the same name as whatever
        //you had following the : in the URL
        stories.upVote(req.params.id)
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a
            .then(function(row) {
                res.json(row);
            })
            .catch(next);
    });
    
    return router;
<<<<<<< HEAD
};
=======
};
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a
