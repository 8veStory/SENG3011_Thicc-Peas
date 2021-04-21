import React from 'react';

import './RightSlider.css';

export default function RightSlider(props) {
  let sliderClasses = 'right-slider';
  if (props.show) {
    sliderClasses = 'right-slider open';
  }

  return (
    <nav className={sliderClasses} onClick={props.hide}></nav>
  );
}
