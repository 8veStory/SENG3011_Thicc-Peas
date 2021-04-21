import React, { useState } from 'react';

import './PharmacyCard.css';

export default function PharmacyCard({ pharmacyId, name, image, location,  openCloseTimes, phone, email}) {
    if (!name)
        name = " TEST NAME";
    if (!location)
        location = "TEST ADDRESS";
    if (!openCloseTimes)
        openCloseTimes = "TEST TIMES";

    console.log(openCloseTimes);

    return (
        <div className="pharmacy-card">
            <div className="pharmacy-name">
                <b>{name}</b>
            </div>
            <div className="pharmacy-location">
                <i>{location}</i>
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
        </div>
    );
}
