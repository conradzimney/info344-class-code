'use strict';

var bcrypt = require('bcrypt');
var express = require('express');
var port = 9000;

var app = express();

//serve static files from the /static subdirectory
app.use(express.static(__dirname + '/static'));

//API route to get the bcrypt hash for a password
//this is just to illustrate a compute-intensive
//operation so that you can see the benefits of scaling
app.get('/api/bcrypt', function(req, res) {
    var pwd = req.query.p;
    if (!pwd) {
        return res.status(400).json({message: "usage: /api/bcrypt?p=password&rounds=13"});
    }
    
    var rounds = parseInt(req.query.rounds);
    
    //default rounds to 13
    if (isNaN(rounds)) {
        rounds = 13;
    }
    
    //cap the rounds at 15 so that we don't
    //start something that will never end
    rounds = Math.min(rounds, 15);
    
    res.json({
        hash: bcrypt.hashSync(pwd, rounds),
        rounds: rounds
    });
    
});

app.listen(port, function() {
    console.log('server listening on port %d', port);
});
