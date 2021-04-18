import "./style.css";
import "./LoginRegisterForm.css";
import React, { useState } from "react";
import loginImg from "../../images/LoginRegisterLogo.svg";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  return (
    <div className="base-container">
      <div className="header">Login</div>
      <div className="content">
        <div className="login-image">
          <img src={loginImg} alt="A doctor" />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" />
          </div>
        </div>
      </div>
      <div className="buttons">
        <button type="button" className="btn">Login</button>
      </div>
    </div>
  );
}