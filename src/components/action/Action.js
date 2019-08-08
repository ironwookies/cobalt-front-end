import React from 'react';
import './action.css';
import { NavLink } from 'react-router-dom';

export default function Action() {
    return (
        <div className='action-section'>
            <div className="action-wrapper">
                <div className="action-text">
                    <h1>Sign up today and start collaborating</h1>
                    {/* <hr/> */}
                </div>
                <NavLink className='get-started' exact to={'/signup'}>Get Started</NavLink>
            </div>
        </div>
    )
}
