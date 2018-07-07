import React, { Component } from 'react';
// import { match } from 'react-router-dom';
import './Home.css';

import Navigation from '../../components/Navigation'
import Card from '../../components/Card'
import FullJob from '../../components/FullJob'
import Pagination from '../../components/Pagination'

import JobService from '../../services/JobService.js'

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: 66344,
      ids: []
    }
  }

  onClickCard(id){
    this.setState({id: id});
  }

  getJobIDs() {
    JobService.getJobIDs().then(data => {this.setState({ids: data, id: data[0]});});
  }

  componentDidMount() {
    this.getJobIDs();
  }

  render() {
    return (
      <div className="home">
        <div className="row">
          <div id="jobContainer" className="col l5 m5 s12">
            {this.state.ids.map((id, i) => <Card key={id} id={id} onClickCard={this.onClickCard.bind(this)}/>)}
            <Pagination />
          </div>
          <div className="col l7 m7 offset-l5 offset-m5">
            <FullJob id={this.state.id}/>
          </div>
        </div>
      </div>
    );
  }
}
