// server/index.js

const express = require("express");
const admin   = require('firebase-admin');
const express = require('express');
var hash      = require('object-hash')

const PORT = process.env.PORT || 3001;
const apiurl = "https://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app"
const FS_KEY_PATH = "thicc-peas-seng3031-web-app-29309605b7bf.json"
const FS_CLINICS_COLLECTION = "clinic";
const FS_INDIVIDUALS_COLLECTION = "individual";
const FS_INVENTORY_COLLECTION = "inventory";
const FS_HASINVENTORY_COLLECTION = "hasInventory"

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
const app = express();

/**
 * 
 * @param {*} clinicjson A JSON containing clinic information to add / edit
 * @returns Outcome in a json file with the argument `result`
 */
function setClinic(clinicjson) {
  const clinic = db.collection(FS_CLINICS_COLLECTION).doc(clinicjson.clinic_id);
  var result = "Success";
  try {
    await clinic.set(clinicjson);
  } catch (err) {
    result = `Error: ${err}`;
  }
  return {result: result};
}

/**
 * 
 * @param {*} clinic_id A string containing the clinic's ID 
 * @returns Outcome in a json file with the argument `result`
 */
 function getClinic(clinic_id) {
  const clinic = await db.collection(FS_CLINICS_COLLECTION).doc(clinic_id).get();
  return clinic;
}

/**
 * 
 * @param {*} individualjson A JSON containing individual information to add / edit
 * @returns Outcome in a json file with the argument `result`
 */
function setIndividual(individualjson) {
  const individual = db.collection(FS_INDIVIDUALS_COLLECTION).doc(individualjson.individual_id);
  var result = "Success";
  try {
    await individual.set(individualjson);
  } catch (err) {
    result = `Error: ${err}`;
  }
  return {result: result};
}

/**
 * 
 * @param {*} individual_id
 * @returns Outcome in a json file with the argument `result`
 */
function getIndividual(individual_id) {
  const individual = await db.collection(FS_INDIVIDUALS_COLLECTION).doc(individual_id).get();
  return individual;
}

/**
 * 
 * @param {*} inventoryjson The JSON to be added to the document
 * @param {*} clinic_id 
 * @returns 
 */
function setInventory(inventoryjson, clinic_id, quantity) {
  const inventory = db.collection(FS_INVENTORY_COLLECTION).doc(inventoryjson.inventory_id);
  const hasinventory = db.collection(FS_HASINVENTORY_COLLECTION).doc(`hasInventory/${inventoryjson.inventory_id}/${clinic_id}/`)
  const clinic = await db.collection(FS_CLINIC_COLLECTION).doc(clinic_id).get();
  var result = "Success";
  try {
    await inventory.set(inventoryjson);
    await hasinventory.set({
      clinic_id: clinic_id,
      inventory_id: inventoryjson.inventory_id,
      quantity: quantity
    });
  } catch (err) {
    result = `Error: ${err}`;
  }
  return {result: result};
}

/*
function getInventory() {

}
*/

// ENDPOINTS
/**
 * Listen on $PORT for JSON.
 */
 app.use(express.json())

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

app.post('/addclinic', (req, res) => {
  const clinicdetails = req.params.clinicjson

})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});