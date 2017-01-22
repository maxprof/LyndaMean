'use strict';

var _Message = require('../models/Message');

var _Message2 = _interopRequireDefault(_Message);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    messagePost: function messagePost(req, res) {
        var body = req.body;
        var newMessage = new _Message2.default(body);
        newMessage.user = req.user;
        newMessage.save(function (err, newMsg) {
            if (err) return res.status(500).send(err);
            return res.status(200);
        });
    },
    messageGet: function messageGet(req, res) {
        _Message2.default.find({}).populate('user', '-pwd').exec(function (err, messages) {
            if (err) return res.status(500).send({ message: err });
            return res.send(messages);
        });
    }
};