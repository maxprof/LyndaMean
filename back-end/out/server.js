'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vLogger = require('log4js').getLogger();
var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
_mongoose2.default.connect('mongodb://localhost:27017/Tonika');
_mongoose2.default.connection.on('error', function () {
    vLogger.warn('MongoDB Connection Error. Make sure MongoDB is running.');
}).on('connected', function () {
    vLogger.info('MongoDB connected successfully.');
    require('./config/routes')(app);
});
require('./config/routes.js')(app);
var server = app.listen(5000, function () {
    console.log("Server raning on port: " + server.address().port);
});