import React, { Component } from 'react';
// import { match } from 'react-router-dom';
import './Home.css';

import Navigation from '../../components/Navigation'
import Card from '../../components/Card'
import FullJob from '../../components/FullJob'

export default class Home extends Component {
  

  render() {
    return (
      <div className="home">
        <div className="row">
          <div id="jobContainer" className="col l5 m5 s12">
            <Card id="66344"/>
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <div className="col l7 m7 offset-l5 offset-m5">
            <FullJob id="66344"/>
          </div>
        </div>
      </div>
    );
  }
}
