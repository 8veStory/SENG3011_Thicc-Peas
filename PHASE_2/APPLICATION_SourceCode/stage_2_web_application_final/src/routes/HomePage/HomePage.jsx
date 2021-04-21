import mainLogo from '../../images/mainLogo.png';
import clinicLogo from '../../images/clinicLogo.png';
import individualLogo from '../../images/individualLogo.png';
import React,{useState} from 'react';
import { Link } from 'react-router-dom';

import LeftSlider from './LeftSlider';
import RightSlider from './RightSlider';
import Backdrop from './Backdrop';
import LoginRegisterForm from '../LoginRegisterForm/LoginRegisterForm';

import "./HomePage.css";

export default function HomePage(props) {
  const [leftSliderOpen, setLeftSliderOpen] = useState(false);
  const [rightSliderOpen, setRightSliderOpen] = useState(false);

  let leftSliderHandler = () => {
    // setLeftSliderOpen((prevState) => {
    //   return {leftSliderOpen: !prevState.leftSliderOpen};
    // });
    setLeftSliderOpen(true);
  };

  let rightSliderHandler = () => {
    // setRightSliderOpen((prevState) => {
    //   return {rightSliderOpen: !prevState.rightSliderOpen};
    // });
    setRightSliderOpen(true);
  };

  // let backdropClickHandler = () => {
  //   setLeftSliderOpen(false);
  //   setRightSliderOpen(false);
  // };

  let backClickHandler = () => {
    setLeftSliderOpen(false);
    setRightSliderOpen(false);
  };

  // let leftSlider;
  // let backdrop;

  if (leftSliderOpen) {
    // leftSlider = <LeftSlider/>;
    // backdrop = <Backdrop click={backdropClickHandler}/>;
  }

  return (
    <body>
      <LeftSlider show={leftSliderOpen} hide={backClickHandler}/>
      <RightSlider show={rightSliderOpen} hide={backClickHandler}/>
      {/* <LoginRegisterForm/> */}
      {/* {leftSlider} */}
      {/* {backdrop} */}
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
        <div className="clinic-box" onClick={rightSliderHandler}>
          <img src={clinicLogo}/>
          <h2>Clinic</h2>
        </div>
      </div>
    </body>
  );
}