const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const passport = require('passport');

// router.post('/register', authController.register);

router.get('/login', passport.authenticate('google'), (req, res) => { });

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.redirect('/auth/google'); 
    });
});

router.get('/google', (req, res) => {
    res.send(req.session.user !== undefined ? "LoggedIn as " + req.session.user : "Not logged in");
});

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/auth/google'); // Redirect to a page after logout
    //res.status(200).json({ message: 'Logged in with Google successfully' });
});

// router.get('/google/logout', authController.googleLogout);
// router.get('/protected', authController.protectedRoute);

module.exports = router;