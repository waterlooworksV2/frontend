import React, { Component } from 'react';
import querystring from 'querystring';
import './Search.css';

import Navigation from '../../components/Navigation'
import Card from '../../components/Card'
import FullJob from '../../components/FullJob'
import Pagination from '../../components/Pagination'
import SearchBar from '../../components/SearchBar'

import JobService from '../../services/JobService.js'

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      query: '',
      pageNo: 1,
      render: false
    }
  }

  onClickCard(id){
    this.setState({id: id});
  }

  onClickSearchPage(pageNo){
    this.setState({pageNo: pageNo});
    this.props.history.push(this.props.location.pathname + '?page=' + pageNo + '&query=' + this.state.query);
    this.getJobIDs(pageNo-1);
  }

  getJobIDs(pageNo) {
    JobService.getJobIDs({q:this.state.query, page: pageNo}).then(data => {this.setState({ids: data, id: data[0]});});
  }

  onSearch(query) {
    this.setState({query: query});
    this.props.history.push(this.props.location.pathname + '?page=' + this.state.pageNo + '&q=' + query);
    this.getJobIDs(this.state.pageNo);
    this.setState({render: true})
  }

  componentWillMount() {
    if(Number(querystring.parse(this.props.location.search.substring(1)).page)) {
      this.setState({pageNo: Number(querystring.parse(this.props.location.search.substring(1)).page)});
    }
  }

  render() {
    return (
      <div className="home">
        <div className="row">
          <SearchBar currentPage={this.state.pageNo} onSearch={this.onSearch.bind(this)}/>
          <div id="jobContainer" className="col l5 m5 s12">
            {this.state.ids.map((id, i) => <Card render={this.state.render} key={id} id={id} onClickCard={this.onClickCard.bind(this)}/>)}
            <Pagination currentPage={this.state.pageNo} onClickPage={this.onClickSearchPage.bind(this)}/>
          </div>
          <div className="col l7 m7 offset-l5 offset-m5">
            <FullJob id={this.state.id} render={this.state.render}/>
          </div>
        </div>
      </div>
    );
  }
}
