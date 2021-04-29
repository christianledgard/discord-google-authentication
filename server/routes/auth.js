const router = require('express').Router();
const util = require('../../utils/util');
const users = new Map();
const { EventEmitter } = require('events');
const authenticate = new EventEmitter;
const passport = require('passport');
const path = require('path');
require('../passport-setup');

function startSession(req, res, next) {
    req.session.guild = req.params.guild;
    req.session.user = req.params.user;
    next();
}

router.get('/:guild/:user', startSession, passport.authenticate('google', { scope: ['profile', 'email'] }));

// Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

router.get('/succeed', isLoggedIn, (req, res) => {
    try {
        let decryptedGuildId = util.decrypt(req.session.guild);
        let decryptedUserId = util.decrypt(req.session.user);
        req.guildId = decryptedGuildId;
        req.userId = decryptedUserId;
        let hash = util.generateHash();
        authenticate.emit('visited', hash, req.guildId, req.userId, req.user.displayName);
    
        res.sendFile(path.join(__dirname, '../../views/success.html'));
    }
    catch (err) {
        console.log(err);
        res.send({ 'error':'Invalid URL.'});
    }
});

module.exports = { router, authenticate };