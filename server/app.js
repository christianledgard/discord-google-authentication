const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport');
const cookieSession = require('cookie-session');
const authRoute = require('./routes/auth').router;
var session = require('express-session');
require('./passport-setup');
var http = require('http');
var fs = require('fs');

const users = new Map();

app.use(session({
    secret: "ESTO ES SECRETO",
    resave: true,
    saveUninitialized: true
}));


module.exports = function() {
  http.createServer(app).listen(process.env.PORT);
  console.log(`Listening on port `, process.env.PORT);
}


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRoute);



app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/auth/succeed');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

