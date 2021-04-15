import './App.css';
import React, { useState } from 'react'

import mainLogo from'./1.png';

import Menu_example from './menu'

import Left_menu from './left_menu'
import {BrowserRouter, Switch, Route,withRouter,useHistory,Link} from 'react-router-dom';

import clinic_page from './clinic';
import check_page from './check';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function handle_submit(psw,repeat,address,country,state,email) {
  console.log(psw + " " + repeat + " " + address + " " + country + " " + state + " " + email);
  
  
  
  var valid = 1;
  if (validateEmail(email) === false && valid === 1) {
    valid = 0;
  }
  if (psw.value === "" && valid === 1) {
    valid = 0;
  }
  if (psw.value !== repeat.value && valid === 1) {
    valid = 0;
  }
  if (valid === 1) {
    login = 1;
    return 1;
    
  }
  
  return 0;
}

var login = 0;


function App(){
  const [pwd, setPwd] = useState('');
  const [checkPwd, setCheck] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('Australia');
  const [state, setState] = useState('New South Wales');
  const [email, setEmail] = useState('');

  const [login_email, login_setEmail] = useState('');
  const [login_pwd, login_setPwd] = useState('');
  console.log(useHistory);
  
  let history = useHistory();
  console.log(history);
  const home_page = () => (
    <div class="image">
      <img src={mainLogo}  alt="logo"/>
    </div>
  )
  
  const login_page = () => (
    <div class="container">
    <h1>Login</h1>
    <p>Please enter details to login</p>

    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" value={login_email} onChange={a => login_setEmail(a.target.value)} required></input>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" value={login_pwd} onChange={a => login_setPwd(a.target.value)} required></input>

    <div class="clearfix">
      <button href="/"  class="cancelbtn">Cancel</button>
      <button type="submit" class="loginbtn">Login</button>
    </div>
  </div>
  )
  const signup_page = () => (
    <div class="container">
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
      <label for="state"><b>Clinic State</b></label>
      <select name="states" id="states" value={state} onChange={f => setState(f.target.value)}>
        <option value="New South Wales">New South Wales</option>
        <option value="Queensland">Queensland</option>
        <option value="South Autralia">South Autralia</option>
        <option value="Victoria">Victoria</option>
        <option value="Western Australia">Western Australia</option>
        <option value="Tasmania">Tasmania</option>
      </select>
      <div class="clearfix">
        

        <Link to={handle_submit(pwd,checkPwd,address,country,state,email) ? '/':'/2'} onClick={submitValue} >next</Link>
      </div>
    </div>
  )

  const submitValue = () => {
    const data = {
        'email' : email,
        'address' : address,
        'country' : country,
        'state' : state,
        'pwd' : pwd,
        'checkPwd' : checkPwd
        
    }
    var valid = 1;
    if (validateEmail(data.email) === false && valid === 1) {
      valid = 0;
      alert("email is invalid");
    }
    if (data.pwd === "" && valid === 1) {
      valid = 0;
      alert("passward cant be empty")
    }
    if (data.pwd !== data.checkPwd && valid === 1) {
      valid = 0;
      alert("passward is not same");
    }
    if (valid === 1) {
      login = 1;
      console.log("log in");
      
    }
}
  return (
    <div className="App">
      
      
     
      <Menu_example/>
      <BrowserRouter>
       
          <Left_menu />
          <Switch>
          <Route path='/' exact component={withRouter(home_page)}/>
          <Route path='/signup' exact component={withRouter(signup_page)}/>
          <Route path='/login' exact component={withRouter(login_page)}/>
          <Route path='/clinic' exact component={withRouter(clinic_page)}/>
          <Route path='/check' exact component={withRouter(check_page)}/>
        </Switch>
        
        
      </BrowserRouter>

      
    </div>
  );
}




export default App;