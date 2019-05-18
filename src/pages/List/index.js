/*global M
global $*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
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
    this.setState({pageNo: pageNo});
    this.props.history.push(this.props.location.pathname + '?page=' + pageNo);
    this.getList(this.state.listNo, pageNo);
    window.scrollTo(0, 0);
  }

  getList(listNo, pageNo) {
    JobService.getList(listNo, {page: pageNo}).then(data => {
      if(data["ids"].length !== 0){
        this.setState({ids: data["ids"], id: data["ids"][0], total: data["pages"], render: true, title: data["listName"]});
      }
      else {
        M.toast({html: '<span>No results found</span>' , classes: 'rounded', displayLength: 10000})
        this.setState({ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], id: 1, render: false});
      }
    });
  }

  componentWillMount() {
    if(String(querystring.parse(this.props.location.search.substring(1)).q)) {
      this.setState({listNo: Number(querystring.parse(this.props.location.search.substring(1)).q)});
    }
    if(this.props.match.params.listNo){
      this.setState({listNo:this.props.match.params.listNo})
    }
  }

  componentDidMount(){
    console.log(this.props, querystring.parse(this.props.location.search.substring(1)).q);
    if(Number(querystring.parse(this.props.location.search.substring(1)).q) >= 0) {
      this.setState({listNo: Number(querystring.parse(this.props.location.search.substring(1)).q)});
      console.log(this.props.location.pathname +"/" + String(querystring.parse(this.props.location.search.substring(1)).q) + '?page=' + this.state.pageNo)
      this.props.history.push(this.props.location.pathname +"/" + String(querystring.parse(this.props.location.search.substring(1)).q) + '?page=' + this.state.pageNo);
    }
    this.getList(this.state.listNo, this.state.pageNo);
  }

  render() {
    return (
      <div className="home">
        <div className="row">
        <div id="leftColumn" className="col l5 m5 s12">
          <div id="titleContainer">
            <p
                style={{"color":"rgb(153, 153, 153)",
                        "fontFamily": "productSans, sans-serif",
                        "fontSize": "30px",
                        "paddingBottom":"20px",
                        "marginBottom":"5%",
                      }}>
                {this.state.title}
            </p>
          </div>
          </div>
          <div id="jobContainer" className="col l5 m5 s12" style={{"paddingTop":"50px"}}>
            {this.state.ids.map((id, i) => <Card render={this.state.render} key={id} id={id} onClickCard={this.onClickCard.bind(this)}/>)}
            <Pagination render={this.state.render} currentPage={this.state.pageNo} totalPages={this.state.total} onClickPage={this.onClickListPage.bind(this)}/>
          </div>
          <div id="rightColumn" className="col l7 m7">
            <FullJob width={window.innerWidth} id={this.state.id} render={this.state.render}/>
          </div>
        </div>
      </div>
    );
  }
}
