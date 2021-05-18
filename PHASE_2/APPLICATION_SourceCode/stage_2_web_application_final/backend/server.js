/**
 * The server. Contains all endpoints.
 */

// Imports
const fs                       = require('fs');
const cors                     = require('cors');
const express                  = require('express');
const httpCodes                = require('./utilities/statusCodes');
const FireStoreDBLink          = require('./firestore-db-link');
const sendEmailAsync           = require('./email/emailer').sendMailAsync;
const BookingEmail             = require('./email/booking-email/booking-email');
const BookingConfirmationEmail = require('./email/booking-confirmation-email-template/booking-confirmation-email');
const { log }                  = require('./logger');
const { hashSHA256 }           = require('./utilities/crypto');
const { logger, errorHandler } = require('./middleware/middleware');
const { compareAgainstHashedPasswordSync } = require('./utilities/crypto');

const fetch           = require('node-fetch');
const { templateSettings } = require('lodash');

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

  if (validationErrors.length > 0) {
    res.status(httpCodes.BAD_REQUEST_400).json({ error: validationErrors.join("\n"), success: false });
    return;
  }

  // Validation checks
  if (await dbLink.clinicExistsAsync(email)) {
    res.status(httpCodes.BAD_REQUEST_400).json({ error: 'A clinic using email ${email} already exists.', success: false });
    return;
  }
  if (password != password_check) {
    res.status(httpCodes.BAD_REQUEST_400).json({ error: "Passwords do not match.", success: false });
    return;
  }

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
  const clinic = await dbLink.getClinicAsync(email);

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
app.post('/book', async (req, res) => {
  const { clinic_id, email, name, date, medicare_num, tests, vaccines } = req.body;

  // Validate
  let validationErrors = [];
  if (!clinic_id)           validationErrors.push('\'Clinic ID\' cannot be empty.');
  if (!name)           validationErrors.push('\'Name\' cannot be empty.');
  if (!email)          validationErrors.push('\'Email\' cannot be empty.');
  if (!date)           validationErrors.push('\'Date\' cannot be empty.');
  if (!medicare_num)   validationErrors.push('\'Medicare Number\' cannot be empty.');
  if ((Array.isArray(tests) && tests.length === 0) &&
      (Array.isArray(vaccines) && vaccines.length === 0)) {
      validationErrors.push('At least one test or vaccine should be selected.');
  }

  if (validationErrors.length > 0) {
    res.status(httpCodes.BAD_REQUEST_400).json({ error: validationErrors.join("\n"), success: false });
    return;
  }

  // Add to 'pending' bookings of that clinic.
  let result = await dbLink.setPendingBookingAsync(clinic_id, name, email, medicare_num, date, tests, vaccines);
  if (!result.success) {
    res.status(httpCodes.BAD_REQUEST_400).json(result);
    return;
  }

  // Construct email that allows acceptance or rejection.
  let clinic = await dbLink._getClinicAsync('ac42c2ec467886b05f669c572115f3699ba42908fed072c0ee777f1b1c0f689c');
  let subject =  `VaccTracc appointment for ${name}`;
  let htmlBody = new BookingEmail('ac42c2ec467886b05f669c572115f3699ba42908fed072c0ee777f1b1c0f689c', result.pending_booking_id, clinic.name, name, medicare_num, email, date, vaccines, tests).toString2();

  // Send booking email to clinic.
  await sendEmailAsync(clinic.contact_email, subject, html=htmlBody);

  res.status(httpCodes.SUCCESS_200).json({
    success: true,
  });
});

app.get('/test1', async (req, res) => {
  console.log(await dbLink.getPendingBookingAsync('XF3Dq5804ltepFyohcB0'));
})

app.post('/bookaccept', async (req, res) => {
  const { clinic_id, pending_booking_id } = req.body;

  let validationErrors = [];
  if (!clinic_id)           validationErrors.push('\'Clinic ID\' cannot be empty.');
  if (!pending_booking_id)  validationErrors.push('\'Pending Booking ID\' cannot be empty.');

  if (validationErrors.length > 0) {
    res.status(httpCodes.BAD_REQUEST_400).json({ error: validationErrors.join("\n"), success: false });
    return;
  }

  // Get pending booking
  let pendingBooking = await dbLink.getPendingBookingAsync(pending_booking_id);
  if (!pendingBooking) {
    res.status(httpCodes.BAD_REQUEST_400).json({ error: `Pending Booking ID ${pending_booking_id} is invalid.`, success: false });
    return;
  }

  // Get clinic
  let clinic = await dbLink._getClinicAsync(clinic_id);
  if (!clinic) {
    res.status(httpCodes.BAD_REQUEST_400).json({ error: `Clinic ID ${clinic_id} is invalid.`, success: false });
    return;
  }

  // Change from pending booking to actual booking in DB.
  await dbLink.changePendingBookingToBooking(pending_booking_id);

  // Get booking
  let bookingID = pending_booking_id;
  let booking = await dbLink.getBookingAsync(bookingID);

  // Construct booking confirmation email to client.
  let subject =  `VaccTracc Appointment Confirmation`;
  let htmlBody = new BookingConfirmationEmail(clinic_id,
                                              bookingID,
                                              booking.client_name, clinic.name,
                                              clinic.phone,
                                              clinic.contact_email,
                                              [clinic.address, clinic.state, clinic.country].join(', '),
                                              booking.date,
                                              booking.vaccines,
                                              booking.tests
                                            ).toString();

  // Send confirmation email to client.
  await sendEmailAsync(clinic.contact_email, subject, html=htmlBody);

  res.status(httpCodes.SUCCESS_200).json({
    success: true,
  });
});

app.post('/bookreject', (req, res) => {
  const { clinic_id, pending_booking_id } = req.body;

  let validationErrors = [];
  if (!clinic_id)           validationErrors.push('\'Clinic ID\' cannot be empty.');
  if (!pending_booking_id)  validationErrors.push('\'Pending Booking ID\' cannot be empty.');

  if (validationErrors.length > 0) {
    res.status(httpCodes.BAD_REQUEST_400).json({ error: validationErrors.join("\n"), success: false });
    return;
  }

  // TODO: Get the pending booking's information.

  // Remove pending booking from DB.

  // TODO: Notify client of booking rejection.
});

app.post('/bookcancel', (req, res) => {

})

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