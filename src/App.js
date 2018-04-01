import React, { Component } from 'react';
import './App.css';
import Home from './home';
import AfterRoute from './afterRoute';
import { Route, Switch } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/after' component={AfterRoute}/>
      </Switch>
    );
  }
}
