var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { });
});

router.get('/login', function (req, res) {
  res.render('login', { title: 'Login' });
});

// Facebook Login
router.get('/auth/facebook',
  passport.authenticate('facebook'),
  function (req, res) {});
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/account');
  }
);

// Google Login
router.get('/auth/google',
  passport.authenticate('google', { scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read'
    ] }
  )
);
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
  }
);

// Logout
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/games/galactic-warrior', function (req, res) {
    res.render('games/galactic-warrior', { title: 'Play Galactic Warrior' });
});

module.exports = router;
