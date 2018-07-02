import React, { Component } from 'react';
import { match } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation'
import Card from './components/Card'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navigation />
        <div className="row">
          <div className="col l5 m5 s12">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <div className="col l7 m7">
            <Card />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
