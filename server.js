'use strict';
var express = require('express');
var mongoose = require('mongoose');
var imageRoutes = require('./routes/image_routes');
var http = require('http');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/transformerapp_development');

var app = express();
var transformerAppRouter = express.Router();

imageRoutes(transformerAppRouter);

app.use('/', transformerAppRouter);

app.listen(process.env.PORT || 8000, function () {
	console.log('server listening on port ' + (process.env.PORT || 8000));
});
