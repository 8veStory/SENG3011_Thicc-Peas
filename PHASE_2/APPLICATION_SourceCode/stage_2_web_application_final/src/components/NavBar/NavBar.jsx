import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
export default function NavBar() {
  return (
    <ul className='App-header' style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Link className="top_text" to={{pathname: "/register", state: {fromLogIn: true }}}>Log In</Link>
      <Link className="left_text" to={{pathname: "/register", state: {fromLogIn: false }}}>Sign Up</Link>

      <a href="/" variant="logout" className="right_text" onClick={() => console.log(this)}>
        {/* Get rid of log out if user i snot signed in. Will probably have
        to implement some pretty pog authentication in React somehow. */}
        Log out
      </a>
    </ul>
  );
}