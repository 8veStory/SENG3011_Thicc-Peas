import "./PhoneForm.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import loginImg from "../../images/LoginRegisterLogo.svg";

export default function PhoneForm(props) {
  return (
    <div className="base-container">
      <div className="header">
        <div>
          Phone Booking
        </div>
        <div>
          {props.clinicInfo.name}
        </div>
      </div>
      <div className="content">
        <div className="login-image">
          <img src={loginImg} alt="A doctor" />
        </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" name="phone" value={props.clinicInfo.phone} readonly="readonly" />
          </div>
      </div>
    </div>
  );
}
