import React, { Component } from 'react';
import AuthService from './../auth/auth-service';
import { Link } from 'react-router-dom';
import './signup.css';	

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			firstName: '',
			familyName: '',
		};
		this.service = new AuthService();
	}

	handleFormSubmit = (e) => {
		e.preventDefault();
		if (this.state.password === this.state.confirmPassword) {
			this.service
				.signup(this.state.username, this.state.password)
				.then((response) => {
					this.setState({
						email: '',
						password: '',
					});
					this.props.getUser(response);
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			console.log('passwords do not match');
		}
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<div className="signup-container">
				<form onSubmit={this.handleFormSubmit}>
					<div className="form-wrapper">
						<div>
							<h2>Create Account</h2>
						</div>
						<label>Name:</label>
						<input
							type="text"
							name="firstName"
							value={this.state.firstName}
							onChange={(e) => {
								this.handleChange(e);
							}}
							required
							placeholder='Enter your name'
						/>
						<label>Last Name:</label>
						<input
							type="text"
							name="familyName"
							value={this.state.familyName}
							onChange={(e) => {
								this.handleChange(e);
							}}
							required
							placeholder='Enter your last name'
						/>
						<label>Email:</label>
						<input
							type="email"
							name="email"
							value={this.state.email}
							onChange={(e) => {
								this.handleChange(e);
							}}
							required
							placeholder='Enter your email'
						/>
						<label>Password:</label>
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={(e) => {
								this.handleChange(e);
							}}
							required
							placeholder='Enter a new password'
						/>
						<label>Confirm Password:</label>
						<input
							type="password"
							name="confirmPassword"
							value={this.state.confirmPassword}
							onChange={(e) => {
								this.handleChange(e);
							}}
							required
							placeholder='Confirm your new password'
						/>
						<div className='signup-button'>
							<div className='button-gradient'>
								<button>Create</button>
							</div>
						</div>
						<div className="signup-login-link">
							<p>
								Already have account?
								<Link className='signup-login-link-link' to={'/'}> Login</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default Signup;
