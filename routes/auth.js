const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const passport = require('passport');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }), (req, res) => {
    //#swagger.tags=["Auth/Login"]
});

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.status(200).json({ message: 'Logged in with Google successfully' });
});
router.get('/google/logout', authController.googleLogout);
router.get('/protected', authController.protectedRoute);

module.exports = router;