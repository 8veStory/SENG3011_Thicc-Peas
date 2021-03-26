// chai stuff
var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style

// supertest stuff
const request = require('supertest');

const deleteLogs = require('../../API_SourceCode/index').deleteLogs;

// const url = 'https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app';
const url = 'http://localhost:3000';

/**
 * Test '/diseases' returns the correct diseases
 * TODO: NOT DONE YET!
 */
describe('GET /diseases', function(){
    it('gives the correct status code and response length.', function(done) {
        request(`${url}`)
            .get('/diseases')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.length == 2);
            })
            .end(done);
    });
    it('?disease_names=chikungunya has correct values and 200 status code', function(done) {
        request(`${url}`)
            .get('/diseases?disease_names=chikungunya')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.length == 1, "Only one disease should have been returned.");

                let disease = res.body[0];
                let correct_symptoms   = [ "fever", "joint pain", "headache", "muscle pain", "joint swelling", "rash" ];
                let correct_report_ids = [ '1d90a471f9379fb1754fa366de1653f3', 'f57edf7b8e51568af08ddf1ba81a2734', '610522d22f202310ae5f8e1cdeac9590', 'def84179f91a114cdffc96b8b1f0d8bc']

                assert(disease.name == 'chikungunya', "Incorrect disease name");
                assert(disease.disease_id == '4a1239ee4df81a98a51a3eb15c5521b3', "Incorrect disease id");

                assert(disease.symptoms.length == correct_symptoms.length, "Incorrect number of symptoms");
                assert(correct_symptoms.every(function(correct_symptom, i) {
                    return correct_symptom === disease.symptoms[i];
                }), "Incorrect symptom details");

                assert(disease.reports.length == correct_report_ids.length, "Incorrect number of reports.");
                let reportIDs = disease.reports.map(report => { return report.report_id; });
                for (reportID of reportIDs) {
                    assert(correct_report_ids.includes(reportID), "Incorrect report ID.");
                }
            })
            .end(done);
    });
    it('?disease_names=cholera has correct values and 200 status code', function(done) {
        request(`${url}`)
            .get('/diseases?disease_names=cholera')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.length == 1, "Only one disease should have been returned.");

                let disease = res.body[0];
                let correct_symptoms     = [ "profuse watery diarrhea, sometimes described as \"rice-water stools\"", "vomiting", "thirst", "leg cramps", "restlessness or irritability", "rapid heart rate", "loss of skin elasticity", "dry mucous membranes", "low blood pressure" ];
                let correct_report_ids   = [ "cc2d456d8d1349fefc6f1868b5a6ad8e", "5d61d0a41744a0e18014a9e508bb5e73", "2cbf376f73106b9610897251d425979e", "b27c5e8d32889b7b90cd474fb32c8856", "f8248f4695a4112e938c120fd22dfa63" ];

                assert(disease.name == 'cholera', "Incorrect disease name");
                assert(disease.disease_id == 'b4d780dd311fae981c01e339f90afdae', "Incorrect disease id");

                assert(disease.symptoms.length == correct_symptoms.length, "Incorrect number of symptoms");
                assert(correct_symptoms.every(function(correct_symptom, i) {
                    return correct_symptom === disease.symptoms[i];
                }), "Incorrect symptom details");

                assert(disease.reports.length == correct_report_ids.length, "Incorrect number of reports.");
                let reportIDs = disease.reports.map(report => { return report.report_id; });
                for (reportID of reportIDs) {
                    assert(correct_report_ids.includes(reportID), "Incorrect report ID.");
                }
            })
            .end(done);
    });
});

/**
 * Test '/disease/{diseaseid}' returns the correct disease.
 * TODO: NOT DONE YET!
 */
describe('GET /disease/id for salmonella', function(){
    it('200 response', function(done) {
        request(`${url}`)
            .get(`/disease/777d1c109f5eef1d64c418062a918d33`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(done);
    });

    it('gets salmonella with all correct values and a correct article', function(done) {
        request(`${url}`)
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
    // TODO: test with disease_id = 'invalid_disease_id'
});

/**
 * Test '/articles' with the 'start_date', 'end-date' and 'key_terms' query
 * returns the correct output.
 */
describe('GET /articles', function(){
    it('200 response', function(done) {
        request(`${url}`)
            .get('/articles')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(done);
    });
    it('gets an ebola article within 2020', function(done) {
        request(`${url}`)
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

/**
 * Test '/article/{articleid}' returns the correct article.
 */
describe('GET /article/id for same report as in /articles test', function(){
    it('200 response', function(done) {
        request(`${url}`)
            .get(`/article/ac908d92d6512fd9cb134694fa02f532`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(done);
    });
    it('got the same article with all the same fields', function(done) {
        request(`${url}`)
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

/**
 * Checks last log output has accurate time, date, request and status code for '/diseases'.
 */
describe('GET /log', function(){
    var loglen;
    var reqtime;
    var reqstring = '/diseases';
    var statuscode;
    var invalidparams = '?invalidparams';
    var invalidendpoint = '/invalidendpoint';
    it('200 response', function(done) {
        request(`${url}`)
            .get(`/log`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                loglen = res.body.logs.length;
            })
            .end(done);
    });
    it('request /diseases', function(done) {
        request(`${url}`)
            .get(reqstring)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                reqtime = new Date(Date.now());
                statuscode = res.statusCode;
            })
            .end(done);
    });
    it('checks last log output has accurate time, date, request, and status code', function(done) {
        request(`${url}`)
            .get(`/log`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(loglen + 1 == res.body.logs.length);
                var lastlog = res.body.logs[loglen];
                var logdate = new Date(lastlog.match(/^[^ ]+/));
                assert(logdate - reqtime <= 500);
                assert(lastlog.match(/'.*'/) == `'${reqstring}'`);
                assert(lastlog.match(/\d+$/) == statuscode);
            })
            .end(done);
    });
    it('check request doesn\'t alter behaviour with extra invalid parameters', function(done) {
        request(`${url}`)
            .get(`/log${invalidparams}`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(done);
    });
    it('check request returns 404 status code when given further endpoint', function(done) {
        request(`${url}`)
            .get(`/log${invalidendpoint}`)
            .expect(404)
            .expect('Content-Type', "text/html; charset=utf-8")
            .end(done);
    });
});

/**
 * Ebola exists in '/diseases'.
 */
describe('GET /diseases', function(){
    it('200 response - has salmonella', function(done) {
        request(`${url}`)
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
