/*global $*/

import * as React from 'react';
import './Card.css';

import { Redirect, NavLink } from 'react-router-dom';

export default class Card extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      blur:'blur'
    }
  }

  componentDidMount(){
      $('.card').each(function () {
          var hue = 'rgb(' + (Math.floor((205)*Math.random())+50) + ',' + (Math.floor((205)*Math.random())+50) + ',' + (Math.floor((205)*Math.random())+50) + ')';
          $(this).css("border-top-color", hue);
      });

      setTimeout(
        () => {
          if(this.state.blur !== ''){
            this.setState({ blur: '' });
          }
          else{
            this.setState({ blur: 'blur' });
          }
        },
        Math.random() * (10000 - 5000) + 5000
      );
  }

  componentDidUpdate(prevProps, prevState){

  }

  render() {
    // <!--<div class="hover-up card" style= { {"border-top: 4px solid;-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-color: #696969 !important;"}}>-->
    return (<a href="#modal1" id="<%=job['id']%>">
            <div className="hover-up card" style= { {"borderTop": "4px solid", "WebkitUserSelect": "none", "MozUserSelect": "none", "msUserSelect": "none", "userSelect": "none"} }>
              <div className="box-shadow">
                <div className="project-box">
                  <p><span className={`primary ${this.state.blur}`}>Software Developer, 2G Robotics Inc</span>
                  <br /><span className={`secondary ${this.state.blur}`}>Are you passionate about using C++ to develop solutions to challenging problems? Are you eager to learn and develop new technologies, push the boundaries of what is possible, and help make a difference to society and the environment? 2G Robotics is looking for someone who thrives in a start-up research and development environment, where innovation, initiative, flexibility and results are valued...</span></p>
                </div>
              </div>
            </div>
        </a>
    );
  }
}
