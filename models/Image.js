'use strict';

var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	imageDesc: String,
	imageName: String,
  imageURL: String,
});

module.exports = mongoose.model('Image', imageSchema);