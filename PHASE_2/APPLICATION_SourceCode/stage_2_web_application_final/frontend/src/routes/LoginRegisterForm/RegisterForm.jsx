import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import registerImg from "../../images/LoginRegisterLogo.svg";
import { signUpClinicAsync } from '../../utils/BackendLink';
import "./RegisterForm.css";

export default function RegisterForm(props) {
  // React States
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [checkPwd, setCheckPwd] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('New South Wales');
  const [country, setCountry] = useState('Australia');

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.table({ pwd: pwd, checkPwd: checkPwd, address: address, country: country, state: state, email: email });

    // Check all fields are not empty...
    // if (!name) {
    //   alert("Name cannot be empty.");
    // }
    // if (!email) {
    //   alert("Email cannot be empty.");
    // }
    // if (!pwd) {
    //   alert("Password cannot be empty."); 
    // }
    // if (!address) {
    //   alert("Address cannot be empty.");
    // }
    // if (!state) {
    //   alert("State cannot be empty.");
    // }
    // if (!country) {
    //   alert("Country cannot be empty.");
    // }

    let result = await signUpClinicAsync(name, email, pwd, checkPwd, address, state, country);
    if (result.success) {
      // TODO: Pass JWT/ClinicID to props...
      props.set_login_status(true);
      history.push("/clinic");
    } else {
      console.error(result.error);
    }
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
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" onChange={e => setPwd(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input type="password" name="repeatPassword" placeholder="Repeat your password" onChange={e => setCheckPwd(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="name">Clinic Name</label>
            <input type="text" name="clinicAddress" placeholder="Flemington Medical Clinic" onChange={e => setName(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="address">Clinic Address</label>
            <input type="text" name="clinicAddress" placeholder="123 John Street, Flemington, 2532, Sydney" onChange={e => setAddress(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="state">Clinic State</label>
            <select name="states" id="states" value={state} onChange={e => setState(e.target.value)}>
              <option value="New South Wales">New South Wales</option>
              <option value="Queensland">Queensland</option>
              <option value="South Autralia">South Autralia</option>
              <option value="Victoria">Victoria</option>
              <option value="Western Australia">Western Australia</option>
              <option value="Tasmania">Tasmania</option>
            </select>
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
        </div>
      </div>

      <div className="buttons">
        <button type="submit" className="vt-main-button">Register</button>
      </div>
    </form>
  );
}
