import React from 'react'
import { NavLink } from 'react-router-dom';
import './navbar.css';

export default function () {
    return (
        <div className="container">
            <div className="wrapper">
                <div className="logo">
                    <img src="/imgs/logo.png" alt=""/>
                    <h1 className="cobalt">Cobalt</h1>
                </div>
                <div className="links">
                    <ul>
                        <li>
                            <NavLink className='link' exact to={'/login'}>Log In</NavLink>
                        </li>
                        <li>
                            <NavLink className='link' exact to={'/signup'}>Sign Up</NavLink>
                        </li>
                    </ul>
                </div>
            </div> 
        </div>
    )
}
