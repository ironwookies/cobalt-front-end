import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';

import './App.css';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
          <Switch>
            <Route exact path='/' render={()=>
              <Home />
            }/>
          </Switch>
      </div>
    )
  }
}

