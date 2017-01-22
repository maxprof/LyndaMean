import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
const vLogger = require('log4js').getLogger();
const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/Tonika');
mongoose.connection
.on('error', function() {
    vLogger.warn('MongoDB Connection Error. Make sure MongoDB is running.');
})
.on('connected', function(){
    vLogger.info('MongoDB connected successfully.');
    require('./config/routes')(app);

});
require('./config/routes.js')(app);
const server = app.listen(5000, () => {
    console.log("Server raning on port: " + server.address().port);
}); 