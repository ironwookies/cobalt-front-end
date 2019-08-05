import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthService from './../auth/auth-service';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
		this.service = new AuthService();
	}

	handleChange(e) {
		e.preventDefault();
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleFormSubmit = (e) => {
		e.preventDefault();
		this.service
			.login(this.state.email, this.state.password)
			.then((response) => {
				this.setState({ email: '', password: '' });
				this.props.getUser(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	componentWillMount = async () => {
		if (await this.service.loggedin()) {
			this.props.history.replace('/');
		}
	};

	render() {
		return (
			<div className="login-container">
				<div className="login-wrapper">
					<form onSubmit={this.handleFormSubmit}>
						<label>Email:</label>
						<input
							type="email"
							name="email"
							value={this.state.email}
							onChange={(e) => {
								this.handleChange(e);
							}}
						/>
						<label>Password</label>
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={(e) => {
								this.handleChange(e);
							}}
						/>
						<button>Log In</button>
					</form>
					<p>
						Don't have account?
						<Link to={'/signup'}> Signup</Link>
					</p>
				</div>
			</div>
		);
	}
}
