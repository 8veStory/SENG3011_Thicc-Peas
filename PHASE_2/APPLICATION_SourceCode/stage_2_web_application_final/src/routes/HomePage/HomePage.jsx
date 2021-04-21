import mainLogo from '../../images/mainLogo.png';
import clinicLogo from '../../images/clinicLogo.png';
import individualLogo from '../../images/individualLogo.png';
import React,{useState} from 'react';
import { Link } from 'react-router-dom';

import IndividualPages from './IndividualPages';
import Backdrop from './Backdrop';

import "./HomePage.css";

export default function HomePage(props) {
  const [leftSliderOpen, setLeftSliderOpen] = useState(false);

  let leftSliderHandler = () => {
    // setLeftSliderOpen((prevState) => {
    //   return {leftSliderOpen: !prevState.leftSliderOpen};
    // });
    setLeftSliderOpen(true);
  };

  let backdropClickHandler = () => {
    setLeftSliderOpen(false);
  };

  // let leftSlider;
  let backdrop;

  if (leftSliderOpen) {
    // leftSlider = <IndividualPages/>;
    backdrop = <Backdrop click={backdropClickHandler}/>;
  }

  return (
    <body>
      <IndividualPages show={leftSliderOpen}/>
      {/* {leftSlider} */}
      {backdrop}
      <div className="header">
        <h1>
          VaccTracc
        </h1>
      </div>
      <div className="choice">
        <div className="individual-box" onClick={leftSliderHandler}>
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