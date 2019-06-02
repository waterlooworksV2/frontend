/*global M
global $*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import querystring from 'querystring';
import './List.css';

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
      render: false,
      listName: ''
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
    console.log(pageNo)
    this.setState({pageNo: pageNo});
    this.props.history.push(this.props.location.pathname + '?page=' + pageNo);
    this.getList(this.state.listNo, pageNo);
    window.scrollTo(0, 0);
  }

  getList(listNo, pageNo) {
    let current_id = Number(this.props.location.hash.substring(1, ));
    JobService.getList(listNo, {page: pageNo}).then(data => {
      if(data["ids"].length !== 0){
        this.setState({
          ids: data["ids"],
          id: current_id? current_id: data["ids"][0],
          total: data["pages"],
          render: true, title:
          data["listName"]
        });
      }
      else {
        M.toast({html: '<span>No results found</span>' , classes: 'rounded', displayLength: 10000})
        this.setState({ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], id: 1, render: false});
      }
    });
  }

  componentWillMount() {
    if(Number(querystring.parse(this.props.location.search.substring(1)).page) >= 0) {
      console.log(querystring.parse(this.props.location.search.substring(1)).pageNo)
      this.setState({pageNo: Number(querystring.parse(this.props.location.search.substring(1)).page)});
    }
    if(this.props.match.params.listNo){
      this.setState({listNo:this.props.match.params.listNo})
    }
  }

  componentDidMount(){
    if(String(querystring.parse(this.props.location.search.substring(1)).q) !== 'undefined') {
      this.setState({listNo: Number(querystring.parse(this.props.location.search.substring(1)).q)});
      this.props.history.push(this.props.location.pathname +"/" + String(querystring.parse(this.props.location.search.substring(1)).q) + '?page=' + this.state.pageNo);
    }
    if(Number(querystring.parse(this.props.location.search.substring(1)).page) >= 0) {
      this.setState({pageNo: Number(querystring.parse(this.props.location.search.substring(1)).page)});
    }
    this.getList(this.state.listNo, this.state.pageNo);
  }

  render() {
    return (
      <div className="home">
        <div className="row">
        <div id="leftColumn" className="col l5 m5 s12">
          <div id="titleContainer" style={{"color":"rgb(153, 153, 153)",
                  "fontFamily": "productSans, sans-serif",
                  "fontSize": "30px",
                  "paddingLeft":"5%"
                }}>
          {this.state.title}
          </div>
          <div id="jobContainer" className="col l5 m5 s12">
            {this.state.ids.map((id, i) => <Card render={this.state.render} key={id} id={id} onClickCard={this.onClickCard.bind(this)}/>)}
            <Pagination
              pre={"list"}
              render={this.state.render}
              currentPage={this.state.pageNo}
              totalPages={this.state.total}
              onClickPage={this.onClickListPage.bind(this)}/>
          </div>
          </div>
          <div id="rightColumn" className="col l7 m7">
            <FullJob width={window.innerWidth} id={this.state.id} render={this.state.render}/>
          </div>
        </div>
      </div>
    );
  }
}
