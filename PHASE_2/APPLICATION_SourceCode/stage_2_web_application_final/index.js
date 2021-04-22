// server/index.js

const express = require("express");
const PORT = process.env.PORT || 3001;
const apiurl = "https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app"
const app = express();

/**
 * API API Endpoint: GET '/log'
 * Retrieve the contents of the log file.
 */
app.get('/log', (req, res) => {
  fetch(`${apiurl}/log`)
    .then(response => res.json(response.json()));
});

/**
 * API API Endpoint: GET '/reports'
 * 
 * Sends all reports that satisfy the query parameter filters used. By default
 * (when no query parameters are used) all reports are returned.
 */
app.get('/reports', (req, res) => {
  var args = "/?"
  if (req.params.start_date) args += `start_date=${req.params.start_date}&`
  if (req.params.end_date) args += `end_date=${req.params.end_date}&`
  if (req.params.location) args += `location=${req.params.location}&`
  if (req.params.key_terms) args += `key_terms=${req.params.start_date}`

  if (args == "/?") {
    args = ''
  }
  fetch(`${apiurl}/reports${args}`)
    .then(response => res.json(response.json()));
})

/**
 * API API Endpoint: GET '/report/:reportid'
 * 
 * Returns you the report that corresponds to the given 'reportid'.
 */
app.get('/report/:reportid', (req, res) => {
    fetch(`${apiurl}/reports/${req.params.reportid}`)
      .then(response => res.json(response.json()));
})

/**
 * API API Endpoint: GET '/reports'
 * 
 * Sends all reports that satisfy the query parameter filters used. By default
 * (when no query parameters are used) all reports are returned.
 */
 app.get('/diseases', (req, res) => {
  var args = "/?"
  if (req.params.disease_names) args += `disease_names=${req.params.disease_names}&`
  if (req.params.symptoms) args += `symptoms=${req.params.symptoms}`

  if (args == "/?") {
    args = ''
  }
  fetch(`${apiurl}/diseases${args}`)
    .then(response => res.json(response.json()));
})

/**
 * API Endpoint: GET '/report/:reportid'
 * 
 * Returns you the report that corresponds to the given 'reportid'.
 */
app.get('/disease/:diseaseid', (req, res) => {
    const diseaseID = req.params.diseaseid;

    fetch(`${apiurl}/disease/${diseaseID}`)
      .then(response => res.json(response.json()));
})

/**
 * API Endpoint: GET '/articles'
 * 
 * Sends all articles that satisfy the query parameter filters used. By default
 * (when no query parameters are used) all articles are returned.
 */
app.get('/articles', (req, res) => {
  var args = "/?"
  if (req.params.start_date) args += `start_date=${req.params.start_date}&`
  if (req.params.end_date) args += `end_date=${req.params.end_date}&`
  if (req.params.key_terms) args += `key_terms=${req.params.start_date}`

  if (args == "/?") {
    args = ''
  }
  fetch(`${apiurl}/articles${args}`)
    .then(response => res.json(response.json()));
});

/**
 * API Endpoint: GET '/article/:articleid'
 * 
 * Returns you the article that corresponds to the given 'articleid'.
 */
app.get('/article/:articleid', (req, res) => {
  const articleID = req.params.articleid;

  fetch(`${apiurl}/article/${articleID}`)
    .then(response => res.json(response.json()));
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});