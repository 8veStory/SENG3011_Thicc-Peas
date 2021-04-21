import mainLogo from '../../images/mainLogo.png';
import clinicLogo from '../../images/clinicLogo.png';
import individualLogo from '../../images/individualLogo.png';
import React from 'react';
import { Link } from 'react-router-dom';

import "./HomePage.css";

export default function HomePage() {
  return (
    <body>
      {/* <h1>VaccTracc</h1>
      <div class="image">
        <img src={mainLogo} alt="logo" />
      </div>
      <div className="linkButtonWrapper">
        <Link className="indvButton-text" to={{ pathname: "/" }}>
          <div className="linkButton indv">
            Individual
          </div>
        </Link>

        <Link className="clinicButton-text" to={{ pathname: "/" }}>
          <div className="linkButton clinic">
            Clinic/Hospital
          </div>
        </Link>
      </div> */}

      <div className="header">
        <h1>
          VaccTracc
        </h1>
      </div>
      <div className="choice">
        <div className="individual-box">
          <img src={individualLogo}/>
          <h2>Individual</h2>
        </div>
        <div className="clinic-box">
          <img src={clinicLogo}/>
          <h2>Clinic</h2>
        </div>
      </div>
    </body>
  );
}