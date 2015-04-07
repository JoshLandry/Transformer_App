'use strict';

var bitmapReader = require('./lib/bitmapReader');

var app = function() {
  bitmapReader.invert();
  bitmapReader.random();
};

app();

module.exports = app;
