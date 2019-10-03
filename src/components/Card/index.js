/*global $*/

import * as React from 'react';
import './Card.css';

import ListDropDown from '../ListDropDown/index.js'

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

  dontBubbleUpClick(e){
    e.persist();
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
  }

  componentDidMount(){
    if(this.props.render !== false) {
        this.getJob(this.props.id).then(data => {
            this.setState({
            job: data,
            blur: '',
            hue: this.huegenerator()
            });
        });
    }
    // console.log('.dropdown'+this.props.id)
    // $('.dropdown-trigger').dropdown({ alignment: 'right'});
  }

  render() {

    return (
      <div href={'#'+this.props.id} className="jobCard" onClick={() => this.props.onClickCard(this.props.id)}>
        <div className="card" style= { {"borderTopColor": this.state.hue ,"borderTop": "4px solid", "WebkitUserSelect": "none", "MozUserSelect": "none", "msUserSelect": "none", "userSelect": "none"} }>
          <div className="box-shadow">
            <div className="project-box flow-text">
              <p className={`primary ${this.state.blur}`}>{this.state.job["Job Title:"]}, {this.state.job["Organization:"]}</p>
              <p className={`secondary ${this.state.blur}`}>{this.state.job["count"]} - {this.state.job["Job Summary:"]}</p>
            </div>
            <div className="list-button">
              <a onClick={this.dontBubbleUpClick} data-target={'dropdown' + this.props.id} class={"btn-floating waves-effect waves-light dropdown-trigger" + this.props.id} style={{"backgroundColor": this.state.hue}}>
                <i className="material-icons">add</i>
              </a>
            </div>
            <ListDropDown class={this.props.id} trigger={".dropdown-trigger" + this.props.id} hue={this.state.hue} jobId={this.props.id}/>
          </div>
        </div>
      </div>
    );
  }
}
