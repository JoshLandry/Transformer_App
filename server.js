'use strict';
var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/transphorm_app_development');

var app = express();
app.use(express.static(__dirname + '/build'));
var transphormRouter = express.Router();

routes(transphormRouter);

app.use('/api/v1', transphormRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));
});
