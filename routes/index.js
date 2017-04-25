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

router.get('/account', function (req, res) {
  res.render('account', { title: 'Success' });
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

// Logout
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
