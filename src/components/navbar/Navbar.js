import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from './../auth/auth-service';
import './navbar.css';

export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
		};
		this.service = new AuthService();
	}

	logoutUser = () => {
		this.service.logout();
		this.setState({ user: null });
	};

	render() {
		if (this.props.user) {
			return (
				<div className="container">
					<div className="wrapper">
						<div className="logo">
							<img src="/imgs/logo.png" alt="" />
							<h1 className="cobalt">Cobalt</h1>
						</div>
						<div className="links">
							<ul>
								<li>
									<NavLink className="link" exact to={'/chat'}>
										Chatrooms
									</NavLink>
								</li>
								<li>
									<button
										onClick={() => {
											this.logoutUser();
										}}>
										Logout
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="container">
					<div className="wrapper">
						<div className="logo">
							<img src="/imgs/logo.png" alt="" />
							<h1 className="cobalt">Cobalt</h1>
						</div>
						<div className="links">
							<ul>
								<li>
									<div className="nav-button-gradient">
										<button>
											<NavLink className="link" exact to={'/login'}>
												Log In
											</NavLink>
										</button>
									</div>
								</li>
								<li>
									<div className="nav-button-gradient">
										<button>
											<NavLink className="link" exact to={'/signup'}>
												Sign Up
											</NavLink>
										</button>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			);
		}
	}
}
