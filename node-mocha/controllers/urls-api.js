'use strict';

var express = require('express');

module.exports.Router = function(urls) {
    var router = express.Router();
    
    router.post('/urls', function(req, res, next) {        
        urls.insert(req.body.url)
            .then(function(shortPath) {
                res.json({shortPath: shortPath});
            })
            .catch(next);
    });
    
    router.get('/urls/:shortUrl', function(req, res, next) {
        urls.resolve(req.params.shortUrl)
            .then(function(url) {
                res.json({url: url});
            })
            .catch(next);
    });
    
    router.delete('/urls/:shortUrl', function(req, res, next) {
        urls.remove(req.params.shortUrl)
            .then(function(results) {
                res.json({message: 'deleted'});
            })
            .catch(next);
    });
    
    return router;
};
