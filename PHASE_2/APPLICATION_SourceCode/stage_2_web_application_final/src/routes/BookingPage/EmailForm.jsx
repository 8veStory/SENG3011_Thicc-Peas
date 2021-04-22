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
  const [vaccTest, setVaccTest] = useState('');

  let history = useHistory();

  const sendEmail = (e) => {
    e.preventDefault();

    if (!name)
      alert("Name cannot be empty.");
    else if (!email)
      alert("Email cannot be empty.");
    else if (!date)
      alert("Date cannot be empty.");

    console.log(vaccTest);
    console.log(name);
    console.log(date);
    console.log(props.clinicInfo.email);
    console.log(email);
    emailjs.send('gmail', 'appointment', { type: vaccTest, name: name, date: date, clinic_email: 'ryanface2516@gmail.com', client_email: email, verif: makeid(30) }, 'user_A8yNOUVbToXNXYZSDHypj')
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

    alert('Booking email sent successfully!');
  }

  const VaccTestList = ({ info }) => {
    let tests = [];
    for (let test in info.tests) {
      console.log(test);
      tests.push((
        <option value={test}>{test} Test</option>
      ));
    }
    for (let test in info.vaccines) {
      tests.push((
        <option value={test}>{test} Vaccine</option>
      ));
    }
    // console.log(tests);
    // console.log(info);
    return tests;
  }

  function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
  }

  console.log(makeid(30));

  return (
    <form className="base-container" onSubmit={sendEmail}>
      <div className="header">
        <div>
          Email Booking
        </div>
        <div>
          {props.clinicInfo.name}
        </div>
      </div>
      <div className="content">
        <div className="login-image">
          <img src={registerImg} alt="A doctor" />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="name" name="name" placeholder="Name" onChange={e => setName(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input type="text" name="date" placeholder="Date" onChange={e => setDate(e.target.value)} />
          </div>

          {/* <div className="form-group">
            <label htmlFor="type">Type</label>
            <select name="types" id="types" value={type} onChange={e => setType(e.target.value)}>
              <option value="Test">Test</option>
              <option value="Vaccine">Vaccine</option>
            </select>
          </div> */}

          <div className="form-group">
            <label htmlFor="vacctest">Vaccine / Test</label>
            <select name="types" id="vacctest" value={vaccTest} onChange={e => setVaccTest(e.target.value)}>
              <VaccTestList info={props.clinicInfo} />
            </select>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button type="submit" className="btn">Book</button>
      </div>
    </form>
  );
}
