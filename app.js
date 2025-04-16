const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require("cors");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcrypt');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();



app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers",
            "Origin, X-Request-With, Content-Type, Accept, Z-Key"
        );
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, UPDATE, PATCH");
        next();
    })
    .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH", "OPTIONS"] }))
    .use(cors({ origin: "*", credentials: true }))
    .use('/', require('./routes'));

// Passport Github OAuth Strategy
passport.use(
    new GithubStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log('AccessToken: ', accessToken);
            try {
                /*
                const db = mongodb.getDb().db();
                let user = await db.collection('users').findOne({ googleId: profile.id });

                if (!user) {
                    user = await db.collection('users').insertOne({
                        googleId: profile.id,
                        username: profile.displayName,
                        email: profile.emails[0].value,
                    });
                }
                */
                return done(null, profile);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

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