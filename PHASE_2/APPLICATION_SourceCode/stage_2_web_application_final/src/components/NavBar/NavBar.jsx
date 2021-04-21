import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

export default function NavBar() {
  return (
    <ul className='Nav-Bar' style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <li> <Link className="Login-Text" to={{ pathname: "/register", state: { fromLogIn: true, cameFromLink: true } }}><a>Log In</a></Link> </li>

      <li><Link className="Signup-Text" to={{ pathname: "/register", state: { fromLogIn: false, cameFromLink: true } }}><a>Sign Up</a></Link></li>

      <li><Link><a href="/" variant="logout" className="Logout-Text" onClick={() => console.log(this)}>
        {/* Get rid of log out if user is not signed in. Will probably have
        to implement some pretty pog authentication in React somehow. */}
        Log out
      </a></Link></li>
    </ul>
  );
}