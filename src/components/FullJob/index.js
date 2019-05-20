/*global $*/
import * as React from 'react';
import './FullJob.css';

import JobService from '../../services/JobService.js'

export default class FullJob extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      blur:'blur',
      job: {
        "Additional Application Information:" : "***IMPORTANT*** PLEASE TAKE THE FOLLOWING STEPS TO COMPLETE YOUR APPLICATION TO THE DATA ANALYST INTERNSHIP ROLE:↵↵1. Submit your resume via this WaterlooWorks posting.↵2. Submit your resume on our careers page. Click here to access our application form for this role. If you apply to more than one Wish role, you must submit your application via each unique link associated with the specific job post.↵↵Only candidates that have followed steps 1 AND 2 for each role applied to will be considered. No exceptions.",
        "Additional Information:": "",
        "Additional Job Identifiers:" : "",
        "Application Deadline:" : "May 23, 2019 09:00:00 AM",
        "Application Documents Required:" : "University of Waterloo Co-op Work History,Résumé,Grade Report",
        "Application Method:" : "WaterlooWorks",
        "Compensation and Benefits Information:" : "",
        "Department:" : "",
        "Division:" : "W",
        "Employer Internal Job Number:" : "",
        "Job - Address Line One:" : "FAKE ADDRESS HERE",
        "Job - Address Line Two:" : "",
        "Job - City:" : "San Francisco",
        "Job - Country:" : "United States",
        "Job - Postal Code / Zip Code (X#X #X#):" : "94104",
        "Job - Province / State:" : "California",
        "Job Category (NOC):" : "2173 Software Engineers and Designers",
        "Job Location (if exact address unknown or multiple locations):" : "",
        "Job Posting Status:" : "s",
        "Job Responsibilities:" : "These are totally fake job reponsibilities \n I don't expect Morbi laoreet volutpat nunc, et pretium risus congue eget. Proin blandit lobortis dui, ut dapibus neque. Donec eu nibh vel justo suscipit vehicula egestas sed dui. Maecenas posuere laoreet neque, eget tristique arcu semper et. Vivamus malesuada nulla vel gravida laoreet. Integer et magna et dolor sollicitudin maximus.",
        "Job Title:" : "Fake Job",
        "Job Type:" : "Co-op Main",
        "Level:" : ["Intermediate↵Senior", "Intermediate", "Senior"],
        "Number of Job Openings:" : "1",
        "Organization:" : "Fake Company",
        "Region:" : "USA - West",
        "Reports to:" : "",
        "Required Skills:" : "",
        "Required skills:" : "",
        "Special Job Requirements:" : "This is a fake note from CECA, this is just to populate the field before I get the REALL DATAA",
        "Targeted Clusters:" :  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        "Targeted Degrees and Disciplines:" : "This field has been useless to me since day 1",
        "Title:" : "FAKE TITLE",
        "Transportation and Housing:" : "NONE PROVIDED",
        "Work Term Duration:" : "4 month work term",
        "Work Term:" : "2018 - Fall",
        "_id" : "65123",
        "count": 0,
        "cover_letter": false
      }
    }
  }

  getJob(id) {
    if(id === 0){
      return {}
    }
    return JobService.getFullJobID(id)
  }

  componentDidMount(){
    if(this.props.render !== false && this.props.id !== 0) {
      this.getJob(this.props.id).then(data => {
        this.setState({ job: data, blur: ''  });
      });
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.id !== prevProps.id && this.props.render !== false){
      this.getJob(this.props.id).then(data => {
        this.setState({ job: data, blur: '' });
      });
    }
  }

  render() {
    if(this.props.width < 600) {
      return (<div id="job" className="modal modal-fixed-footer">
          <div className="modal-content flow-text">
            <p style={{"fontSize":"18px", "fontWeight":"400"}}>{this.state.job["Job Title:"]}, {this.state.job["Organization:"]}</p>
            <p className="secondary" style={{"margin": 0, "padding": 0, "color": "#999", "whiteSpace": "pre-line", "wordWrap": "break-word"}}>
              <span className={`primary ${this.state.blur}`} style={{"color":"red"}}>{this.state.job["Work Term Duration:"] === "4 month work term" ? "": "Duration: " + this.state.job["Work Term Duration:"] + "\n"}</span>
              <span className={`primary ${this.state.blur}`} style={{"color":"black"}}>Location: </span>{this.state.job["Job - City:"]} {this.state.job["Job Location (if exact address unknown or multiple locations):"]} {this.state.job["Job - Province / State:"]}<br />
              <span className={`primary ${this.state.blur}`} style={{"color":"red"}}>{this.state.job["cover_letter"] === false ? "": "Cover Letter: Required\n"}</span>
              <span className={`primary ${this.state.blur}`} style={{"color":"black"}}>Number of Applications: </span>{this.state.job["count"]}<br />
              <span className={`primary ${this.state.blur}`} style={{"color":"black"}}>Number of Job Openings: </span>{this.state.job["Number of Job Openings:"]}<br /><br />
              <span className={`primary ${this.state.blur}`} id="respo" style={{"color":"black"}}>Responsibilities: </span>
              {this.state.job["Job Responsibilities:"]}
              <br /><br /><span className={`primary ${this.state.blur}`} id="req" style={{"color":"black"}}>Requirements: </span>
              {this.state.job["Required Skills:"] === "" ? "Not Given" : this.state.job["Required Skills:"]}
              <br /><br /><span className={`primary ${this.state.blur}`} id="desc" style={{"color":"black"}}>Description: </span>
              {this.state.job["Job Summary:"]}
            </p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect btn-flat">Close</a>
         </div>
       </div>);
     }
     else {
       return (
         <div className="job hide-on-small-only">
           <div>
               <div className="card">
                   <div className={`card-content box-shadow ${this.state.blur}`}  id="jobdeets" style={{"scrollBehavior": "smooth", "borderTop": "4px solid rgb(199, 196, 253)", "paddingTop": "2%", "paddingRight": "2%", "color": "#999", "position": "fixed", "overflowY": "scroll", "maxHeight": "80%", "marginRight":"2%"}}>
                       <div className="card-title">
                           <p style={{"fontSize":"18px", "fontWeight":"400"}}>{this.state.job["Job Title:"]}, {this.state.job["Organization:"] + "\n"} <span><span class="disable-select">#</span>{String(this.state.job["id"])}</span></p>
                       </div>
                       <p className="secondary">
                         <span className={`primary ${this.state.blur}`} style={{"color":"red"}}>{this.state.job["Work Term Duration:"] === "4 month work term" ? "": "Duration: " + this.state.job["Work Term Duration:"] + "\n"}</span>
                         <span className={`primary ${this.state.blur}`}>Location: </span>{this.state.job["Job - City:"]} {this.state.job["Job Location (if exact address unknown or multiple locations):"]} {this.state.job["Job - Province / State:"]}<br />
                         <span className={`primary ${this.state.blur}`} style={{"color":"red"}}>{this.state.job["cover_letter"] === false ? "": "Cover Letter: Required\n"}</span>
                         <span className={`primary ${this.state.blur}`} style={{"color":"black"}}>Number of Applications: </span>{this.state.job["count"]}<br />
                         <span className={`primary ${this.state.blur}`}>Number of Job Openings: </span>{this.state.job["Number of Job Openings:"]}<br /><br />
                         <span className={`primary ${this.state.blur}`} id="respo">Responsibilities: </span>
                         {this.state.job["Job Responsibilities:"]}
                         <br /><br /><span className={`primary ${this.state.blur}`} id="req">Requirements: </span>
                         {this.state.job["Required Skills:"] === "" ? "Not Given" : this.state.job["Required Skills:"]}
                         <br /><br /><span className={`primary ${this.state.blur}`} id="desc">Description: </span>
                         {this.state.job["Job Summary:"]}
                       </p>
                   </div>
               </div>
           </div>
         </div>
       );
     }
  }
}
