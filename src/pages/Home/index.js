import React, { Component } from 'react';
// import { match } from 'react-router-dom';
import './Home.css';

import Navigation from '../../components/Navigation'
import Card from '../../components/Card'
import FullJob from '../../components/FullJob'

export default class Home extends Component {
  render() {
    // <div className="app-content">
    //   <Route path={`${url}/products/:itemNumber`} exact={true} component={Product} />
    //   {AuthService.is('krg') ?
    //     <Route path={`${url}/my-list`} exact={true} component={MyList} /> : null}
    //   <Route path={`${url}/priority-list`} exact={true} component={PriorityList} />
    //   <Route path={`${url}/unpublished-notes`} exact={true} component={UnpublishedNotes} />
    //   {AuthService.is('admin') ?
    //     <Route path={`${url}/statistics`} exact={true} component={Statistics} /> : null}
    //   <Route path={`${url}/profile/:userId`} exact={true} component={Profile} />
    //   {AuthService.is('admin') ?
    //     <Route path={`${url}/krg-members`} exact={true} component={KrgMembers} /> : null}
    // </div>
    // const { url } = this.props.match;
    console.log("here");
    return (
      <div className="home">
        <div className="row">
          <div id="jobContainer" className="col l5 m5 s12">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <div className="col l7 m7 offset-l5 offset-m5">
            <FullJob />
          </div>
        </div>
      </div>
    );
  }
}
