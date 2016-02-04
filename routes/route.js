var express = require('express');
var session = require('express-session');
var utils = require('../utils.js');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');

var authUsers = require('../keys/users.json');
var oath = require('../keys/oath.json');

var router = express.Router();

// Random value used to compute hashes.
router.use(session({ secret: 'fslajfhasflajshfasjgbamnkejr839awaoqmfdmsngansgncxvzv1276543' }));
router.use(passport.initialize());
router.use(passport.session());

// Initialize passport with support for google accounts.
passport.use(new GoogleStrategy({
    clientID: oath.clientId,
    clientSecret: oath.secret,
    callbackURL: "http://localhost:8080/login/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    var email = utils.getEmail(profile);
    if(utils.exist(email, authUsers)) {
      return done(null, email);
    } else {
      return done("You don't have permission");
    }
  }
));

passport.serializeUser(function(email, done) {
    done(null, email);
});

passport.deserializeUser(function(email, done) {
    if(utils.exist(email, authUsers)) {
      return done(null, email);
    } else {
      return done("You don't have permission");
    }
});

router.use(function(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  if (req.user) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
  } else {
    res.redirect('/login');
  }
});

router.get('/login',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.email' })
);


router.get('/login/callback',
  passport.authenticate('google', { failureRedirect: '/login'}),
  function(req, res) {
    req.user = true;
    res.redirect('/');
});

module.exports = router;