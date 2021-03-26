// chai stuff
var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style

// supertest stuff
const request = require('supertest');
const express = require('express');

const app = express();

describe('GET /diseases', function(){
    it('should respond with a json 200 response with URL in request', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get('/diseases')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(done);
    });
});

describe('GET /diseases', function(){
    it('should respond with a json 200 response with URL in request', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get('/diseases')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(done);
    });
});

// mocha test stuff
// var assert = require('assert');
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });
