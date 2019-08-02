import React from 'react'

export default function Signup(props) {
    return (
        <div className='login-container'>
            <div className="loging-wrapper">
                <form onSubmit={props.signUp}>
                    <label>Name:</label>
                    <input type="text" name='firstName' onChange={props.firstName} required/>
                    <label>Last Name:</label>
                    <input type="text" name='familyName' onChange={props.familyName} required/>
                    <label>Email:</label>
                    <input type="email" name="email" onChange={props.email} required/>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={props.password} required/>
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" onChange={props.password} required/>
                    <button>Sing up</button>
                </form>
            </div>
        </div>
    )
}
