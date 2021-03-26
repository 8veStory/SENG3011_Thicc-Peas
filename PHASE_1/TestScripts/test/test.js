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
    it('200 response and has salmonella', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get('/diseases')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                var contains = false;
                for (var i = 0; i < res.body.length; i++) {
                    if (res.body[i].name == 'salmonella') {
                        contains = true;
                        assert(res.body[i].name == 'salmonella');
                        assert(res.body[i].disease_id == '777d1c109f5eef1d64c418062a918d33');
                        var hardcoded = [ 'diarrhea', 'fever', 'stomach cramps' ];
                        var actual = res.body[i].symptoms;
                        assert(hardcoded.length == actual.length);
                        assert(hardcoded.every(function(u, i) {
                            return u === actual[i];
                        }));
                    }
                }
                assert(contains);
            })
            .end(done);
    });
});

describe('GET /disease/777d1c109f5eef1d64c418062a918d33 for salmonella', function(){
    it('200 response and gets salmonella from id', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get(`/disease/777d1c109f5eef1d64c418062a918d33`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.name == 'salmonella');
                assert(res.body.disease_id == '777d1c109f5eef1d64c418062a918d33');
                var hardcoded = [ 'diarrhea', 'fever', 'stomach cramps' ];
                var actual = res.body.symptoms;
                assert(hardcoded.length == actual.length);
                assert(hardcoded.every(function(u, i) {
                    return u === actual[i];
                }));
                var contains = false;
                for (var i = 0; i < res.body.reports.length; i++) {
                    if (res.body.reports[i].article_id == '0e9180c5077aaa569381beba67e56d96') {
                        contains = true;
                        assert(res.body.reports[i].report_id == 'c30962a8ba75e5c849fb5f8421a988fc');
                        assert(res.body.reports[i].article_id == '0e9180c5077aaa569381beba67e56d96');
                        assert(res.body.reports[i].event_date == '2015-10-16T00:00:00.000Z');
                        assert(res.body.reports[i].location == 'USA');
                    }
                }
                assert(contains);
            })
            .end(done);
    });
});

describe('GET /diseases', function(){
    it('200 response - has salmonella', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get('/diseases')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                var contains = false;
                for (var i = 0; i < res.body.length; i++) {
                    if (res.body[i].name == 'salmonella') {
                        id = res.body[i].disease_id;
                        contains = true;
                    }
                }
                assert(contains);
            })
            .end(done);
    });
});

describe('GET /diseases', function(){
    it('200 response - has salmonella', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get('/diseases')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                var contains = false;
                for (var i = 0; i < res.body.length; i++) {
                    if (res.body[i].name == 'salmonella') {
                        id = res.body[i].disease_id;
                        contains = true;
                    }
                }
                assert(contains);
            })
            .end(done);
    });
});

describe('GET /diseases', function(){
    it('200 response - has salmonella', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get('/diseases')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                var contains = false;
                for (var i = 0; i < res.body.length; i++) {
                    if (res.body[i].name == 'salmonella') {
                        id = res.body[i].disease_id;
                        contains = true;
                    }
                }
                assert(contains);
            })
            .end(done);
    });
});

describe('GET /diseases', function(){
    it('200 response - has salmonella', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get('/diseases')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                var contains = false;
                for (var i = 0; i < res.body.length; i++) {
                    if (res.body[i].name == 'salmonella') {
                        id = res.body[i].disease_id;
                        contains = true;
                    }
                }
                assert(contains);
            })
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
