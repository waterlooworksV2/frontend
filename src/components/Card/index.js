/*global $*/

import * as React from 'react';
import './Card.css';

import JobService from '../../services/JobService.js'

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

  huegenerator = () => {
    return 'rgb(' + (Math.floor((205)*Math.random())+50) + ',' + (Math.floor((205)*Math.random())+50) + ',' + (Math.floor((205)*Math.random())+50) + ')';
  }

  componentDidMount(){
    let huegenerator = this.huegenerator;
    $('.card').each(function () {
        $(this).css("border-top-color", huegenerator());
    });
    if(this.props.render !== false) {
        this.getJob(this.props.id).then(data => {
            this.setState({ 
            job: data, 
            blur: '' 
            });
        });
    }
  }

  render() {
    return (
      <a href={'#'+this.props.id} className="jobCard" onClick={() => this.props.onClickCard(this.props.id)}>
        <div className="hover-up card" style= { {"borderTop": "4px solid", "WebkitUserSelect": "none", "MozUserSelect": "none", "msUserSelect": "none", "userSelect": "none"} }>
          <div className="box-shadow">
            <div className="project-box flow-text">
              <p className={`primary ${this.state.blur}`}>{this.state.job["Job Title:"]}, {this.state.job["Organization:"]}</p>
              <p className={`secondary ${this.state.blur}`}>{this.state.job["Job Summary:"]}</p>
            </div>
          </div>
        </div>
      </a>
    );
  }
}
