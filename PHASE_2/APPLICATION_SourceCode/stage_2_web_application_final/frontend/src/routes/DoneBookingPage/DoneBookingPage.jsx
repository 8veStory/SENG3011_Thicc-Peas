import React from 'react';
import { Link } from 'react-router-dom';
import mailDoneImg from "../../images/mail_sent.svg";

import './DoneBookingPage.css';

export default function DoneBookingPage(props) {

  return (
      <div className="return-container">
          <div className="mail-sent-image">
            <img src={mailDoneImg} alt="Mail sent" />
          </div>
          <div className="return-text">Your appointment request has been sent. Please wait for confirmation.</div>
          <Link to='/'><div className="return-button vt-main-button">Return Home</div></Link>
      </div>
  );
}

