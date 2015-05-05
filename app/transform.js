// bitmap reader

var bitmapReader = require('./bitmapReader');

var transformAll = function() {
  bitmapReader.invert('test');
  bitmapReader.random('test');
  bitmapReader.colorStep('test');
};

transformAll();
