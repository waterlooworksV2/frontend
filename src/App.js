import React, { Component } from 'react';
import { match } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navigation />
      </div>
    );
  }
}

export default App;
