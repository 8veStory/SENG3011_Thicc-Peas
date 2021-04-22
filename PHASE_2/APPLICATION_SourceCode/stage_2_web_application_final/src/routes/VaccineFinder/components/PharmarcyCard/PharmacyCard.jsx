import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import BookingPage from './../../../BookingPage/EmailPhoneForm';

import './PharmacyCard.css';

export default function PharmacyCard({ id, name, image, address, openCloseTimes, phone, email, onclick}) {
    if (!name)
        name = " TEST NAME";
    if (!address)
        address = "TEST ADDRESS";
    if (!openCloseTimes)
        openCloseTimes = "TEST TIMES";
    if (!onclick) {
        onclick = () => {};
    }

    console.log(openCloseTimes);

    let history = useHistory();
    const handleBook = (e) => {
        history.push("/book");
        // window.location.href = "/clinic";
    }

    return (
        <div data-internalid={id} onClick={onclick} className="pharmacy-card">
            <div className="pharmacy-name">
                <b>{name}</b>
            </div>
            <div className="pharmacy-location">
                <i>{address}</i>
            </div>

            <div className="pharmacy-contact-info">
                <h3>Contact Info</h3>
                <div className="pharmacy-phone">
                    {phone ? `Ph: ${phone}` : ""}
                </div>
                <div className="pharmacy-email">
                    {email ? `Email: ${email}` : ""}
                </div>
            </div>

            <div className="pharmacy-time">
                <h3>Opening/Closing Times</h3>
                <ul>
                    <li>Sunday: {openCloseTimes.sunday}</li>
                    <li>Monday: {openCloseTimes.monday}</li>
                    <li>Tuesday: {openCloseTimes.tuesday}</li>
                    <li>Wednesday: {openCloseTimes.wednesday}</li>
                    <li>Thursday: {openCloseTimes.thursday}</li>
                    <li>Friday: {openCloseTimes.friday}</li>
                    <li>Saturday: {openCloseTimes.saturday}</li>
                </ul>
            </div>

            <button className="book-btn" onClick={handleBook}>Book</button>
        </div>
    );
}
