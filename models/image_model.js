var mongoose = require('mongoose');
// var User = require('./user_model');
var Schema = mongoose.Schema;
var moment = require('moment');

var imageSchema = new Schema ({
  imageName: String,
  imageContent: Buffer,
  postedDate: {type: String, default: moment().format('MM DD YY')},
  // postedBy: {type: Schema.Types.ObjectId, ref: 'User'}
  postedBy: String
});

module.exports = mongoose.model('image', imageSchema);
