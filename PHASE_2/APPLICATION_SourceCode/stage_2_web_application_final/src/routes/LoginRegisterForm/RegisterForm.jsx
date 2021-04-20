import React, { useState } from 'react'
import registerImg from "../../images/LoginRegisterLogo.svg";
import "./RegisterForm.css";

export default function RegisterForm(props) {
  // React States
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [checkPwd, setCheck] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('Australia');
  const [state, setState] = useState('New South Wales');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.table({ pwd: pwd, checkPwd: checkPwd, address: address, country: country, state: state, email: email });

    // Check all fields are not empty...
    if (!email)
      alert("Email cannot be empty.");
    else if (!pwd)
      alert("Password cannot be empty.");
    else if (!address)
      alert("Address cannot be empty.");
    else if (!state)
      alert("State cannot be empty.");
    else if (!country)
      alert("Country cannot be empty.");

    console.log("Make API call here and check that signup is successful...")

    console.log("Successful signup");
    window.location.href = "/clinic";
  }

  return (
    <form className="base-container" onSubmit={handleSubmit}>
      <div className="header">Register</div>
      <div className="content">
        <div className="login-image">
          <img src={registerImg} alt="A doctor" />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="email" onChange={e => setEmail(e.target.value)}>Email</label>
            <input type="email" name="email" placeholder="Email" />
          </div>

          <div className="form-group">
            <label htmlFor="password" onChange={e => setPwd(e.target.value)}>Password</label>
            <input type="password" name="password" placeholder="Password" />
          </div>

          <div className="form-group">
            <label htmlFor="repeatPassword" onChange={e => setCheck(e.target.value)}>Repeat Password</label>
            <input type="password" name="repeatPassword" placeholder="Repeat your password" />
          </div>

          <div className="form-group">
            <label htmlFor="address" onChange={e => setAddress(e.target.value)}>Clinic Address</label>
            <input type="text" name="clinicAddress" placeholder="123 John Street, Flemington, 2532, Sydney" />
          </div>

          <div className="form-group">
            <label htmlFor="country">Clinic Country</label>
            <select name="countries" id="countries" value={country} onChange={e => setCountry(e.target.value)}>
              <option value="Australia">Australia</option>
              <option value="United States of America">United States of America</option>
              <option value="Japan">Japan</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="state">Clinic State</label>
            <select name="states" id="states" value={state} onChange={f => setState(f.target.value)}>
              <option value="New South Wales">New South Wales</option>
              <option value="Queensland">Queensland</option>
              <option value="South Autralia">South Autralia</option>
              <option value="Victoria">Victoria</option>
              <option value="Western Australia">Western Australia</option>
              <option value="Tasmania">Tasmania</option>
            </select>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button type="submit" className="btn">Register</button>
      </div>
    </form>
  );
}
