import React, { useState } from 'react'
import registerImg from "../../images/LoginRegisterLogo.svg";

export default function RegisterForm() {
  // React States
  const [pwd, setPwd] = useState('');
  const [checkPwd, setCheck] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('Australia');
  const [state, setState] = useState('New South Wales');
  const [email, setEmail] = useState('');

  return (
    <div className="base-container">
      <div className="header">Register</div>
      <div className="content">
        <div className="login-image">
          <img src={registerImg} alt="A doctor" />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" />
          </div>

          <div className="form-group">
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input type="password" name="repeatPassword" placeholder="Repeat your password" />
          </div>

          <div className="form-group">
            <label htmlFor="address">Clinic Address</label>
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
        <button type="button" className="btn">Register</button>
      </div>
    </div>
  );
}
