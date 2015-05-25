'use strict';

var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	imageDesc: String,
	imageName: String,
  imageContent: Buffer
});

module.exports = mongoose.model('Image', imageSchema);