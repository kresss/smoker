'use strict';

var app = require('../..');
import request from 'supertest';

var newTemperature;

describe('Temperature API:', function() {

  describe('GET /api/temperatures', function() {
    var temperatures;

    beforeEach(function(done) {
      request(app)
        .get('/api/temperatures')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          temperatures = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(temperatures).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/temperatures', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/temperatures')
        .send({
          probe: 'Meat',
          value: 77.8
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTemperature = res.body;
          done();
        });
    });

    it('should respond with the newly created temperature', function() {
      expect(newTemperature.probe).to.equal('Meat');
      expect(newTemperature.value).to.equal(77.8);
      expect(newTemperature.time).to.exist;
    });

  });

  describe('GET /api/temperatures/:id', function() {
    var temperature;

    beforeEach(function(done) {
      request(app)
        .get('/api/temperatures/' + newTemperature._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          temperature = res.body;
          done();
        });
    });

    afterEach(function() {
      temperature = {};
    });

    it('should respond with the requested temperature', function() {
      expect(newTemperature.probe).to.equal('Meat');
      expect(newTemperature.value).to.equal(77.8);
      expect(newTemperature.time).to.exist;
    });

  });

  describe('PUT /api/temperatures/:id', function() {
    var updatedTemperature;

    beforeEach(function(done) {
      request(app)
        .put('/api/temperatures/' + newTemperature._id)
        .send({
          probe: 'Pit',
          value: 88.8
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTemperature = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTemperature = {};
    });

    it('should respond with the updated temperature', function() {
      expect(updatedTemperature.probe).to.equal('Pit');
      expect(updatedTemperature.value).to.equal(88.8);
      expect(updatedTemperature.time).to.exist;
    });

  });

  describe('DELETE /api/temperatures/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/temperatures/' + newTemperature._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when temperature does not exist', function(done) {
      request(app)
        .delete('/api/temperatures/' + newTemperature._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
