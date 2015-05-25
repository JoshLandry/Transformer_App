'use strict';

process.env.MONGO_URI = 'mongodb://localhost/goatapp_test';
require('../../server.js');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect;

var entryToPut;

describe('goats api end points', function() {
	after(function(done) {
		mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});

	it('should responsd to a post request', function(done) {
		chai.request('localhost:3000/api/v1')
			.post('/goats')
			.send({goatSays: 'Im a trip of a goat', goatName: 'Josh'})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body).to.have.property('_id');
				entryToPut = res.body._id;
				console.log(entryToPut);
				expect(res.body.goatSays).to.eql('Im a trip of a goat');
				expect(res.body.goatName).to.eql('Josh');
				done();
			});
	});

	it('should respond to a put request', function(done) {
		chai.request('localhost:3000/api/v1')
			.put('/goats/' + entryToPut)
			.send({goatSays: 'Im a goat even more', goatName: 'Josh'})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.goatSays).to.eql('Im a goat even more');
				expect(res.body.goatName).to.eql('Josh');
				done();
			});
	});

	it('should respond to a get request', function(done) {
		chai.request('localhost:3000/api/v1')
			.get('/goats')
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(Array.isArray(res.body)).to.be.true; // jshint ignore:line
      	expect(res.body[0]).to.have.property('goatSays');
				done();
			});
	});

	it('should delete a goat from the database', function(done) {
    	chai.request('localhost:3000/api/v1')
    		.del('/goats/' + entryToPut)
    		.end(function(err, res) {
      			expect(err).to.eql(null);
      			done();
    	});
  });

});