import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import emailjs from 'emailjs-com';

import registerImg from "../../images/LoginRegisterLogo.svg";
import "./EmailForm.css";

export default function EmailForm(props) {
  // React States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('Test');
  const [clinic, setClinic] = useState('given clinic');

  let history = useHistory();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    // console.table({ name: name, email: email, phone: phone, date: date });

    // Check all fields are not empty...
    // if (!name)
    //   alert("Name cannot be empty.");
    // else if (!email)
    //   alert("Email cannot be empty.");
    // else if (!phone)
    //   alert("Phone cannot be empty.");
    // else if (!date)
    //   alert("Date cannot be empty.");

    // console.log("Send email through backend...")
    // props.set_login_status(true);
    // console.log("Successful signup");
    // history.pushState("/clinic");
  }

  return (
    <form className="base-container" onSubmit={sendEmail}>
      <div className="header">Email Booking</div>
      <div className="content">
        <div className="login-image">
          <img src={registerImg} alt="A doctor" />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="name" onChange={e => setName(e.target.value)}>Name</label>
            <input type="name" name="name" placeholder="Name" />
          </div>

          <div className="form-group">
            <label htmlFor="email" onChange={e => setEmail(e.target.value)}>Email</label>
            <input type="email" name="email" placeholder="Email" />
          </div>

          <div className="form-group">
            <label htmlFor="phone" onChange={e => setPhone(e.target.value)}>Phone</label>
            <input type="tel" name="phone" placeholder="Phone" pattern="\+[0-9]{2} ?[0-9]{3} ?[0-9]{3} ?[0-9]{3}|[0-9]{4} ?[0-9]{3} ?[0-9]{3}" />
          </div>

          <div className="form-group">
            <label htmlFor="date" onChange={e => setDate(e.target.value)}>Date</label>
            <input type="text" name="date" placeholder="Date" />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select name="types" id="types" value={type} onChange={e => setType(e.target.value)}>
              <option value="Test">Test</option>
              <option value="Vaccine">Vaccine</option>
            </select>
          </div>

          {/* <div className="form-group">
            <label htmlFor="state">Clinic State</label>
            <select name="states" id="states" value={state} onChange={f => setState(f.target.value)}>
              <option value="New South Wales">New South Wales</option>
              <option value="Queensland">Queensland</option>
              <option value="South Autralia">South Autralia</option>
              <option value="Victoria">Victoria</option>
              <option value="Western Australia">Western Australia</option>
              <option value="Tasmania">Tasmania</option>
            </select>
          </div> */}
        </div>
      </div>

      <div className="buttons">
        <button type="submit" className="btn">Book</button>
      </div>
    </form>
  );
}
