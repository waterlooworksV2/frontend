/*global $*/
import React, { Component } from 'react';
import querystring from 'querystring';
import './Home.css';

import Navigation from '../../components/Navigation'
import Card from '../../components/Card'
import Filter from '../../components/Filter'
import FullJob from '../../components/FullJob'
import Pagination from '../../components/Pagination'

import JobService from '../../services/JobService.js'

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: 66344,
      ids: [],
      query: '',
      pageNo: 1,
      total: 1,
      render: false
    }
  }

  onClickCard(id){
    this.setState({id: id});
  }

  onClickPage(pageNo){
    this.setState({pageNo: pageNo});
    this.props.history.push(this.props.location.pathname + '?page=' + pageNo);
    this.getJobIDs(pageNo-1);
    window.scrollTo(0, 0);
  }

  getFilters() {
      JobService.filters('city').then(data => {
          this.setState({
              cities: data
          });
      });
      JobService.filters('country').then(data => {
          this.setState({
              countries: data,
              render:true
          });
      });
  }

  getJobIDs(pageNo) {
    JobService.getJobIDs({q:this.state.query, page: pageNo})
        .then(data => {
          this.setState({
              ids: data["ids"], id: data["ids"][0],
              total: data["pages"]
          });
        });
  }



  componentWillMount() {
    this.setState({pageNo: Number(querystring.parse(this.props.location.search.substring(1)).page)});
    this.getJobIDs(Number(querystring.parse(this.props.location.search.substring(1)).page)-1);
    this.getFilters();
  }

  render() {
    return (
      <div className="home">
        <div className="row">
          <div id="jobContainer" className="col l5 m5 s12">
            <Filter cities={this.state.cities} countries={this.state.countries} render={this.state.render}/>
            {this.state.ids.map((id, i) => <Card key={id} id={id} onClickCard={this.onClickCard.bind(this)}/>)}
            <Pagination currentPage={this.state.pageNo} totalPages={this.state.total} onClickPage={this.onClickPage.bind(this)}/>
          </div>
          <div className="col l7 m7 offset-l5 offset-m5">
            <FullJob width={window.innerWidth} id={this.state.id}/>
          </div>
        </div>
      </div>
    );
  }
}
