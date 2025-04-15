const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require("cors");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();

// Passport Local Strategy
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const db = mongodb.getDb().db();
            const user = await db.collection('users').findOne({ username });
            if (!user) return done(null, false, { message: 'User not found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, false, { message: 'Incorrect password' });

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

// Passport Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log('AccessToken: ', accessToken);
            try {
                const db = mongodb.getDb().db();
                let user = await db.collection('users').findOne({ googleId: profile.id });

                if (!user) {
                    user = await db.collection('users').insertOne({
                        googleId: profile.id,
                        username: profile.displayName,
                        email: profile.emails[0].value,
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id || user.insertedId);
});

passport.deserializeUser(async (id, done) => {
    try {
        const db = mongodb.getDb().db();
        const user = await db.collection('users').findOne({ _id: new mongodb.ObjectId(id) });
        done(null, user);
    } catch (err) {
        done(err);
    }
});

app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req,res,next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers",
            "Origin, X-Request-With, Content-Type, Accept, Z-Key"
        );
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, UPDATE, PATCH");
        next();
    })
    .use(cors({methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH", "OPTIONS"]}))
    .use(cors({origin: "*", credentials: true}))
    .use('/', require('./routes'));

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});