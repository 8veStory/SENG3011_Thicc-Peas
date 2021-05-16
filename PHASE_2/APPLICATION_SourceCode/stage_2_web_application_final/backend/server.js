/**
 * The server. Contains all endpoints.
 */

// Imports
const fs              = require('fs');
const cors            = require('cors');
const express         = require('express');
const httpCodes       = require('./utilities/statusCodes');
const FireStoreDBLink = require('./firestore-db-link');
const { log }         = require('./logger');
const { hashSHA256 }      = require('./utilities/crypto');
const { logger, errorHandler } = require('./middleware/middleware');
const { compareAgainstHashedPasswordSync } = require('./utilities/crypto');

const fetch           = require('node-fetch');

// Constants
const PORT = process.env.PORT || 3001;
const API_URL = 'https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app';
const FS_KEY_PATH = './thicc-peas-seng3031-web-app-2ee789d4badd.json';

const app = express();
const dbLink = new FireStoreDBLink(FS_KEY_PATH);

/** MIDDLEWARE */
app.use(express.json())  // recognise incoming request objects as JSON Objects
app.use(cors())          // add 'Access-Control-Allow-Origin: *' to HTTP headers
app.use(logger);         // log every request
app.use(errorHandler);   // error-handling for exceptions

/** BACK-END API */
/**
 * Endpoint: GET '/log'
 * Retrieve the contents of the log file.
 */
app.get('/log', (req, res) => {
  if (!fs.existsSync('log.txt')) {
    res.send({ logs: [], success: true });
    return;
  }

  fs.readFile('log.txt', (err, data) => {
    let file = data.toString();
    let logs = file.split("\n");
    logs = logs.filter(x => x.length > 0);

    res.send({ logs: logs, success: true });
  });

});

/**
 * Signs up a clinic.
 */
app.post('/signup', async (req, res) => {
  const { name, email, password, password_check, address, country, state } = req.body;

  let validationErrors = [];
  if (!name)           validationErrors.push('\'Name\' cannot be empty.');
  if (!email)          validationErrors.push('\'Email\' cannot be empty.');
  if (!password)       validationErrors.push('\'Password\' cannot be empty.');
  if (!password_check) validationErrors.push('\'Repeat\' password cannot be empty.');
  if (!address)        validationErrors.push('\'Address\' cannot be empty.');
  if (!country)        validationErrors.push('\'Country\' cannot be empty.');
  if (!state)          validationErrors.push('\'State\' cannot be empty.');

  if (!name || !email || !password || !address || !country || !state) {
    res.status(httpCodes.BAD_REQUEST_400).json({ error: validationErrors.join("\n"), success: false });
    return;
  }

  // Validation checks

  console.log(`Signing up a clinic with details: ${req.body}`);

  // Set clinic in DB
  let result;
  try {
    result = await dbLink.setClinicAsync(email, password, name, address, country, state, "9am", "6pm");
    res.status(httpCodes.CREATED_201).json(result);
  } catch (err) {
    res.status(httpCodes.BAD_REQUEST_400).json({ error: err.message, success: false });
  }
});

/**
 * Logins in a clinic given their email and password.
 */
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const clinic = await dbLink.getClinicAsync(hashSHA256(email));

  if (!clinic) {
    res.status(httpCodes.UNAUTHORIZED_401).json({
      success: false,
      error: 'Invalid email or password.'
    });
    return;
  }

  if (clinic.contact_email === email && compareAgainstHashedPasswordSync(password, clinic.password)) {
    // TODO: Implement JWT for user authentication.
    // Return clinic object without password hash
    res.status(httpCodes.SUCCESS_200).json({
      success: true,
      token: clinic.id
    });
  } else {
    res.status(httpCodes.UNAUTHORIZED_401).json({
      success: false,
      error: 'Invalid email or password.'
    });
  }
});

/**
 * Books a client with a given clinic.
 */
app.post('/book', (req, res) => {
  const clientEmail =  req.params.clientEmail;
  const clientName = req.params.clientName;
});

/**
 * Returns all clinics in database.
 */
app.get('/getclinics', (req, res) => {
  res.json({
    clinics: dbLink.getClinicsAsync()
  });
});

/**
 * Returns all vaccines in database.
 */
app.get('/getvaccines', (req, res) => {
  res.json({
    vaccines: dbLink.getInventoryTypeAsync("vaccine")
  });
});

/**
 * Returns all tests in database.
 */
app.get('/gettests', (req, res) => {
  res.json({
    vaccines: dbLink.getInventoryTypeAsync("test")
  });
});

/** THICC-PEAS API INTERFACE */
/**
 * API Endpoint: GET '/reports'
 * 
 * Sends all reports that satisfy the query parameter filters used. By default
 * (when no query parameters are used) all reports are returned.
 */
// app.get('/reports', (req, res) => {
//   var args = "/?"
//   if (req.params.start_date) args += `start_date=${req.params.start_date}&`
//   if (req.params.end_date) args += `end_date=${req.params.end_date}&`
//   if (req.params.location) args += `location=${req.params.location}&`
//   if (req.params.key_terms) args += `key_terms=${req.params.start_date}`

//   if (args == "/?") {
//     args = ''
//   }
//   fetch(`${API_URL}/reports${args}`)
//     .then(response => {
//       res.json(response.json());
//     })

//   log(req, res);
// })

/**
 * API Endpoint: GET '/report/:reportid'
 * 
 * Returns you the report that corresponds to the given 'reportid'.
 */
// app.get('/report/:reportid', (req, res) => {
//     fetch(`${API_URL}/reports/${req.params.reportid}`)
//       .then(response => res.json(response.json()));
//   log(req, res);
// })

/**
 * API Endpoint: GET '/reports'
 * 
 * Sends all reports that satisfy the query parameter filters used. By default
 * (when no query parameters are used) all reports are returned.
 */
//  app.get('/diseases', (req, res) => {
//   var args = "/?"
//   if (req.params.disease_names) args += `disease_names=${req.params.disease_names}&`
//   if (req.params.symptoms) args += `symptoms=${req.params.symptoms}`

//   if (args == "/?") {
//     args = ''
//   }
//   fetch(`${API_URL}/diseases${args}`)
//     .then(response => res.json(response.json()));
//   log(req, res);
// })

/**
 * API Endpoint: GET '/report/:reportid'
 * 
 * Returns you the report that corresponds to the given 'reportid'.
 */
// app.get('/disease/:diseaseid', (req, res) => {
//     const diseaseID = req.params.diseaseid;

//     fetch(`${API_URL}/disease/${diseaseID}`)
//       .then(response => res.json(response.json()));
//   log(req, res);
// })

/**
 * API Endpoint: GET '/articles'
 * 
 * Sends all articles that satisfy the query parameter filters used. By default
 * (when no query parameters are used) all articles are returned.
 */
// app.get('/articles', (req, res) => {
//   var args = "/?"
//   if (req.params.start_date) args += `start_date=${req.params.start_date}&`
//   if (req.params.end_date) args += `end_date=${req.params.end_date}&`
//   if (req.params.key_terms) args += `key_terms=${req.params.start_date}`

//   if (args == "/?") {
//     args = ''
//   }
//   fetch(`${API_URL}/articles${args}`)
//     .then(response => res.json(response.json()));
//   log(req, res);
// });

/**
 * API Endpoint: GET '/article/:articleid'
 * 
 * Returns you the article that corresponds to the given 'articleid'.
 */
// app.get('/article/:articleid', (req, res) => {
//   const articleID = req.params.articleid;

//   fetch(`${API_URL}/article/${articleID}`)
//     .then(response => res.json(response.json()));
//   log(req, res);
// })



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}...`);
});