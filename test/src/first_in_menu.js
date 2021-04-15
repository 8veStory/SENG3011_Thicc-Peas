import React from 'react';

import './first_in_menu.css';

import {BrowserRouter,Link} from 'react-router-dom';



export default function SimpleMenu() {

    
    return (

    <div id="parent">

        <div class="child">
            <Link to='/clinic' >clinic</Link>
        </div>
        <div class="child">
            <Link to='/check' >self check</Link>
        </div>

        
    </div>
    

  )
}   
