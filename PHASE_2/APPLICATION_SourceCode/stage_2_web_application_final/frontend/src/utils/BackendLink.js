/**
 * Exposes functions that interface with the backend.
 */

const fetch = require('node-fetch');
const { BACKEND_URL } = require('../config');

/**
 * Signs up a clinic given the details.
 * @param {String} email
 * @param {String} name
 * @param {String} password
 * @param {String} address
 * @param {String} country
 * @param {String} state
 */
export async function signUpClinicAsync(name, email, password, passwordCheck, address, state, country) {
    // We're legit sending passwords over http because we're such a g.
    const body = {
        email: email,
        password: password,
        password_check: passwordCheck,
        name: name,
        address: address,
        state: state,
        country: country
    };

    console.log(BACKEND_URL);

    return await (await fetch(BACKEND_URL + "/signup",
                      {
                        method: "post",
                        body: JSON.stringify(body),
                        headers: { "Content-Type": "application/json" }
                        })
                 ).json();
}

/**
 * Logs in a clinic.
 * @param {String} email 
 * @param {String} password 
 * @returns 
 */
export async function logInClinicAsync(email, password) {
    // We're legit sending passwords over http because we're such a g.
    const body = {
        email: email,
        password: password
    };

    return await (await fetch(BACKEND_URL + "/login",
                      {
                        method: "post",
                        body: JSON.stringify(body),
                        headers: { "Content-Type": "application/json" }
                      }
                 )).json();
}

// TODO: add a dropdown to the book screen.
/**
 * 
 * @param {String} fullName Full name of the booker.
 * @param {String} email The email address of the booker.
 * @param {Date} date Desired date and time of the booking.
 * @param {Array<String>} vaccineIDs Array of vaccines being booked.
 * @param {Array<String>} testIDs Array of tests being booked.
 * @returns 
 */
export async function bookAsync(clinic_id, email, date, name, medicare_num, vaccineIDs, testIDs) {
    const body = {
        clinic_id: clinic_id,
        name: name,
        email: email,
        date: date,
        medicare_num: medicare_num,
        tests: testIDs,
        vaccines: vaccineIDs,
    };

    return await (await fetch(BACKEND_URL + "/book",
                      {
                        method: "post",
                        body: JSON.stringify(body),
                        headers: { "Content-Type": "application/json" }
                      }
    )).json();
}

export async function acceptBookAsync(clinicID, pendingBookingID) {
    const body = {
        clinic_id: clinicID,
        pending_booking_id: pendingBookingID
    };

    return await (await fetch(BACKEND_URL + "/bookaccept",
                      {
                        method: "post",
                        body: JSON.stringify(body),
                        headers: { "Content-Type": "application/json" }
                      }
    )).json();
}

export async function getClinicsAsync() {
    return await fetch(BACKEND_URL + "/getclinics")
                    .then(res => { console.log(res); return res; }
    );
}

export async function getVaccinesAsync() {
    return await fetch(BACKEND_URL + "/getvaccines")
                    .then(res => { console.log(res); return res; }
    );
}

export async function getTestsAsync() {
    return await fetch(BACKEND_URL + "/gettests")
                    .then(res => { console.log(res); return res; }
    );
}