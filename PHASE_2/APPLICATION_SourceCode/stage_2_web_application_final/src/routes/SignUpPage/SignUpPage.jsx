import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ConditionalLink from '../../components/ConditionalLink/ConditionalLink';

import "./SignUpPage.css";

export default function SignUpPage() {
  // React States
  const [pwd, setPwd] = useState('');
  const [checkPwd, setCheck] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('Australia');
  const [state, setState] = useState('New South Wales');
  const [email, setEmail] = useState('');

  // Normal States
  let login = false;

  // Helper Methods
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const handleSubmit = () => {
    // Debug output
    console.table({ pwd: pwd, checkPwd: checkPwd, address: address, country: country, state: state, email: email });

    let valid = true;
    if (!validateEmail(email)) {
      valid = false;
      // TODO: Replace 'alert()' with actual DOM warnings.
      alert("Invalid email");
    }
    if (pwd.value === "") {
      valid = false;
      // TODO: Replace 'alert()' with actual DOM warnings.
      alert("Password cannot be empty.");
    }
    if (pwd.value !== checkPwd.value && valid) {
      valid = false;
      // TODO: Replace 'alert()' with actual DOM warnings.
      alert("Passwords do not match.");
    }

    login = valid;

    console.log("Make API call here and check that signup is successful...")

    console.log("Successful signup");
    this.props.push("/clinic")
  }

  return (
    <form className="form">

      <h1>Sign Up</h1>
      <p>Please fill in this form to create an account.</p>

      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email" id="email" value={email} onChange={a => setEmail(a.target.value)} ></input>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" id="psw" value={pwd} onChange={b => setPwd(b.target.value)} ></input>

      <label for="psw-repeat"><b>Repeat Password</b></label>
      <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" value={checkPwd} onChange={c => setCheck(c.target.value)} ></input>

      <label for="address"><b>Clinic Address</b></label>
      <input type="text" placeholder="John Hospital, 123 Vaccine Street" name="addr" id="addr" value={address} onChange={d => setAddress(d.target.value)} ></input>

      <label for="country"><b>Clinic Country</b></label>
      <select name="countries" id="countries" value={country} onChange={e => setCountry(e.target.value)}>
        <option value="Australia">Australia</option>
        <option value="United States of America">United States of America</option>
        <option value="Japan">Japan</option>
        <option value="United Kingdom">United Kingdom</option>
      </select>

      <label htmlFor="state"><b>Clinic State</b></label>
      <select name="states" id="states" value={state} onChange={f => setState(f.target.value)}>
        <option value="New South Wales">New South Wales</option>
        <option value="Queensland">Queensland</option>
        <option value="South Autralia">South Autralia</option>
        <option value="Victoria">Victoria</option>
        <option value="Western Australia">Western Australia</option>
        <option value="Tasmania">Tasmania</option>
      </select>

      <div className="clearfix" onClick={handleSubmit}>
        <ConditionalLink condition={(() => login)} to='/clinic'>Sign Up</ConditionalLink>
      </div>
    </form>
  )
}