import React from 'react';

import './NavBar.css';
export default function NavBar() {
  return (
    <ul className='App-header' style={{flexDirection:'row',justifyContent:'flex-end'}}> 
      <a
        href="/login"
        variant="login"
        className="top_text"
      >
        Log in
      </a>

      <a
        href="/signup"
        variant="signup"
        className="left_text"
      >
        Sign up
      </a>

      <a
        href="/"
        variant="logout"
        className="right_text"
        
        onClick={() => {
          console.log(this);
        }}
      >
        Log out
      </a>
    </ul>
  );
}