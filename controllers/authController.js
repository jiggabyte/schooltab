const bcrypt = require('bcrypt');
const passport = require('passport');
const mongodb = require('../db/connect');


/*
const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const db = mongodb.getDb().db();
        const result = await db.collection('users').insertOne({ username, password: hashedPassword });

        res.status(201).json({ message: 'User registered', userId: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const db = mongodb.getDb().db();
        const user = await db.collection('users').findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Login failed' });
            }
            res.status(200).json({ message: 'Logged in successfully' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

*/

const login = () => passport.authenticate('google', { scope: ['profile', 'email'] });

const logout = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.redirect('/auth/google'); // Redirect to a page after logout
        // res.status(200).json({ message: 'Logged out successfully' });
    });
};



// const googleCallback = passport.authenticate('google', { failureRedirect: '/login' });

/*
const googleLogout = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.status(200).json({ message: 'Logged out from Google successfully' });
    });
};
*/

/*
const protectedRoute = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }
    res.status(200).json({ data: 'This is protected data only accessible to logged-in users.' });
};
*/



module.exports = {
    // register,
    login,
    logout,
    // googleLogin,
    // googleCallback,
    // googleLogout,
    // protectedRoute,
};