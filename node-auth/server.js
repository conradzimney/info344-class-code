'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var ghConfig = require('./secret/oauth-github.json');
ghConfig.callbackURL = 'http://localhost:8080/signin/github/callback';

var ghStrategy = new GitHubStrategy(ghConfig, 
    function(accessToken, refreshToken, profile, done) {
        console.log('Authentication Successful');
        console.dir(profile);
        done(null, profile);    
    });
    
var cookieSigSecret = process.env.COOKIE_SIG_SECRET;
if (!cookieSigSecret) {
    console.error('Please set COOKIE_SIG_SECRET');
    process.exit(1);
}

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session({
    secret: cookieSigSecret,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore()
}));

passport.use(ghStrategy);
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/signin/github', passport.authenticate('github'));
app.get('/signin/github/callback', passport.authenticate('github'),
    function(req, res) {
        res.redirect('/secure.html');    
    });
    
app.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/'); 
});    

app.use(express.static(__dirname + '/static/public'));

app.use(function(req, res, next) {
    // req.isAuthenticated()
    if (req.isAuthenticated()) {
        next();
    } else {
        console.log('You are not an authenticated user!');
        res.redirect('/');
    }
});

app.use(express.static(__dirname + '/static/secure'));

app.listen(80, function() {
    console.log('Server is listening...');
});