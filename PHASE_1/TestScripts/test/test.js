// chai stuff
var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style

// supertest stuff
const request = require('supertest');

// const url = 'https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app';
const url = 'http://localhost:3000';

/**
 * Test '/diseases' returns the correct diseases
 */
describe('GET /diseases', function(){
    var invalidparams = '?invalidquery=invalidquery';
    var invalidendpoint = '/invalidendpoint';
    it('gives the correct status code and response length', function(done) {
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
    it('check request doesn\'t alter behaviour with extra invalid parameters', function(done) {
        request(`${url}`)
            .get(`/diseases${invalidparams}`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(done);
    });
    it('check request returns 404 status code when given further endpoint', function(done) {
        request(`${url}`)
            .get(`/diseases${invalidendpoint}`)
            .expect(404)
            .expect('Content-Type', "text/html; charset=utf-8")
            .end(done);
    });
});

/**
 * Test '/disease/{diseaseid}' returns the correct disease.
 * TODO: NOT DONE YET!
 */
describe('GET /disease/id for cholera', function(){
    it('gets correct details and status code for cholera', function(done) {
        request(`${url}`)
            .get(`/disease/b4d780dd311fae981c01e339f90afdae`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                let disease = res.body;
                let correct_symptoms   = ["profuse watery diarrhea, sometimes described as \"rice-water stools\"", "vomiting", "thirst", "leg cramps", "restlessness or irritability", "rapid heart rate", "loss of skin elasticity", "dry mucous membranes", "low blood pressure"];
                let correct_report_ids = ["cc2d456d8d1349fefc6f1868b5a6ad8e", "5d61d0a41744a0e18014a9e508bb5e73", "2cbf376f73106b9610897251d425979e", "b27c5e8d32889b7b90cd474fb32c8856", "f8248f4695a4112e938c120fd22dfa63"];

                assert(disease.name == 'cholera', "Incorrect disease name");
                assert(disease.disease_id == 'b4d780dd311fae981c01e339f90afdae', "Incorrect disease id");

                assert(disease.symptoms.length == correct_symptoms.length, "Incorrect number of symptoms");
                assert(correct_symptoms.every(function (correct_symptom, i) {
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

    it('gets correct details and status code for chikungunya', function(done) {
        request(`${url}`)
            .get(`/disease/4a1239ee4df81a98a51a3eb15c5521b3`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                let disease = res.body;
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

    it('returns 404 if invalid disease id', function(done) {
        request(`${url}`)
            .get(`/disease/invalid_disease_id`)
            .expect(404)
            .set('Accept', 'application/json')
            .expect('Content-Type', /text\/html/)
            .expect(function(res) {
                console.log(res.body);
                assert(res.body == "No diseases match ID invalid_disease_id", "Incorrect error message.");
            })
            .end(done);
    });
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
    var invalidparams = '?invalidquery=invalidquery';
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

describe('GET /reports', function() {
    var invalidparams = '?invalidquery=invalidquery';
    var invalidendpoint = '/invalidendpoint';
    it('gives the correct status code and response length', function(done) {
        request(`${url}`)
            .get('/reports')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.length == 9);
                // console.log(res.body);
            })
            .end(done);
    });

    it('?start_date=2018-01-01 only got one report and has correct values', function(done) {
        request(`${url}`)
            .get('/reports?start_date=2018-01-01')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.length == 1);

                var report = res.body[0];
                
                assert(report.report_id == 'cc2d456d8d1349fefc6f1868b5a6ad8e');
                assert(report.disease.disease_id == 'b4d780dd311fae981c01e339f90afdae');
                assert(report.article.article_id == '05cc555686be2f81f16abdd139201bd4');
                assert(report.location == 'Zimbabwe');
                assert(report.statistics.hospitalisations == null);
                assert(report.statistics.reported_cases == 93);
                assert(report.statistics.deaths == 2);
                assert(report.event_date == '2018-05-18T00:00:00.000Z');
            })
            .end(done);
    });

    it('?end_date=2000-01-01 only got one report and has correct values', function(done) {
        request(`${url}`)
            .get('/reports?end_date=2000-01-01')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.length == 1);

                var report = res.body[0];
                
                assert(report.report_id == '2cbf376f73106b9610897251d425979e');
                assert(report.disease.disease_id == 'b4d780dd311fae981c01e339f90afdae');
                assert(report.article.article_id == 'b730f0885558d9398d32b87b9cdd25a6');
                assert(report.location == 'USA');
                assert(report.statistics.hospitalisations == 2);
                assert(report.statistics.reported_cases == 2);
                assert(report.statistics.deaths == 0);
                assert(report.event_date == '1994-12-30T00:00:00.000Z');
            })
            .end(done);
    });

    it('?start_date=1990-01-01&end_date=2000-01-01 only got one report and has correct values', function(done) {
        request(`${url}`)
            .get('/reports?start_date=1990-01-01&end_date=2000-01-01')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.length == 1);

                var report = res.body[0];
                
                assert(report.report_id == '2cbf376f73106b9610897251d425979e');
                assert(report.disease.disease_id == 'b4d780dd311fae981c01e339f90afdae');
                assert(report.article.article_id == 'b730f0885558d9398d32b87b9cdd25a6');
                assert(report.location == 'USA');
                assert(report.statistics.hospitalisations == 2);
                assert(report.statistics.reported_cases == 2);
                assert(report.statistics.deaths == 0);
                assert(report.event_date == '1994-12-30T00:00:00.000Z');
            })
            .end(done);
    });

    it('?start_date=1980-01-01&end_date=1990-01-01 got no reports', function(done) {
        request(`${url}`)
            .get('/reports?start_date=1980-01-01&end_date=1990-01-01')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.length == 0);
            })
            .end(done);
    });

    it('?location=Tazmania got one report and has correct values', function(done) {
        request(`${url}`)
            .get('/reports?location=Tazmania')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.length == 1);

                var report = res.body[0];
                
                assert(report.report_id == 'f8248f4695a4112e938c120fd22dfa63');
                assert(report.disease.disease_id == 'b4d780dd311fae981c01e339f90afdae');
                assert(report.article.article_id == '0ba48160bd6034c38b9d5cea8aa94d0a');
                assert(report.location == 'Tazmania');
                assert(report.statistics.hospitalisations == null);
                assert(report.statistics.reported_cases == 23258);
                assert(report.statistics.deaths == 81);
                assert(report.event_date == '2016-11-26T00:00:00.000Z');
            })
            .end(done);
    });

    it('?location=unknown got no reports', function(done) {
        request(`${url}`)
            .get('/reports?location=unknown')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.length == 0);
            })
            .end(done);
    });

    it('?key_terms=epidemiologically got one report and has correct values', function(done) {
        request(`${url}`)
            .get('/reports?key_terms=epidemiologically')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.length == 1);

                var report = res.body[0];
                
                assert(report.report_id == '5d61d0a41744a0e18014a9e508bb5e73');
                assert(report.disease.disease_id == 'b4d780dd311fae981c01e339f90afdae');
                assert(report.article.article_id == 'c65a4366e9ab94b4b52c2a402072bc98');
                assert(report.location == 'Kenya');
                assert(report.statistics.hospitalisations == null);
                assert(report.statistics.reported_cases == 11033);
                assert(report.statistics.deaths == 178);
                assert(report.event_date == '2015-01-06T00:00:00.000Z');
            })
            .end(done);
    });

    it('?key_terms=asdf got no reports', function(done) {
        request(`${url}`)
            .get('/reports?location=unknown')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert(res.body.length == 0);
            })
            .end(done);
    });

    it('check request doesn\'t alter behaviour with extra invalid parameters', function(done) {
        request(`${url}`)
            .get(`/reports${invalidparams}`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(done);
    });
    it('check request returns 404 status code when given further endpoint', function(done) {
        request(`${url}`)
            .get(`/reports${invalidendpoint}`)
            .expect(404)
            .expect('Content-Type', "text/html; charset=utf-8")
            .end(done);
    });
});

// REPORT TESTING
// describe.only('GET /reports', function(){
//     it('should respond with a json 200 response with URL in request', function(done) {
//         request(`${url}`)
//             .get('/reports')
//             .set('Accept', 'application/json')
//             .expect(200)
//             .expect('Content-Type', /json/)
//             .expect(function(res) {
//                 console.log(res.body);
//                 console.log(res.body.length);
//                 // assert(res.length > 0);
//             })
//             .end(done);
//     });
//     it ('can produce a list of all reports published on outbreaks between given parameters in the form YYYY-MM-DD', function(done){
//         request(`${url}`)
//         .get('/reports?start_date=2020-12-01&end_date=2021-03-01')
//         .set('Accept', 'application/json')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .expect(function(res) {
//             console.log(res.body);
//             assert(res.length > 0);
//         })
//         .end(done);
//     });
//     it ('will produce an error when invalid dates in the form of YYYY-MM-DD provided', function(done){
//         request(`${url}`)
//         .get('/reports?start_date=2021-12-01&end_date=2020-03-01')
//         .set('Accept', 'application/json')
//         .expect(400)
//         .end(done);
//     });
//     it ('can produce a list of all reports published on outbreaks at a certain location', function(done){
//         request(`${url}`)
//         .get('/reports?location=USA')
//         .set('Accept', 'application/json')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .expect(function(res) {
//             assert(res.length > 0);
//         })
//         .end(done);
//     });
//     it ('will produce an empty list if invalid location supplied', function(done){
//         request(`${url}`)
//         .get('/reports?location=wakanda')
//         .set('Accept', 'application/json')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .end(done);
//     });
//     it ('can produce a list of all reports published on outbreaks containing a desired keyword', function(done){
//         request(`${url}`)
//         .get('/reports?key_terms=hedgehog')
//         .set('Accept', 'application/json')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .end(done);
//     });
//     it ('will produce an empty list if given string does not appear in any given documents', function(done){
//         request(`${url}`)
//         .get('/reports?key_terms=here_is_a_string_of_words_that_can_not_be_in_the_report')
//         .set('Accept', 'application/json')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .expect(function(res) {
//             assert(res.length == 0);
//         })
//         .end(done);
//     });
//     it ('will produce a 404 error if invalid query presented', function(done){
//         request(`${url}`)
//         .get('/reports?invalid_query=invalid_query')
//         .set('Accept', 'application/json')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .end(done);
//     });
// });

// describe('GET /report/{reportID}', function(){
//     it('should respond with a json 200 response with URL in request', function(done) {
//         request(`${url}`)
//             .get('/report/1ed7bef50165f63747e64fc1814fb517')
//             .set('Accept', 'application/json')
//             .expect(200)
//             .expect('Content-Type', /json/)
//             .end(done);
//     });
//     it('should respond with a json 404 response if invalid ID', function(done) {
//         request(`${url}`)
//             .get('/report/invalid_id')
//             .expect(404)
//             .expect('Content-Type', "text/html; charset=utf-8")
//             .end(done);
//     });
// });