import * as React from 'react';
import './App.css';

import Navigation from './components/Navigation'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className="app">
          <Navigation />
        </div>
        <div className="app-content">
          <h3 className='center' style={{'paddingTop': '20%'}}>WaterlooWorks2 is down for extended maintenance</h3>
        </div>
      </div>
    );
  }
}
