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
    console.log(type);
    console.log(name);
    console.log(date);
    console.log(props.clinicInfo.email);
    console.log(email);
    emailjs.send('gmail', 'appointment', { type: type, name: name, date: date, clinic_email: 'maxemersonowen@gmail.com', client_email: email }, 'user_A8yNOUVbToXNXYZSDHypj')
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

  const VaccTestList = ({info}) => {
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

  console.log(props.clinicInfo);

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

          {/* <div className="form-group">
            <label htmlFor="phone" onChange={e => setPhone(e.target.value)}>Phone</label>
            <input type="tel" name="phone" placeholder="Phone" pattern="\+[0-9]{2} ?[0-9]{3} ?[0-9]{3} ?[0-9]{3}|[0-9]{4} ?[0-9]{3} ?[0-9]{3}" />
          </div> */}

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input type="text" name="date" placeholder="Date" onChange={e => setDate(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select name="types" id="types" value={type} onChange={e => setType(e.target.value)}>
              <option value="Test">Test</option>
              <option value="Vaccine">Vaccine</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="vacctests">Vaccines / Tests</label>
            <select name="types" id="vacctests" value={vaccTest} onChange={e => setVaccTest(e.target.value)}>
              <VaccTestList info={props.clinicInfo}/>
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
