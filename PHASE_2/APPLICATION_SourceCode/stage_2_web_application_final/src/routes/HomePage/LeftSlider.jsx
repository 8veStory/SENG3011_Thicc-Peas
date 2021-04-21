import React from 'react';

import './LeftSlider.css';

export default function LeftSlider(props) {
  let sliderClasses = 'left-slider';
  if (props.show) {
    sliderClasses = 'left-slider open';
  }

  return (
    <nav className={sliderClasses} onClick={props.hide}></nav>
  );
}
