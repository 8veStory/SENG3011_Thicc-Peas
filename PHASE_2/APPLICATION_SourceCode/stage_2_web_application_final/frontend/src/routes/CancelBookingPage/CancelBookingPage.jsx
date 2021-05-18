import React from 'react';
import { Link } from 'react-router-dom';

import './CancelBookingPage.css';

export default function BookingPage(props) {

  return (
      <div className="cancel-container">
          <div className="cancel-text">Your booking has been cancelled.</div>
          <Link to='/'><div className="return-button vt-main-button">Return Home</div></Link>
      </div>
  );
}

