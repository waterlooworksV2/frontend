import React, { useState, useEffect, useContext } from "react";
import "./index.scss";

import { JobService } from "../../services/API";
import { TokenStore } from "../../pages/authenticated-app";

interface FullJobProp {
  jobId: number;
}

interface JobDetails {
"Additional Application Information:": String; 
"Additional Information:": String;
"Application Deadline:": String; 
"Application Documents Required:": String; 
"Application Method:": String;
"Compensation and Benefits Information:": String; 
"Division:": String[]; 
"Employer Internal Job Number:": String; 
"Job - Address Line One:": String;
"Job - Address Line Two:": String; 
"Job - City:": String[]; 
"Job - Country:": String; 
"Job - Postal Code / Zip Code (X#X #X#):": String; 
"Job - Province / State:": String; 
"Job Category (NOC):": String; 
"Job Location (if exact address unknown or multiple locations):": String; 
"Job Posting Status:": String[]; 
"Job Responsibilities:": String; 
"Job Summary:": String; 
"Job Title:": String; 
"Job Type:": String; 
"Level:": String[]; 
"Organization:": String; 
"Region:": String; 
"Required Skills:": String; 
"Special Job Requirements:": String; 
"Targeted Degrees and Disciplines:": String; 
"Transportation and Housing:": String; 
"Work Term Duration:": String; 
"Work Term:": String; 
"_id": String; 
"Number of Job Openings:": String; 
"cover_letter": boolean; 
"viewed": boolean; 
"count": number; 
}


const FullJob = (props: FullJobProp) => {
  const [state, setState] = useState(props);
  const [details, setDetails] = useState({} as JobDetails);
  const [loading, setLoading] = useState(true);
  const token = useContext(TokenStore);
  useEffect(
    () => {
      if(token !== ""){
        JobService.getJob(token, state.jobId).then((data) => {
          // @ts-ignore
          setDetails(data);
          setLoading(false);
        }).catch((err) => {
          // @ts-ignore
          console.log(err);
        });
      }
    }, [state.jobId, token]);
  if(loading){
    return (<div className="LoadingCard">
      <span>Loading</span>
    </div>)
  } else {
    return (
      <div className="Card">
        <span className="title">Organization: </span>{details["Organization:"]}
        <br />
        <br />
        <span className="title">Job Title: </span>{details["Job Title:"]}
        <br />
        <br />
        <span className="title">Job Responsibilities: </span>{details["Job Responsibilities:"]}
        <br />
        <br />
        <span className="title">Job Summary: </span>{details["Job Summary:"]}
        <br />
        <br />
        <span className="title" style={{"color":"red"}}>{details["cover_letter"] === false ? "": "Cover Letter: Required\n"}</span>
      </div>
    );
  }
  
}

export default FullJob;
