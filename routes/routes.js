module.exports = function (app, passport) {
    // Homepage
    app.get('/', function (req, res) {
        res.render('index', { user: req.user });
    });

    // Profile Section
    // use middleware to prevent non-auth signin
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile', {
            user: req.user
        });
    });

    // Logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    /** Authentication **/

    // Login
    app.get('/login', function (req, res) {
        res.render('login', {message: req.flash('loginMessage')});
    });
    // Process login
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // Signup
    // show signup
    app.get('/signup', function (req, res) {
        res.render('signup', {message: req.flash('signupMessage')});
    });
    // process signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    // Facebook
    // auth and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    // handle callback
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    // Google
    // auth and login
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // handle callback
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    /** Authorize **/

    // local
    app.get('/connect/local', function (req, res) {
        res.render('connect-local', { message: req.flash('loginMessage') });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/connect/local',
        failureFlash: true
    }));

    // facebook
    app.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));
    app.get('/connect/facebook/callback', passport.authorize('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    // google
    app.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));
    app.get('/connect/google/callback', passport.authorize('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    /** Unlink Accounts **/

    // local
    app.get('/unlink/local', function(req, res) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook
    app.get('/unlink/facebook', function(req, res) {
        var user = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google
    app.get('/unlink/google', function(req, res) {
        var user = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });
};

// logged in middleware
function isLoggedIn(req, res, next) {
    // check to see if logged in
    if (req.isAuthenticated())
        return next();

    // if not redirect to login
    res.redirect('/login');
}