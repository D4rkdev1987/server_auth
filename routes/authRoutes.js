const passport = require('passport');

//route handeler ..when user comes to route it goes to oauth flow from passport
module.exports = (app) => {
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
        scope: ['profile', 'email']
        })
    );
    //google strategy will take code from user and turn into a profile using passport...from first route handeler
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });
    //req and res -incoming request and out going response
    app.get('/api/current_user', (req, res) => {
      res.send(req.user);
    }); 
};