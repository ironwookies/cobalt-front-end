import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Chat from './components/chat/Chat';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';

import './App.css';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" render={() => <Home />} />
					<Route exact path="/chat" render={() => <Chat />} />
            <Route exact path='/login' render={()=>
              <Login />
            }/>
            <Route exact path='/signup' render={()=>
              <Signup />
            }/>
          </Switch>
      </div>
    )
  }
}
