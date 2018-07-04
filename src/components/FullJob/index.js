/*global $*/

import * as React from 'react';
import './FullJob.css';

import { Redirect, NavLink } from 'react-router-dom';

export default class FullJob extends React.Component {

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
      this.setState({ blur: '' });
      // setTimeout(
      //   () => {
      //     if(this.state.blur !== ''){
      //       this.setState({ blur: '' });
      //     }
      //     else{
      //       this.setState({ blur: 'blur' });
      //     }
      //   },
      //   Math.random() * (10000 - 5000) + 5000
      // );
  }

  componentDidUpdate(prevProps, prevState){

  }

  render() {
    // <!--<div class="hover-up card" style= { {"border-top: 4px solid;-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-color: #696969 !important;"}}>-->
    return (
      <div className="job" style={{"paddingTop":"3%", "marginLeft":"1%"}}>
        <div>
            <div className="card">
                <div className={`card-content box-shadow ${this.state.blur}`}  id="jobdeets" style={{"scrollBehavior": "smooth", "borderTop": "4px solid rgb(199, 196, 253)", "paddingTop": "2%", "paddingRight": "2%", "color": "#999", "position": "fixed", "overflowY": "scroll", "maxHeight": "80%", "marginRight":"2%"}}>
                    <div className="card-title">
                        <p style={{"fontSize":"18px", "fontWeight":"400"}}>Job Title, Organisation</p>
                    </div>
                    <p className="secondary">
                      <span className={`primary ${this.state.blur}`}>Location: </span>Job - City:, Job - Province / State: <br /><br />
                      <span className={`primary ${this.state.blur}`}>Number of Job Openings: </span>Number of Job Openings:<br /><br />
                      <span className={`primary ${this.state.blur}`} id="respo">Responsibilities:</span>
                      Job Responsibilities:replace(/\n/g, '<br/>'): ''
                      Develop low-level embedded C++ firmware for the laser scanner, working directly with robotic systems including single board computers, microcontrollers, cameras, and lasers
                      Develop C++ software for image analysis and processing, along with high-speed data transfer to customer systems
                      Develop C++ software for the graphical interface that allows our customers to monitor and manage the laser scanner
                      Prepare design documents and test plans for the features you are developing and review them with Product Management
                      Participate actively in the Agile development process: planning, design reviews, code reviews, and unit testing
                      <br /><br /><span className={`primary ${this.state.blur}`} id="req">Requirements: </span>
                      RequiredSkills Required Skills: Required Skills:
                      <br /><br /><span className={`primary ${this.state.blur}`} id="desc">Description: </span>
                      Job Summary:replace(/\n/g, '<br/>'): '';
                      Are you passionate about using C++ to develop solutions to challenging problems? Are you eager to learn and develop new technologies, push the boundaries of what is possible, and help make a difference to society and the environment?
                      2G Robotics is looking for someone who thrives in a start-up research and development environment, where innovation, initiative, flexibility and results are valued. If this sounds like you, we want to hear from you!

                      The Position
                      As a Software Developer Intern, you will help create the software for our industry-leading ULS line of underwater laser scanners. Working with a small but growing software team, you will contribute to the full software stack, from low-level embedded firmware to the graphical interface that allows our customers to monitor and manage the system.
                      </p>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
