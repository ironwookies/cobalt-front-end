import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Home from './components/home/Home';
import ChatRooms from './components/chatGroups';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';

import giphyAPIkey from './components/giphy/giphyApyKey';

import './App.css';
import AuthService from './components/auth/auth-service';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			ready: false,
			key: giphyAPIkey().key,
			giffs: [],
		};
		this.service = new AuthService();
	}

	componentDidMount() {
		this.getTrendingGiphy();
		this.fetchUser();
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
	getSearchedGiphy(e) {
		let search = e.target.value;

		if (search === '') {
			this.getTrendingGiphy();
			return;
		}

		axios
			.get(
				'https://api.giphy.com/v1/gifs/search?q=' +
					search +
					'&api_key=' +
					this.state.key +
					'&limit=10',
			)
			.then((res) => {
				return this.setState({ giffs: this.createGiffs(res.data.data) });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	getTrendingGiphy() {
		axios
			.get(
				'https://api.giphy.com/v1/gifs/trending?&api_key=' +
					this.state.key +
					'&limit=10',
			)
			.then((res) => {
				return this.setState({ giffs: this.createGiffs(res.data.data) });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	createGiffs(giffs) {
		return giffs.map((giff, i) => {
			return (
				<div className="giff-container" key={i}>
					<img src={giff.images.fixed_width.url} alt="" />
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				<Switch>
					<Route
						exact
						path="/"
						render={(props) => <Home {...props} user={this.state.user} />}
					/>
					<Route
						path="/chat"
						render={(props) => {
							this.fetchUser().then(() => {});
							if (this.state.user) {
								return <ChatRooms {...props} user={this.state.user} />;
							} else {
								return (
									<Redirect
										push
										to={{
											pathname: '/login',
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
