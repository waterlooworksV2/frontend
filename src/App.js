import React, { Component } from 'react';
import * as React from 'react';
import { match } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation'
import Card from './components/Card'
import FullJob from './components/FullJob'

import Home from './pages/Home'

export default class App extends React.Component {
  render() {
    const { url } = this.props.match;
    return (
      <div>
        <div className="app">
          <Navigation />
        </div>
        <div className="app-content">
          <Route exact strict path="/home" component={Home} />
        </div>
      </div>
    );
  }
}
