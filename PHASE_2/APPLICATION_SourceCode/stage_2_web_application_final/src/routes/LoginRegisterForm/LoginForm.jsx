import "./LoginForm.css";
import React, { useState } from "react";
import loginImg from "../../images/LoginRegisterLogo.svg";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Log-in details:", {email: email, password: pwd});

    console.log("Make API call here and check if details are correct...");

    console.log("Successful login");
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