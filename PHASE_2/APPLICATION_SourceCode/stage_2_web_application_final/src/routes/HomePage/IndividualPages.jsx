import React from 'react';

import './IndividualPages.css';

export default function IndividualPages(props) {
  let sliderClasses = 'individual-pages';
  if (props.show) {
    sliderClasses = 'individual-pages open';
  }

  return (
    <nav className={sliderClasses}>
      <ul>
        <li><a href="/"></a>Products</li>
        <li><a href="/"></a>Users</li>
      </ul>
    </nav>
  );
}
