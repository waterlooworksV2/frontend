import * as React from 'react';
import { Route, Redirect } from 'react-router';
import './App.css';

import Navigation from './components/Navigation'
import Home from './pages/Home'
import Search from './pages/Search'
import List from './pages/List'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className="app">
          <Navigation />
        </div>
        <div className="app-content">
          <Route exact strict path="/home" component={Home} />
          <Route exact strict path="/profile" component={Home} />
          <Route exact strict path="/search" component={Search} />
          <Route exact strict path="/list/:listNo" component={List} />
          <Route exact strict path="/list" component={List} />
          <Route exact path="/" render={() => <Redirect to="/home"/>}/>
        </div>
      </div>
    );
  }
}
