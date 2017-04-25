var express = require('express');
var router = express.Router();
var passport = require('passport');

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