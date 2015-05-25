'use strict';
var imageModel = require('./models/Image');
var bodyparser = require('body-parser');

module.exports = function (router) {

	router.use(bodyparser.json());

	router.get('/images', function(req,res) {
		imageModel.find({}, function(err, data) {
			if(err) return res.status(500).send({'msg': 'the goats ran off, and could not be retrieved.'});

			res.json(data);
		});
	});

	router.post('/images', function(req,res) {
		var newImage = new imageModel(req.body);
		newImage.save(function(err, note) {
			if (err) return res.status(500).send({'msg': 'could not save goat.'});

			res.json(note);
		});
	});

	router.put('/images/:id', function(req, res) {
	    var updatedImage = req.body;
	    delete updatedImage._id;
	    imageModel.update({_id: req.params.id}, updatedImage, function(err) {
	      if (err) return res.status(500).send({'msg': 'this goat has proved resistant to update.'});

	      res.json(req.body);
	    });
	});

	router.delete('/images/:id', function(req, res) {
    	imageModel.remove({_id: req.params.id}, true);
    	res.end();
  	});

};