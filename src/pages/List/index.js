/*global M
global $*/

import React, { Component } from 'react';
import querystring from 'querystring';
import './Search.css';

import Navigation from '../../components/Navigation'
import Card from '../../components/Card'
import FullJob from '../../components/FullJob'
import Pagination from '../../components/Pagination'
import SearchBar from '../../components/SearchBar'

import JobService from '../../services/JobService.js'

export default class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      listNo: 0,
      pageNo: 1,
      total: 1,
      render: false
    }
  }

  onClickCard(id){
    this.setState({id: id});
    if(window.innerWidth < 600) {
      $('.modal').modal();
      $('#job').modal('open');
    }
  }

  onClickListPage(pageNo){
    this.setState({pageNo: pageNo});
    this.props.history.push(this.props.location.pathname + '?page=' + pageNo + '&q=' + this.state.listNo);
    this.getList(this.state.listNo, pageNo);
    window.scrollTo(0, 0);
  }

  getList(listNo, pageNo) {
    JobService.getList(listNo, {page: pageNo}).then(data => {
      if(data["ids"].length !== 0){
        this.setState({ids: data["ids"], id: data["ids"][0], total: data["pages"], render: true});
      }
      else {
        M.toast({html: '<span>No results found</span>' , classes: 'rounded', displayLength: 10000})
        this.setState({ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], id: 1, render: false});
      }
    });
  }

  componentWillMount() {
    if(Number(querystring.parse(this.props.location.search.substring(1)).page)) {
      this.setState({pageNo: Number(querystring.parse(this.props.location.search.substring(1)).page)});
    }
  }

  componentDidMount(){
    this.getList(this.state.listNo, this.state.pageNo);
  }

  render() {
    return (
      <div className="home">
        <div className="row">
          <div id="jobContainer" className="col l5 m5 s12">
            {this.state.ids.map((id, i) => <Card render={this.state.render} key={id} id={id} onClickCard={this.onClickCard.bind(this)}/>)}
            <Pagination render={this.state.render} currentPage={this.state.pageNo} totalPages={this.state.total} onClickPage={this.onClickListPage.bind(this)}/>
          </div>
          <div className="col l7 m7 offset-l5 offset-m5">
          <FullJob width={window.innerWidth} id={this.state.id} render={this.state.render}/>
          </div>
        </div>
      </div>
    );
  }
}
