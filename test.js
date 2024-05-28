const request = require('supertest');
const express = require('express');
const path = require('path');
const app = require('./app');

describe('GET /', function() {
  it('should respond with index.html', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});
