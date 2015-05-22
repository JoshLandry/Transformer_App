var image = require('../models/image_model');
var bodyparser = require('body-parser');
var express = require('express');
var moment = require('moment');
// var eat_auth = require('../lib/eat_auth');
// var postingUsername = require('../lib/eat_auth').postingUsername

module.exports = function(app) {

  express.Router().use(bodyparser.json());

  //creates an image
  app.post('/images', function(req, res) {
    var newImage = new image(req.body);
    newImage.postedBy = "test";
    newImage.save(function(err, data) {
      if (err) console.log(err);

      res.json(data);
    });
  });

  //gets all images
  app.get('/images', function(req,res) {
    image.find({}, function(err, data) {
      if(err) console.log(err);

      res.json(data);
    });
  });

};
