'use strict';

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    register: function register(req, res) {
        var body = req.body;
        _User2.default.findOne({ email: body.email }).exec(function (err, user) {
            if (err) return res.status(500).send({ message: err.message });
            if (user) return res.status(409).send({ message: "Email  already exist" });
            var newUser = new _User2.default(body);
            newUser.save(function (err, user) {
                if (err) return res.status(500).send({ message: err.message });
                return res.status(200).send({ token: createToken(user) });
            });
        });
    },
    login: function login(req, res) {
        var body = req.body;
        _User2.default.findOne({ email: body.email }).exec(function (err, user) {
            if (err) return res.status(500).send({ message: err.message });
            if (!user) return res.status(401).send({ message: "Email  or password is invalid" });
            if (req.body.pwd == user.pwd) return res.status(200).send({ token: createToken(user) });
            return res.status(401).send({ message: "Invalid email and/or password" });
        });
    }
};

function createToken(user) {
    var payload = {
        sub: user._id,
        iat: (0, _moment2.default)().unix(),
        exp: (0, _moment2.default)().add(14, 'days').unix()
    };
    return _jwtSimple2.default.encode(payload, 'secret');
}