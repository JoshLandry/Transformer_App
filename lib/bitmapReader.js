'use strict';

var fs = require('fs');
var bitmapReader = exports = module.exports = {}; // jshint ignore:line

bitmapReader.invert = function() {
  var bitmap = fs.readFileSync('./img/test.bmp');
  var colorPalette = bitmap.slice(54, 1078);

  for(var i=0; i<1024; i++) {
    colorPalette[i] = (colorPalette[i] -255) * -1;
  }

  fs.writeFileSync('./img/invertedbmp.bmp', bitmap);
};

bitmapReader.random = function() {
  var bitmap = fs.readFileSync('./img/test.bmp');
  var colorPalette = bitmap.slice(54, 1078);

  for(var i=0; i<1024; i++) {
    colorPalette[i] = colorPalette[i + Math.floor(Math.random() * 10)];
  }

  fs.writeFileSync('./img/randombmp.bmp', bitmap);
};
