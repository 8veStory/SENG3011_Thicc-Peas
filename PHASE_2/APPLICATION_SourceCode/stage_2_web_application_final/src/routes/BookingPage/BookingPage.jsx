import React, { useState } from 'react';
import { Switch, Route, withRouter, useHistory } from 'react-router-dom';

import EmailPhoneForm from './EmailPhoneForm';
import backArrow from './../../images/arrow-back.svg';

import './BookingPage.css';

export default function BookingPage() {
  const [login_status, set_login_status] = useState(false);
  let BookingFormWithRouter = withRouter((props) => <EmailPhoneForm {...props} set_login_status={set_login_status}/>);

  let history = useHistory();
  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="layout">
      <div className="back-arrow" onClick={handleBack}>
        <img src={backArrow} />
      </div>
      <div className="booking-form">
        <BookingFormWithRouter />
      </div>
    </div>
  );
}
