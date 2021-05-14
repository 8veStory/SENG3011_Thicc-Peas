import React, { useState } from 'react';
import { Switch, Route, withRouter, useHistory } from 'react-router-dom';
// import Icon from 'react-native-ionicons';

import LoginRegisterForm from './../LoginRegisterForm/LoginRegisterForm';

import './RightSlider.css';
import backArrow from './../../images/arrow-back.svg';

export default function RightSlider(props) {
  let sliderClasses = 'right-slider';
  if (props.show) {
    sliderClasses = 'right-slider open';
  }

  const [login_status, set_login_status] = useState(false);
  let LoginRegisterFormWithRouter = withRouter((props) => <LoginRegisterForm {...props} set_login_status={set_login_status}/>);

  return (
    // <nav className={sliderClasses} onClick={props.hide}>
    <nav className={sliderClasses}>
      <div className="layout">
        <div className="back-arrow" onClick={props.hide}>
          <img src={backArrow}/>
        </div>
        <div className="login-form">
          <LoginRegisterFormWithRouter/>
        </div>
      </div>
    </nav>
  );
}
