/*global $*/

import * as React from 'react';
import './Card.css';

import JobService from '../../services/JobService.js'

import { Redirect, NavLink } from 'react-router-dom';

export default class Card extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      blur:'blur',
      job: {
        "Job Title:": "Data Analyst",
        "Organization:": "ContextLogic",
        "_id": "65123",
        "Job Summary:": "On the Data team at Wish, we are using data to build one of the fastest growing and largest eCommerce startups today, with over 300 million users. We're doing this from the ground up, and building our own merchant platform, logistics network, customer service software, content and risk management tools. We're a small team and move quickly."
      }
    }
  }

  getJob(id) {
    return JobService.getPreviewJobID(id)
  }

  componentDidMount(){
      $('.card').each(function () {
          var hue = 'rgb(' + (Math.floor((205)*Math.random())+50) + ',' + (Math.floor((205)*Math.random())+50) + ',' + (Math.floor((205)*Math.random())+50) + ')';
          $(this).css("border-top-color", hue);
      });

      this.getJob(this.props.id).then(data => {
        this.setState({ job: data });
        this.setState({ blur: '' });
      });
  }

  render() {
    // <!--<div class="hover-up card" style= { {"border-top: 4px solid;-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-color: #696969 !important;"}}>-->
    return (<a href="#modal1" className="jobCard">
            <div className="hover-up card" style= { {"borderTop": "4px solid", "WebkitUserSelect": "none", "MozUserSelect": "none", "msUserSelect": "none", "userSelect": "none"} }>
              <div className="box-shadow">
                <div className="project-box">
                  <p className={`primary ${this.state.blur}`}>{this.state.job["Job Title:"]}, {this.state.job["Organization:"]}</p>
                  <p className={`secondary ${this.state.blur}`}>{this.state.job["Job Summary:"]}</p>
                </div>
              </div>
            </div>
        </a>
    );
  }
}
