import React, { useState } from 'react';

import './PharmacyCard.css';

export default function PharmacyCard({ pharmacyId, name, image, location,  openCloseTime}) {
    if (!name)
        name = " TEST NAME";
    if (!location)
        location = "TEST DATE";
    if (!openCloseTime)
        openCloseTime = "TEST TIMES";

    console.log(openCloseTime);

    return (
        <div className="pharmacy-card">
            <div className="pharmacy-name">
                <b>{name}</b>
            </div>
            <div className="pharmacy-location">
                <i>{location}</i>
            </div>
            <div className="pharmacy-time">
                <ul>
                    <li>Sunday: {openCloseTime.sunday}</li>
                    <li>Monday: {openCloseTime.monday}</li>
                    <li>Tuesday: {openCloseTime.tuesday}</li>
                    <li>Wednesday: {openCloseTime.wednesday}</li>
                    <li>Thursday: {openCloseTime.thursday}</li>
                    <li>Friday: {openCloseTime.friday}</li>
                    <li>Saturday: {openCloseTime.saturday}</li>
                </ul>
            </div>
        </div>
    );
}
