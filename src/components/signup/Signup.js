import React, { Component } from 'react';
import AuthService from './../auth/auth-service';
import { Link } from 'react-router-dom';

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
			<div>
				<form onSubmit={this.handleFormSubmit}>
					<label>Name:</label>
					<input
						type="text"
						name="firstName"
						value={this.state.firstName}
						onChange={(e) => {
							this.handleChange(e);
						}}
						required
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
					/>
					<button>Sing up</button>
					<p>
						Already have account?
						<Link to={'/'}> Login</Link>
					</p>
				</form>
			</div>
		);
	}
}

export default Signup;

// import React from 'react';
// import AuthService from './';
// export default function Signup(props) {
// 	return (
// 		<div className="login-container">
// 			<div className="loging-wrapper">
// 				<form onSubmit={props.signUp}>
// 					<label>Name:</label>
// 					<input
// 						type="text"
// 						name="firstName"
// 						onChange={props.firstName}
// 						required
// 					/>
// 					<label>Last Name:</label>
// 					<input
// 						type="text"
// 						name="familyName"
// 						onChange={props.familyName}
// 						required
// 					/>
// 					<label>Email:</label>
// 					<input type="email" name="email" onChange={props.email} required />
// 					<label>Password:</label>
// 					<input
// 						type="password"
// 						name="password"
// 						onChange={props.password}
// 						required
// 					/>
// 					<label>Confirm Password:</label>
// 					<input
// 						type="password"
// 						name="confirmPassword"
// 						onChange={props.password}
// 						required
// 					/>
// 					<button>Sing up</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// }
