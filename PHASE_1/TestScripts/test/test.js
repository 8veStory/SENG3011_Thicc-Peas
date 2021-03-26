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
    it('200 response', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get('/diseases')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(done);
    });
    it('has salmonella with all correct values', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get('/diseases?disease_names=salmonella')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.length == 1);
                assert(res.body[0].name == 'salmonella');
                assert(res.body[0].disease_id == '777d1c109f5eef1d64c418062a918d33');
                var hardcoded = [ 'diarrhea', 'fever', 'stomach cramps' ];
                var actual = res.body[0].symptoms;
                assert(hardcoded.length == actual.length);
                assert(hardcoded.every(function(u, i) {
                    return u === actual[i];
                }));
            })
            .end(done);
    });
});

describe('GET /disease/id for salmonella', function(){
    it('200 response', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get(`/disease/777d1c109f5eef1d64c418062a918d33`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(done);
    });
    it('gets salmonella with all correct values and a correct article', function(done) {
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

describe('GET /articles', function(){
    it('200 response', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get('/articles')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(done);
    });
    it('has salmonella with all correct values', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get('/articles?disease_names=salmonella')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.length == 1);
                assert(res.body[0].name == 'salmonella');
                assert(res.body[0].disease_id == '777d1c109f5eef1d64c418062a918d33');
                var hardcoded = [ 'diarrhea', 'fever', 'stomach cramps' ];
                var actual = res.body[0].symptoms;
                assert(hardcoded.length == actual.length);
                assert(hardcoded.every(function(u, i) {
                    return u === actual[i];
                }));
            })
            .end(done);
    });
});

describe('GET /article/id for salmonella', function(){
    it('200 response', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get(`/article/777d1c109f5eef1d64c418062a918d33`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(done);
    });
    it('gets salmonella with all correct values and a correct article', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get(`/article/777d1c109f5eef1d64c418062a918d33`)
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


// mocha test stuff
// var assert = require('assert');
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

// REPORT TESTING
describe('GET /reports', function(){
    it('should respond with a json 200 response with URL in request', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get('/reports')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    });
    it ('can produce a list of all reports published on outbreaks between given parameters in the form YYYY-MM-DD', function(){
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
        .get('/reports?start_date=2020-12-01&end_date=2021-03-01')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
            assert(res.length > 0);
        })
        .end();
    });
    it ('can produce a list of all reports published on outbreaks at a certain location', function(){
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
        .get('/reports?location=USA')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
            assert(res.length > 0);
        })
        .end();
    });
    it ('can produce a list of all reports published on outbreaks containing a desired keyword', function(){
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
        .get('/reports?key_terms=hedgehog')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
            assert(res.length > 0);
        })
        .end();
    });
});

describe('GET /report/{reportID}', function(){
    it('should respond with a json 200 response with URL in request', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get('/report/1ed7bef50165f63747e64fc1814fb517')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    });
});
