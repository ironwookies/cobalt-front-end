import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import axios from 'axios';
// import ProtectedRoute from './components/auth/protectedRoute';

import Home from './components/home/Home';
import ChatRooms from './components/chatGroups';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Navbar from './components/navbar/Navbar';
// import Dashboard from './components/dashboard/Dashboard';

import './App.css';
import AuthService from './components/auth/auth-service';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
		};
		this.service = new AuthService();
	}

	fetchUser = async () => {
		if (this.state.user === null) {
			return this.service
				.loggedin()
				.then((response) => {
					this.setState({ user: response });
				})
				.catch((err) => {
					this.setState({ user: false });
				});
		}
	};

	getUser = (userInfo) => {
		this.setState({
			user: userInfo,
		});
	};

	componentDidMount() {
		this.fetchUser();
	}

	render() {
		return (
			<div>
				<Navbar user={this.state.user} />
				<Switch>
					<Route exact path="/" render={() => <Home />} />
					<Route
						path="/chat"
						render={() => {
							this.fetchUser().then(() => {});
							if (this.state.user) {
								return <ChatRooms user={this.state.user} />;
							} else {
								return (
									<Redirect
										push
										to={{
											pathname: '/login',
											// state: { from: this.props.location },
										}}
									/>
								);
							}
						}}
					/>
					<Route
						exact
						path="/login"
						render={(props) => <Login {...props} getUser={this.getUser} />}
					/>
					<Route
						exact
						path="/signup"
						render={(props) => <Signup {...props} getUser={this.getUser} />}
					/>
					<Route
						exact
						path="/dashboard"
						render={(props) => <ChatRooms {...props} />}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
