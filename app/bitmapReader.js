'use strict';

var fs = require('fs');
var bitmapReader = exports = module.exports = {}; // jshint ignore:line

bitmapReader.invert = function(input) {
  var bitmap = fs.readFileSync('./img/' + input + '.bmp');
  var colorPalette = bitmap.slice(54, 1078);

  for(var i=0; i<1024; i++) {
    colorPalette[i] = (colorPalette[i] -255) * -1;
  }

  fs.writeFileSync('./img/invertedbmp.bmp', bitmap);
};

bitmapReader.random = function(input) {
  var bitmap = fs.readFileSync('./img/' + input + '.bmp');
  var colorPalette = bitmap.slice(54, 1078);

  for(var i=0; i<1024; i++) {
    colorPalette[i] = colorPalette[i + Math.floor(Math.random() * 10)];
  }

  fs.writeFileSync('./img/randombmp.bmp', bitmap);
};

bitmapReader.colorStep = function(input) {
  var bitmap = fs.readFileSync('./img/' + input + '.bmp');
  var colorPalette = bitmap.slice(54, 1078);

  for(var i=0; i<1024; i++) {
    colorPalette[i] = colorPalette[i + 1];
  }

  fs.writeFileSync('./img/colorstep.bmp', bitmap);
};