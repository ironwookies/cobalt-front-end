import React from 'react';

export default function Login(props) {
    return (
        <div className="login-container">
            <div className="login-wrapper">
                <form onSubmit={props.logIn}>
                    <label>Email:</label>
                    <input type="email" name="email" onChange={props.email} />
                    <label>Password</label>
                    <input type="password" name="password" onChange={props.password} />
                    <button>Log In</button>
                </form>
            </div>
        </div>
    )
}
