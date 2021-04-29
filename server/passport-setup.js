const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: `${process.env.GOOGLEID}`,
    clientSecret: `${process.env.GOOGLESECRET}`,
    callbackURL: `${process.env.CALLBACKURL}`
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));