/**
 * The following example is a basic API created in express.js
 * 
 * NOTE: You should try to conform to the OpenAPI Specification, which lets your
 * API be understood by humans AND machines. You get benefits like easy
 * documentation to because of SwaggerHub. You can also upload your API easily
 * to API Gateway on AWS or Google Cloud.
 */

// IMPORTS
const admin   = require('firebase-admin');
const express = require('express');
const fs      = require('fs');
const { exit } = require('process');
const { promises } = require('dns');
const { response } = require('express');
const { create } = require('domain');
const app     = express();
exports.app = app;


// CONSTANTS
const PORT = process.env.PORT;
const FS_KEY_PATH = "../thicc-peas-seng3031-test-9ba8332e43ee.json"
// "../thicc-peas-seng3031-test-9ba8332e43ee.json" is the testing database
// "../thicc-peas-seng3031-test-9ba8332e43ee.json"
const FS_DISEASES_COLLECTION = "diseases";
const FS_REPORTS_COLLECTION = "reports";
const FS_ARTICLES_COLLECTION = "articles";


// CONNECT TO FIRESTORE
let serviceAccount;
try {
    serviceAccount = require(FS_KEY_PATH);
} catch(err) {
    if (err.code == "MODULE_NOT_FOUND")
        console.log(`Couldn't find ${FS_KEY_PATH}. Please add it in order to authenticate the FireStore client.`);
    exit(1);
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore();


// POLYFILLS
if (!Object.entries)
   Object.entries = function( obj ){
      var ownProps = Object.keys( obj ),
         i = ownProps.length,
         resArray = new Array(i); // preallocate the Array

      while (i--)
         resArray[i] = [ownProps[i], obj[ownProps[i]]];
      return resArray;
   };

// HELPER METHODS
function log(req, res, extraMessage = "") {
    let utcTime = new Date().toJSON();
    result = `\n${utcTime} | ${req.ip} requested '${req.url}' - Status Code: ${res.statusCode}`
    fs.appendFile("log.txt", result, () => {
        console.log(`${result + extraMessage}`)
    });
}

function create_report_result(reportData) {
    diseasePromise = db.collection(FS_DISEASES_COLLECTION).where('disease_id', '==', reportData.disease_id).get();
    articlePromise = db.collection(FS_ARTICLES_COLLECTION).where('article_id', '==', reportData.article_id).get();

    // Wait for the 2 requests fetch the report's disease and article to finish.
    return Promise.all([diseasePromise, articlePromise]).then((results) => {
        diseaseData = results[0].docs[0].data();
        articleData = results[1].docs[0].data();
        if (articleData.date_of_publication) articleData.date_of_publication = new Date(Date.parse(articleData.date_of_publication.toDate().toString()));

        // Create report result
        let result = {
            report_id: reportData.report_id,
            article: articleData,
            disease: diseaseData,
            location: reportData.location,
            statistics: reportData.statistics,
            event_date: new Date(Date.parse(reportData.event_date.toDate().toString()))
        };
        return result;
    });
}

function create_disease_result(diseaseData) {
    reportPromise = db.collection(FS_REPORTS_COLLECTION).where('disease_id', '==', diseaseData.disease_id).get();

    // Wait for the request fetch the disease's reports.
    return reportPromise.then((results) => {
        reports = [];
        results.forEach(doc => {
            reportData = doc.data();
            reportData.event_date = new Date(Date.parse(reportData.event_date.toDate().toString()));
            reports.push(reportData);
        });

        let result = {
            disease_id: diseaseData.disease_id,
            name: diseaseData.name,
            symptoms: diseaseData.symptoms,
            reports: reports
        }
        return result;
    });
}

function create_article_result(articleData) {
    reportPromise = db.collection(FS_REPORTS_COLLECTION).where('article_id', '==', articleData.article_id).get();

    // Wait for the request fetch the disease's reports.
    return reportPromise.then((results) => {
        reports = [];
        results.forEach(doc => {
            reportData = doc.data();
            reportData.event_date = new Date(Date.parse(reportData.event_date.toDate().toString()));
            reports.push(reportData);
        });


        let result = {
            article_id: articleData.article_id,
            headline: articleData.headline,
            main_text: articleData.main_text,
            date_of_publication: articleData.date_of_publication ? new Date(Date.parse(articleData.date_of_publication.toDate().toString())) : articleData.date_of_publication,
            url: articleData.url,
            reports: reports
        }
        return result;
    });
}
// ENDPOINTS
/**
 * Listen on $PORT for JSON.
 */
app.use(express.json())

/**
 * Endpoint: GET '/log'
 * Retrieve the contents of the log file.
 */
app.get('/log', (req, res) => {
        if (!fs.existsSync('log.txt')) {
            res.send({ logs: [] });
            return;
        }

        fs.readFile('log.txt', (err, data) => {
            file = data.toString();
            logs = file.split("\n");

            res.send({ logs: logs });
        })
    })

/**
 * Endpoint: GET '/reports'
 * 
 * Sends all reports that satisfy the query parameter filters used. By default
 * (when no query parameters are used) all reports are returned.
 * 
 * Query Parameters:
 * - start_date: ISO date that is the start of the date range to search in. Default: all previous [OPTIONAL]
 * - end_date:   ISO date that is the end of the date range to search in.   Default: present      [OPTIONAL]
 * - location:   Location of the report to look for.                        Default: anywhere     [OPTIONAL]
 * - key_terms:  Comma-delimited list of key terms to search for.           Default: none         [OPTIONAL]
 * 
 * Possible Status Codes:
 * - 200 OK: Sends reports according to the query parameters
 * - 400 BAD REQUEST: Invalid query parameters used or badly formatted request.
 */
app.get('/reports', async (req, res) => {
    // Mandatory
    let start_date;
    let end_date;
    let location;
    let key_terms;

    // Query Parameters
    if (req.query.start_date) start_date = new Date(Date.parse(req.query.start_date));
    if (req.query.end_date) end_date = new Date(Date.parse(req.query.end_date));
    if (req.query.location) location = req.query.location.toLowerCase();
    if (req.query.key_terms) key_terms = req.query.key_terms.split(',').map(term => term.toLowerCase());

    // Check Query Parameter Constraints
    if (start_date && isNaN(start_date.getTime()))  { res.status(400).send(`Start date ${req.query.start_date} is invalid.`); return; }
    if (end_date && isNaN(end_date.getTime()))      { res.status(400).send(`End date ${req.query.end_date} is invalid.`);     return; }

    if ((start_date && end_date) && (end_date <= start_date)) {
        // Date range must be valid.
        res.status(400).send(`End date '${end_date}' should be behind start date '${start_date}.'`);
    }

    // Get reports according to the correct date ranges.
    let reportQueryRef = db.collection(FS_REPORTS_COLLECTION);
    if (start_date) reportQueryRef = reportQueryRef.where('event_date', '>=', start_date);
    if (end_date) reportQueryRef = reportQueryRef.where('event_date', '<=', end_date);

    reportQueryRef.get().then(queryResults => {
        let report_result_promises = [];
        let report_results = [];

        queryResults.forEach(doc => {
            // Create a promise for every report that is going to be added.
            report_result_promises.push(new Promise((resolve, reject) => {
                reportData = doc.data();

                // Create a report_result, which is a combination of a report
                // with its disease and article. This is what we shall
                // send back to the user.
                create_report_result(reportData).then(reportResult => {
                    reportData = doc.data(); // Have to recalculate this ofr some reason. If not then the value is cached across all docs.
                    articleData = reportResult.article;
                    diseaseData = reportResult.disease;

                    // Check location query parameter.
                    if (location) {
                        if (!reportData.location.toLowerCase().includes(location)) {
                            resolve();
                            return;
                        }
                    }

                    // Check key_terms query parameter.
                    if (key_terms) {
                        let contains_terms = false;
                        for (term of key_terms) {
                            if (diseaseData.name && diseaseData.name.toLowerCase().includes(term)) { contains_terms = true; break; }
                            if (articleData.headline && articleData.headline.toLowerCase().includes(term)) { contains_terms = true; break; }
                            if (articleData.main_text && articleData.main_text.toLowerCase().includes(term)) { contains_terms = true; break; }
                        }
                        if (!contains_terms) {
                            resolve();
                            return;
                        }
                    }

                    // Create report result
                    let result = {
                        report_id: reportData.report_id,
                        article: articleData,
                        disease: diseaseData,
                        location: reportData.location,
                        statistics: reportData.statistics,
                        event_date: new Date(Date.parse(reportData.event_date.toDate().toString()))
                    };
                    report_results.push(result);
                    resolve();
                })
            }));
        });

        // Process each promise.
        console.log(`Processing ${report_result_promises.length} reports...`);
        Promise.all(report_result_promises).then(() => {
            // Once all promises have been resolved, send the data.
            console.log(`Sending ${report_results.length} reports...`);
            res.status(200).send(report_results);

            parameter_string = "\nParameters:";
            if (start_date) parameter_string += `\n\tstart_date: ${start_date.toUTCString()}`;
            if (end_date) parameter_string += `\n\tend_date: ${end_date}`;
            if (location) parameter_string += `\n\tlocation: ${location}`;
            if (key_terms) parameter_string += `\n\tkey_terms: ${key_terms}`;

            log(req, res, parameter_string);
        }).catch(() => {
        });
    });
})

/**
 * Endpoint: GET '/report/:reportid'
 * 
 * Returns you the report that corresponds to the given 'reportid'.
 */
app.get('/report/:reportid', (req, res) => {
    const reportID = req.params.reportid;

    db.collection(FS_REPORTS_COLLECTION).where('report_id', '==', reportID).get().then(result => {
        if (result.size > 1) console.log(`WARNING: ${reportID} has ${result.size} entries in the DB.`);

        if (result.size == 0) {
            res.status(404).send(`No reports match the ID ${reportID}`);
        } else {
            let reportData = result.docs[0].data();
            create_report_result(reportData).then(reportResult => {
                res.status(200).send(reportResult);
            })
        }
        log(req, res);
    });
})

/**
 * Endpoint: GET /diseases
 * 
 * Return all diseases that matches the filtering query parameters given (if any).
 * By default returns all diseases.
 * 
 * Query Parameters:
 * * disease_names: results are filtered for the given terms in the name symptoms of the disease.
 *                  Should be a comma-separated list. (e.g. Zika,Anthrax,ecoli).
 *                  Default: <None> [OPTIONAL]
 * * symptoms:      results are filtered for the given terms in the symptoms of the the disease.
 *                  Should be a comma-separated list. (e.g. vomiting,coughing).
 *                  Default: <None> [OPTIONAL]
 */
app.get('/diseases', (req, res) => {
    let disease_names;
    let symptoms;

    if (req.query.disease_names) disease_names = req.query.disease_names.split(',').map(term => term.toLowerCase());
    if (req.query.symptoms) symptoms           = req.query.symptoms.split(',').map(term => term.toLowerCase());

    // Get diseases according to the correct date ranges.
    let diseaseQueryRef = db.collection(FS_DISEASES_COLLECTION);
    diseaseQueryRef.get().then(queryResults => {
        let disease_result_promises = [];
        let final_disease_results = [];

        // Generate a disease result for each disease found.
        queryResults.forEach(doc => {
            diseaseData = doc.data();

            // Check disease_names query parameter.
            if (disease_names) {
                let contains_terms = false;
                for (term of disease_names) {
                    if (diseaseData.name && diseaseData.name.toLowerCase().includes(term)) { contains_terms = true; break; }
                }
                if (!contains_terms) {
                    return;
                }
            }

            // Check symptoms query parameter.
            if (symptoms) {
                let contains_terms = false;
                for (symptomTerm of symptoms) {
                    if (diseaseData.symptoms) {
                        for (symptom of diseaseData.symptoms) {
                            if (symptom.toLowerCase().includes(symptomTerm)) { contains_terms = true; break; }
                        }
                    }
                }
                if (!contains_terms) {
                    return;
                }
            }

            // Push promise that will create the final disease result.
            disease_result_promises.push(create_disease_result(diseaseData).then(diseaseResult => {
                final_disease_results.push(diseaseResult);
            }));
        })

        // Send all disease results once they've been processed.
        console.log(`Processing ${disease_result_promises.length} diseases...`);
        Promise.all(disease_result_promises).then(() => {
            console.log(`Sending ${final_disease_results.length} diseases...`);
            res.status(200).send(final_disease_results);
            log(req, res);
        }).catch(() => {

        })
    });
}
)

/**
 * Endpoint: GET '/disease/:diseaseid'
 * 
 * Returns you the disease that corresponds to the given 'diseaseid'.
 */
app.get('/disease/:diseaseid', (req, res) => {
    let diseaseID = req.params.diseaseid;
    if (!diseaseID) {
        res.status(400).send(`diseaseid ${diseaseID} is invalid.`);
        log(req, res);
        return;
    }
    diseaseID = diseaseID.toLowerCase();

    db.collection(FS_DISEASES_COLLECTION).where('disease_id', '==', diseaseID).get().then(result => {
        if (result.size > 1) console.log(`WARNING: ${diseaseID} has ${result.size} entries in the DB.`);

        if (result.size == 0) {
            res.status(404).send(`No diseases match ID ${diseaseID}`);
        } else {
            let diseaseData = result.docs[0].data();
            create_disease_result(diseaseData).then(diseaseResult => {
                res.status(200).send(diseaseResult);
            })
        }
        log(req, res);
    });
})

/**
 * Endpoint: GET '/articles'
 * 
 * Sends all articles that satisfy the query parameter filters used. By default
 * (when no query parameters are used) all articles are returned.
 * 
 * Query Parameters:
 * - start_date: ISO date that is the start of the date range to search in. Default: all previous [OPTIONAL]
 * - end_date:   ISO date that is the end of the date range to search in.   Default: present      [OPTIONAL]
 * - key_terms:  Comma-delimited list of key terms to search for in the
 *               headlines and main_text.                                   Default: none         [OPTIONAL]
 * 
 * Possible Status Codes:
 * - 200 OK: Sends articles according to the query parameters
 * - 400 BAD REQUEST: Invalid query parameters used or badly formatted request.
 */
app.get('/articles', (req, res) => {
    let key_terms;
    let start_date;
    let end_date;

    // Query Parameters
    if (req.query.key_terms) key_terms   = req.query.key_terms.split(',').map(term => term.toLowerCase());
    if (req.query.start_date) start_date = new Date(Date.parse(req.query.start_date));
    if (req.query.end_date) end_date     = new Date(Date.parse(req.query.end_date));

    if (start_date && isNaN(start_date.getTime()))  { res.status(400).send(`Start date ${req.query.start_date} is invalid.`); return; }
    if (end_date && isNaN(end_date.getTime()))      { res.status(400).send(`End date ${req.query.end_date} is invalid.`);     return; }

    // Check Query Parameter Constraints
    if ((start_date && end_date) && (end_date <= start_date)) {
        // Date range must be valid.
        res.status(400).send(`End date '${end_date}' should be behind start date '${start_date}.'`);
    }

    // Get articles according to the correct query parameters.
    let articleQueryRef = db.collection(FS_ARTICLES_COLLECTION);
    if (start_date) articleQueryRef = articleQueryRef.where('date_of_publication', '>=', start_date);
    if (end_date)   articleQueryRef   = articleQueryRef.where('date_of_publication', '<=', end_date);
    articleQueryRef.get().then(queryResults => {
        let article_result_promise = [];
        let final_article_results  = [];

        // Generate an article result for each article found.
        queryResults.forEach(doc => {
            articleData = doc.data();

            // Check key_terms query parameter.
            if (key_terms) {
                let contains_terms = false;
                for (term of key_terms) {
                    if (articleData.headline && articleData.headline.toLowerCase().includes(term)) { contains_terms = true; break; }
                    if (articleData.main_text && articleData.main_text.toLowerCase().includes(term)) { contains_terms = true; break; }
                }
                if (!contains_terms) {
                    return;
                }
            }

            // Push promise that will create the final disease result.
            article_result_promise.push(create_article_result(articleData).then(articleResult => {
                final_article_results.push(articleResult);
            }));
        })

        // Send all article results once they've been processed.
        console.log(`Processing ${article_result_promise.length} articles...`);
        Promise.all(article_result_promise).then(() => {
            console.log(`Sending ${final_article_results.length} articles...`);
            res.status(200).send(final_article_results);
            log(req, res);
        }).catch(() => {

        })
    });
});

/**
 * Endpoint: GET '/article/:articleid'
 * 
 * Returns you the article that corresponds to the given 'articleid'.
 */
app.get('/article/:articleid', (req, res) => {
    let articleID = req.params.articleid;
    if (!articleID) {
        res.status(400).send(`articleid ${articleID} is invalid.`);
        log(req, res);
        return;
    }
    articleID = articleID.toLowerCase();

    db.collection(FS_ARTICLES_COLLECTION).where('article_id', '==', articleID).get().then(result => {
        if (result.size > 1) console.log(`WARNING: ${articleID} has ${result.size} entries in the DB.`);

        if (result.size == 0) {
            res.status(404).send(`No articles match ID ${articleID}`);
        } else {
            let articleData = result.docs[0].data();
            create_article_result(articleData).then(articleResult => {
                res.status(200).send(articleResult);
            })
        }
        log(req, res);
    });
})
exports.server = app.listen(
    PORT,
    () => console.log(`API is alive on http://localhost:${PORT}`)
);