// load items
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

// load user model
var User = require('../models/user');

// load auth keys
var configAuth = require('../config/oauth');

// expose function
module.exports = function (passport) {

    // Passport Setup
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // ===============
    // Local =========
    // ===============

    // Local Signup
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            process.nextTick(function () {
                User.findOne({'local.email': email}, function(err, existingUser) {

                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if there's already a user with that email
                    if (existingUser)
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));

                    //  If we're logged in, we're connecting a new local account.
                    if(req.user) {
                        var user = req.user;
                        user.local.email = email;
                        user.local.password = user.generateHash(password);
                        user.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, user);
                        });
                    }
                    //  We're not logged in, so we're creating a brand new user.
                    else {
                        // create the user
                        var newUser = new User();

                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            return done(null, newUser);
                        });
                    }

                });
            });
        }));

    // Local Login
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            User.findOne({'local.email': email}, function (err, user) {
                // return any errors found
                if (err)
                    return done(err)
                // if no user found or wrong password
                if (!user || !user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Invalid username/password'));
                // if good, return user
                return done(null, user);
            });
        }));

    // ================
    // Facebook =======
    // ================

    passport.use(new FacebookStrategy({
            // pull app id and secret
            clientID: configAuth.facebook.clientID,
            clientSecret: configAuth.facebook.clientSecret,
            callbackURL: configAuth.facebook.callbackURL,
            profileFields: ['emails', 'displayName'],
            passReqToCallback: true
        },
        function (req, token, refreshToken, profile, done) {
            //process.nextTick(function () {
            if (!req.user) {
                User.findOne({'facebook.id': profile.id}, function (err, user) {
                    // if error, stop and return
                    if (err)
                        return done(err);
                    // if user is found, log in
                    if (user) {
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name = profile.name.displayName;
                            user.facebook.email = profile.emails[0].value;

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {
                        // if no user found, create them
                        var newUser = new User();

                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name = profile.displayName;
                        //newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;

                        //save user
                        newUser.save(function (err) {
                            if (err)
                                throw err;

                            // if success, return new user
                            return done(null, newUser);
                        });
                    }
                });
                //});
            } else {
                var user = req.user;

                user.facebook.id = profile.id;
                user.facebook.token = token;
                user.facebook.name = profile.displayName;
                user.facebook.email = profile.emails[0].value;

                user.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
        }));

    // ================
    // Google =========
    // ================

    passport.use(new GoogleStrategy({
            // pull app id and secret
            clientID: configAuth.google.clientID,
            clientSecret: configAuth.google.clientSecret,
            callbackURL: configAuth.google.callbackURL,
            passReqToCallback: true
        },
        function (req, token, refreshToken, profile, done) {
            if (!req.user) {
                User.findOne({'google.id': profile.id}, function (err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        if (!user.google.token) {
                            user.google.token = token;
                            user.google.name = profile.name.displayName;
                            user.google.email = profile.emails[0].value;

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {
                        var newUser = new User();

                        newUser.google.id = profile.id;
                        newUser.google.token = token;
                        newUser.google.name = profile.displayName;
                        newUser.google.email = profile.emails[0].value;

                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            } else {
                var user = req.user;

                user.google.id = profile.id;
                user.google.token = token;
                user.google.name = profile.displayName;
                user.google.email = profile.emails[0].value;

                user.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
        }));
};