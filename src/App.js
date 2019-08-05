import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import ChatRooms from './components/chatGroups';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Dashboard from './components/dashboard/Dashboard';
import Giphy from './components/giphy/Giphy';
import axios from 'axios';
import giphyAPIkey from './components/giphy/giphyApyKey';

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
			key: giphyAPIkey().key,
			giffs: []
		};
	}

	componentDidMount(){
		this.getTrendingGiphy();
	}

	getSearchedGiphy(e){
		let search = e.target.value;

		if(search === ''){
			this.getTrendingGiphy();
			return;
		}

		axios.get("http://api.giphy.com/v1/gifs/search?q="+search+"&api_key="+this.state.key+"&limit=10")
			.then((res)=>{
				return this.setState({giffs: this.createGiffs(res.data.data)});
			})
			.catch((error)=>{
				console.log(error);
			});
	}

	getTrendingGiphy(){
		axios.get("http://api.giphy.com/v1/gifs/trending?&api_key="+this.state.key+"&limit=10")
			.then((res)=>{
				return this.setState({giffs: this.createGiffs(res.data.data)});
			})
			.catch((error)=>{
				console.log(error);
			});
	}

	createGiffs(giffs){
		return giffs.map((giff, i)=>{
			return (
				<div className='giff-container' key={i}>
					<img src={giff.images.fixed_width.url} alt=""/>
				</div>
			)
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
					<Route exact path="/giphy" render={() => 
						<Giphy 
							giffs={this.state.giffs}
							search={(e)=>{this.getSearchedGiphy(e)}}
						/>} 
					/>
				</Switch>
			</div>
		);
	}
}
