import mainLogo from '../../images/mainLogo.png';
import React from 'react';
import { Link } from 'react-router-dom';

import "./HomePage.css";

export default function HomePage() {
    return (
        <div>
            {/* <p>I am a placeholder</p> */}
            <h1>VaccTracc</h1>
            <div class="image">
                <img src={mainLogo} alt="logo"/>
            </div>
            <div className="linkButtonWrapper">
                <Link className="indvButton-text" to={{ pathname: "/" }}>
                    <div className="linkButton indv">
                        Individual
                    </div>
                </Link>
                
                <Link  className="clinicButton-text" to={{ pathname: "/" }}>
                    <div className="linkButton clinic">
                        Clinic/Hospital
                    </div>
                </Link>
            </div>
            
        </div>
    );
}