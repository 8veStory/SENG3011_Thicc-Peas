import { Link } from 'react-router-dom';
import React from 'react';

import './SideMenuContent.css';

export default function SideMenuContent() {
    return (
        <div id="parent">
            <div class="child">
                <Link to='/clinic'>clinic</Link>
            </div>
            <div class="child">
                <Link to='/check'>self check</Link>
            </div>
        </div>
    )
}
