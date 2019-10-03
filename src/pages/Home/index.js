/*global $*/
import React, { Component } from 'react';
import querystring from 'querystring';
import './Home.css';

import Card from '../../components/Card'
import Filter from '../../components/Filter'
import FullJob from '../../components/FullJob'
import Pagination from '../../components/Pagination'

import JobService from '../../services/JobService.js'

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: 0,
      ids: [],
      query: '',
      pageNo: 1,
      total: 1,
      render: false,
      cities: [],
      countries: [],
      selectedCountries: [],
      selectedCities: [],
      prevScrollpos: 0,
      visibleFilter: ''
    }
  }

  onClickCard(id){
    this.setState({id: id});
    if(window.innerWidth < 600) {
      $('.modal').modal();
      $('#job').modal('open');
    }
  }

  onClickButton(id){
    console.log(id)
  }


  onClickPage(pageNo){
    this.setState({pageNo: pageNo});
    this.props.history.push(this.props.location.pathname + '?page=' + pageNo);
    this.getJobIDs(pageNo-1);
    window.scrollTo(0, 0);
  }


  getFilters(){
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
          return
      })
      // .then(data => {
      //     let city, country;
      //     let selectedCities = [];
      //     for(city of this.state.cities){
      //         selectedCities.push(city["_id"]);
      //     };
      //     let selectedCountries = [];
      //     for(country of this.state.countries){
      //         selectedCountries.push(country["_id"]);
      //     };
      //     this.setState({
      //         selectedCountries: selectedCountries,
      //         selectedCities: selectedCities
      //     });
      //     // console.log(this.state)
      // });

  }

  componentDidMount(){
    document.getElementById("jobContainer").addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount(){
    document.getElementById("jobContainer").removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const prevScrollpos = this.state.prevScrollpos;

    const currentScrollPos = $('#jobContainer').scrollTop();
    let visible='';
    if(prevScrollpos > currentScrollPos){
      visible = '';
    } else{
      visible = '';
    }

    this.setState({
      prevScrollpos: currentScrollPos,
      visibleFilter: visible
    });
  };

  getJobIDs(pageNo){
    console.log(this.props)
    let current_id = Number(this.props.location.hash.substring(1, ));
    JobService.getJobIDs({q:this.state.query, page: pageNo})
        .then(data => {
          this.setState({
              ids: data["ids"],
              id: current_id? current_id: data["ids"][0],
              total: data["pages"]
          });
        });
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(this.props, nextProps, nextState, this.state)
  //   if(nextProps !== this.props){
  //     return true;
  //   }
  //   for(var index in nextState) {
  //     console.log(index, this.state[index], nextState[index])
  //     if(this.state[index] !== nextState[index] && index !== 'pageNo'){
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  componentWillMount() {
    this.setState({pageNo: Number(querystring.parse(this.props.location.search.substring(1)).page)});
    this.getJobIDs(Number(querystring.parse(this.props.location.search.substring(1)).page)-1);
    this.getFilters();
  }

  render() {
    return (
      <div className="home">
        <div className="row">
          <div id="leftColumn" className="col l5 m5 s12">
            <div id="filterContainer">

            </div>
            <div id="jobContainer" className="col l5 m5 s12">
              {this.state.ids.map((id, i) => <Card key={id} id={id} onClickCard={this.onClickCard.bind(this)} onClickButton={this.onClickButton.bind(this)}/>)}
              <Pagination prefix="bot" currentPage={this.state.pageNo} totalPages={this.state.total} onClickPage={this.onClickPage.bind(this)}/>
            </div>
          </div>
          <div id="rightColumn" className="col l7 m7">
            <FullJob width={window.innerWidth} id={this.state.id}/>
          </div>
        </div>
      </div>
    );
  }
}
