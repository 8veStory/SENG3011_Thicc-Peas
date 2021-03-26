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
    it('gets an ebola article within 2020', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get('/articles?start_date=2020-01-01&end_date=2020-12-31&key_terms=ebola')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.length == 1);
                assert(res.body[0].headline == 'DEMOCRATIC REPUBLIC OF THE CONGO (formerly ZAIRE) Ebola Virus Outbreak 2020');
                assert(res.body[0].main_text.match(/^The DRC government declared a new Ebola outbreak.*/));
                assert(res.body[0].date_of_publication == '2020-06-01T00:00:00.000Z');
                assert(res.body[0].url == 'https://www.cdc.gov/vhf/ebola/history/chronology.html');
                assert(res.body[0].reports.length == 1);
            })
            .end(done);
    });
});

describe('GET /article/id for same report as in /articles test', function(){
    it('200 response', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get(`/article/ac908d92d6512fd9cb134694fa02f532`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(done);
    });
    it('got the same article with all the same fields', function(done) {
        request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
            .get(`/article/ac908d92d6512fd9cb134694fa02f532`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.article_id == 'ac908d92d6512fd9cb134694fa02f532');
                assert(res.body.headline == 'DEMOCRATIC REPUBLIC OF THE CONGO (formerly ZAIRE) Ebola Virus Outbreak 2020');
                assert(res.body.main_text.match(/^The DRC government declared a new Ebola outbreak.*/));
                assert(res.body.date_of_publication == '2020-06-01T00:00:00.000Z');
                assert(res.body.url == 'https://www.cdc.gov/vhf/ebola/history/chronology.html');
                assert(res.body.reports.length == 1);
            })
            .end(done);
    });
});

// describe('GET /diseases', function(){
//     it('200 response - has salmonella', function(done) {
//         request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
//             .get('/diseases')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//                 var contains = false;
//                 for (var i = 0; i < res.body.length; i++) {
//                     if (res.body[i].name == 'salmonella') {
//                         id = res.body[i].disease_id;
//                         contains = true;
//                     }
//                 }
//                 assert(contains);
//             })
//             .end(done);
//     });
// });

// describe('GET /diseases', function(){
//     it('200 response - has salmonella', function(done) {
//         request('https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app')
//             .get('/diseases')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//                 var contains = false;
//                 for (var i = 0; i < res.body.length; i++) {
//                     if (res.body[i].name == 'salmonella') {
//                         id = res.body[i].disease_id;
//                         contains = true;
//                     }
//                 }
//                 assert(contains);
//             })
//             .end(done);
//     });
// });


// mocha test stuff
// var assert = require('assert');
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });