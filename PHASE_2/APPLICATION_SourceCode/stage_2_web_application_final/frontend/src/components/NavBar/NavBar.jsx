import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

export default function NavBar(props) {
  const setLogin = () => {
    console.log(this);
    props.set_login_status(false);
  }

  if (props.log_status === true) {
    return (
      <div className="Nav-Bar">
        <ul className='Left-List' style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <li><Link className="Home-Text" to={{ pathname: "/" }}>Home</Link></li>
        </ul>
        <ul className='Right-List'>
          <li><a href="/" variant="logout" className="right_text" onClick={setLogin}>
            Log out
        </a></li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="Nav-Bar">
        <ul className='Left-List' style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <li><Link className="Home-Text" to={{ pathname: "/" }}>Home</Link></li>
        </ul>
        <ul className='Right-List' style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <li><Link className="Logout-Text" to={{ pathname: "/"}}>Logout</Link></li>
          <li><Link className="inventory-text" to={{ pathname: "/clinic", state: { clinicID: props.clinicID }}}>Inventory</Link></li>
          <li><Link className="bookings-text" to={{ pathname: "/clinicbooking", state: { clinicID: props.clinicID }}}>Bookings</Link></li>
        </ul>
      </div>
    );
  }

}
