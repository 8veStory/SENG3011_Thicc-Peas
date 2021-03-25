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
const app     = express();


// CONSTANTS
const PORT = process.env.PORT;
const FS_KEY_PATH = "../handy-amplifier-307202-7b79308ce4ea.json"
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



// PLACEHOLDER DATA
const diseases = {
    "covid-19": {
        id: 1,
        name: "COVID-19",
        description: "Coronaviruses are a large family of viruses that can cause illness in animals or humans. In humans there are several known coronaviruses that cause respiratory infections. These coronaviruses range from the common cold to more severe diseases such as severe acute respiratory syndrome (SARS), Middle East respiratory syndrome (MERS), and COVID-19. COVID-19 was identified in Wuhan, China in December 2019. COVID-19 is caused by the virus severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2), a new virus in humans causing respiratory illness which can be spread from person-to-person. Early in the report, many patients were reported to have a link to a large seafood and live animal market, however, later cases with no link to the market confirmed person-to-person transmission of the disease. Additionally, travel-related exportation of cases has occurred.",
        symptoms: [
            {
                name: "Fever or chills"
            },
            {
                name: "Cough"
            },
            {
                name: "Shortness of breath or difficulty breathing"
            },
            {
                name: "Fatigue"
            },
            {
                name: "Muscle or body aches"
            },
            {
                name: "Headache"
            },
            {
                name: "New loss of taste or smell"
            },
            {
                name: "Sore throat"
            },
            {
                name: "Congestion or runny nose"
            },
            {
                name: "Nausea or vomiting"
            },
            {
                name: "Diarrhea"
            }
        ]
    },
    "listeria": {
        id: 2,
        name: "Listeria",
        description: "Listeriosis is a serious infection usually caused by eating food contaminated with the bacterium Listeria monocytogenes. An estimated 1,600 people get listeriosis each year, and about 260 die. The infection is most likely to sicken pregnant women and their newborns, adults aged 65 or older, and people with weakened immune systems.",
        symptoms: [
            {
                name: "Fever"
            },
            {
                name: "Diarrhea"
            },
            {
                name: "Muscle Aches"
            },
            {
                name: "Fatigue"
            },
            {
                name: "Miscarriage"
            },
        ]
    },
    "salmonella": {
        id: 3,
        name: "Salmonella",
        description: "Salmonella are bacteria that make people sick. They were first discovered by an American scientist named Dr. Daniel E. Salmon in 1885. CDC estimates Salmonella bacteria cause about 1.35 million infections, 26,500 hospitalizations, and 420 deaths in the United States every year. Food is the source for most of these illnesses.",
        symptoms: [
            {
                name: "Diarrhea (that can be bloody)"
            },
            {
                name: "Fever"
            },
            {
                name: "Stomach cramps"
            },
        ]
    }
};

let reports = {
    1: {
        outbreak_id: 1,
        disease_id: 1,
        disease_name: "COVID-19",
        locations: [
            "Lidcome, NSW, Australia"
        ],
        reported_cases: 17,
        hospitalisations: 2,
        deaths: 0,
        start_date: "2020-07-06",
        end_date: "2020-08-12",
        investigation_status: false
    },
    2: {
        outbreak_id: 2,
        disease_id: 2,
        disease_name: "Listeria",
        locations: [
            "Colorado, United States of America"
        ],
        reported_cases: 2,
        hospitalisations: 1,
        deaths: 0,
        start_date: "2020-09-07",
        end_date: "2020-09-18",
        investigation_status: false
    },
}


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

                    diseasePromise = db.collection(FS_DISEASES_COLLECTION).where('disease_id', '==', reportData.disease_id).get();
                    articlePromise = db.collection(FS_ARTICLES_COLLECTION).where('article_id', '==', reportData.article_id).get();

                    // Wait for the 2 requests fetch the report's disease and article to finish.
                    Promise.all([diseasePromise, articlePromise]).then((results) => {
                        reportData = doc.data();
                        diseaseData = results[0].docs[0].data();
                        articleData = results[1].docs[0].data();
                        if (articleData.date_of_publication) articleData.date_of_publication = new Date(Date.parse(articleData.date_of_publication.toDate().toString()));

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
                                console.log(term);
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
                    });
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
 * Return all diseases.
 */
app.get('/diseases', (req, res) => {
        console.log(diseases);

        res.send(
            {
                diseases: [
                    {
                        id: 1,
                        name: "COVID-19",
                        description: "Coronaviruses are a large family of viruses that can cause illness in animals or humans. In humans there are several known coronaviruses that cause respiratory infections. These coronaviruses range from the common cold to more severe diseases such as severe acute respiratory syndrome (SARS), Middle East respiratory syndrome (MERS), and COVID-19. COVID-19 was identified in Wuhan, China in December 2019. COVID-19 is caused by the virus severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2), a new virus in humans causing respiratory illness which can be spread from person-to-person. Early in the report, many patients were reported to have a link to a large seafood and live animal market, however, later cases with no link to the market confirmed person-to-person transmission of the disease. Additionally, travel-related exportation of cases has occurred.",
                        symptoms: [
                            {
                                name: "Fever or chills"
                            },
                            {
                                name: "Cough"
                            },
                            {
                                name: "Shortness of breath or difficulty breathing"
                            },
                            {
                                name: "Fatigue"
                            },
                            {
                                name: "Muscle or body aches"
                            },
                            {
                                name: "Headache"
                            },
                            {
                                name: "New loss of taste or smell"
                            },
                            {
                                name: "Sore throat"
                            },
                            {
                                name: "Congestion or runny nose"
                            },
                            {
                                name: "Nausea or vomiting"
                            },
                            {
                                name: "Diarrhea"
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: "Listeria",
                        description: "Listeriosis is a serious infection usually caused by eating food contaminated with the bacterium Listeria monocytogenes. An estimated 1,600 people get listeriosis each year, and about 260 die. The infection is most likely to sicken pregnant women and their newborns, adults aged 65 or older, and people with weakened immune systems.",
                        symptoms: [
                            {
                                name: "Fever"
                            },
                            {
                                name: "Diarrhea"
                            },
                            {
                                name: "Muscle Aches"
                            },
                            {
                                name: "Fatigue"
                            },
                            {
                                name: "Miscarriage"
                            },
                        ]
                    },
                    {
                        id: 3,
                        name: "Salmonella",
                        description: "Salmonella are bacteria that make people sick. They were first discovered by an American scientist named Dr. Daniel E. Salmon in 1885. CDC estimates Salmonella bacteria cause about 1.35 million infections, 26,500 hospitalizations, and 420 deaths in the United States every year. Food is the source for most of these illnesses.",
                        symptoms: [
                            {
                                name: "Diarrhea (that can be bloody)"
                            },
                            {
                                name: "Fever"
                            },
                            {
                                name: "Stomach cramps"
                            },
                        ]
                    }
                ]
            })

        log(req, res);
    }
    )

/**
 * Endpoint: GET '/disease/:diseasename'
 * Example of a dynamic URL parameter (':diseasename') as it accepts an report diseasename.
 * NOTE: By default Express doesn't parse json in the body. So we have to setup a middleware.
 * It is shared code that is run before every endpoint's callback.
 */
app.get('/disease/:diseaseid', (req, res) => {
        // URL Parameters are located in req.params
        const { diseasename } = req.params;
        diseaseKey = diseasename.toLowerCase();
        if (!diseases[diseaseKey]) {
            res.statusCode = 404;
            res.send({
                message: `No diseases match the name ${diseasename}`
            });
            log(req, res);
            return;
        }
        res.send(diseases[diseaseKey]);
        log(req, res);
    })


app.listen(
        PORT,
        () => console.log(`API is alive on http://localhost:${PORT}`)
    );
