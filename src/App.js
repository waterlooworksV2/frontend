import * as React from 'react';
import { Route, Redirect } from 'react-router';
import './App.css';

import Navigation from './components/Navigation'
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
          <Route exact strict path="/profile" component={Home} />
        </div>
      </div>
    );
  }
}
