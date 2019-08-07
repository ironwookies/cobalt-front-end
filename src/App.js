import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import ChatRooms from './components/chatGroups';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Giphy from './components/giphy/Giphy';

import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';


import './App.css';
import AuthService from './components/auth/auth-service';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			ready: false,
			emojis: [],
		};
		this.service = new AuthService();
	}

	componentDidMount() {
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

	// createEmojis(){

	// 	console.log(emojis);

	// 	let emojisChar =  emojis.map((emoji, i)=>{
	// 		return <EmojiContainer key={i} emoji={emoji.char}/>
	// 	});

	// 	let pages = [];
	// 	let collectedEmojis = [];
	// 	let collections = [];

	// 	emojisChar.forEach((emoji, i)=>{
	// 		if(i % 137 === 0){
	// 			pages.push(<EmojiPage key={i} />)
	// 		}
	// 		if(i % 137 !== 0){
	// 			collectedEmojis.push(emoji);
	// 		}
	// 		if(collectedEmojis.length === 137){
	// 			collections.push([...collectedEmojis]);
	// 			collectedEmojis = [];
	// 		}
	// 	});

	// 	pages = pages.map((e, i)=>{
	// 		return (<EmojiPage key={i} emojis={collections[i]}/>);
	// 	});

	// 	this.setState({emojis: pages});
	// }

	render() {
		return (
			<div>
				
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
						path="/giphy"
						render={() => (
							<Giphy
								giffs={this.state.giffs}
								search={(e) => {
									this.getSearchedGiphy(e);
								}}
							/>
						)}
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
					<Route exact path="/emojis" render={() => <Picker />} />
				</Switch>
			</div>
		);
	}
}

export default App;
