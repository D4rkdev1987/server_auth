const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
//below tells cookies to use passport for the authentication
app.use(passport.initialize());
app.use(passport.session());

//below requiring routes files returns a function and immideiatly calls the function I required and app is passed into arrow function
require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);