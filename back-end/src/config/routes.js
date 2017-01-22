'use strict';

module.exports = function (app) {
    let randomstring = require("randomstring");
    let path = require('path');
    let async = require('async');
    let main = require('../controllers/main.js');
    let auth = require('../controllers/auth');
    let jwt = require('jwt-simple');
    let moment = require('moment');
    let checkAuthenticated = require('../services/checkAuthenticate');
    let cors = require('../services/cors');
    app.use(cors)
    app.post('/api/message', checkAuthenticated, main.messagePost);
    app.get('/api/message', main.messageGet);
    app.post('/auth/register', auth.register);
    app.post('/auth/login', auth.login);
    
    
};
  