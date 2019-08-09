import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './login.css';

import AuthService from './../auth/auth-service';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			error: null,
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
				this.props.getUser(response.user);
				this.props.history.push('/chat');
			})
			.catch((error) => {
				this.setState({ error: error.response.data.message });
			});
	};

	componentWillMount = async () => {
		if (await this.service.loggedin()) {
			this.props.history.replace('/');
		}
	};

	renderError = () => {
		if (this.state.error) {
			return <div className="login-errorMessage">{this.state.error}</div>;
		} else {
			return <div className="login-errorMessage-area" />;
		}
	};

	render() {
		return (
			<div className="login-container">
				<form onSubmit={this.handleFormSubmit}>
					<div className="login-wrapper">
						<div>
							<h2>Log In</h2>
						</div>
						{this.renderError()}
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
						<div className="signup-button">
							<div className="button-gradient">
								<button>Log In</button>
							</div>
						</div>
						<div className="login-login-link">
							<p>
								Don't have an account?
								<Link className="login-login-link-link" to={'/signup'}>
									Signup
								</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
