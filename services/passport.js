const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys')
//1 argument takes from mongoose 2 arguments means you are putting into mongoose
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

//inside of constructor below pass in config to authenticate users.. passport use-- makes app aware
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    //callback function below--query below
    (accessToken, refreshToken, profile, done) => {
      //async action below returns a promise
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
            //we already have a record with the given profile ID
          } else {
            //don't have a user record with this ID make a new record
            //mongoose model instance-single record-in the call back it creates a new model instance
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user));
          }
        })
    })
);