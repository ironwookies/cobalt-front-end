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

	// componentWillReceiveProps(nextProps) {
	// 	this.setState({ ...this.state, user: nextProps['user'] });
	// }

	logoutUser = () => {
		this.service.logout().then(() => {
			this.setState({ user: null });
			this.props.getUser(null);
			localStorage.removeItem('jwt');
		});
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
									<NavLink className="link" exact to={'/login'}>
										Logout
									</NavLink>
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
									<div className='nav-button-gradient'>
										<button>
											<NavLink className="link" exact to={'/login'}>
												Log In
											</NavLink>
										</button>
									</div>
								</li>
								<li>
								<div className='nav-button-gradient'>
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
