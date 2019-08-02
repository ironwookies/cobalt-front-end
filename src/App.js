import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import ChatRooms from './components/chatGroups';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Dashboard from './components/dashboard/Dashboard';
import axios from 'axios';

import './App.css';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: {
				firstName: '',
				familyName: '',
				email: '',
				password: '',
				confirmPassword: ''
			},
			ready: false,
		};
	}

	getUserData(e){
		let attribute = e.target.name;
		let value = e.target.value;
		let userData = {...this.state.userData};

		userData[attribute] = value;

		this.setState({userData: userData});
	}

	signUp(e){
		e.preventDefault();
		console.log(this.state.userData);

		axios.post('http://192.168.125.9:3000/signup', this.state.userData)
		  .then(function (response) {
			console.log(response);

		  })
		  .catch(function (error) {
			console.log(error);
		  });

	}

	logIn(e){
		e.preventDefault();

		let userData = {
			email: this.state.userData.email,
			password: this.state.userData.password
		}

		axios.post('http://192.168.125.9:3000/login', userData)
			.then((response)=>{
				console.log(response);
			})
			.catch((error)=>{
				console.log(error);
			});
	}

	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" render={() => <Home />} />
					<Route path="/chat" render={() => <ChatRooms />} />
					<Route exact path="/login" render={(props) => 
						<Login 
							{...props}
							email={(e)=>{this.getUserData(e)}}
							password={(e)=>{this.getUserData(e)}}
							logIn={(e)=>{this.logIn(e)}}
						/>} 
					/>
					<Route exact path="/signup" render={() => 
						<Signup 
							firstName={(e)=>{this.getUserData(e)}}
							familyName={(e)=>{this.getUserData(e)}}
							email={(e)=>{this.getUserData(e)}}
							password={(e)=>{this.getUserData(e)}}
							signUp={(e)=>{this.signUp(e)}}
						/>} 
					/>
					<Route exact path="/dashboard" 
					/>
				</Switch>
			</div>
		);
	}
}
