import "./LoginForm.css";
import React, { useState } from "react";
import { logInClinicAsync } from '../../utils/BackendLink';
import { useHistory } from "react-router-dom";
import loginImg from "../../images/LoginRegisterLogo.svg";

export default function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let results = await logInClinicAsync(email, pwd);
    if (results.success) {
      console.log("Successful login");
      props.set_login_status(true);

      history.push("/clinic");
    } else {
      console.error("Unsuccessful login");
      console.error(`${results.error}`);
    }
  }

  return (
    <div className="base-container">
      <div className="header">Login</div>
      <div className="content">
        <div className="login-image">
          <img src={loginImg} alt="A doctor" />
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" onChange={e => setPwd(e.target.value)}/>
          </div>
          <div className="buttons">
            <button type="submit" className="btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
