'use strict';

module.exports = function (app) {
    var randomstring = require("randomstring");
    var path = require('path');
    var async = require('async');
    var main = require('../controllers/main.js');
    var auth = require('../controllers/auth');
    var jwt = require('jwt-simple');
    var moment = require('moment');
    var checkAuthenticated = require('../services/checkAuthenticate');
    var cors = require('../services/cors');
    app.use(cors);
    app.post('/api/message', checkAuthenticated, main.messagePost);
    app.get('/api/message', main.messageGet);
    app.post('/auth/register', auth.register);
    app.post('/auth/login', auth.login);
};