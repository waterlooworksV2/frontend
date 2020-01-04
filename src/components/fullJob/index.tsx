import React, { useState, useEffect, useContext } from "react";
import "./index.scss";

import { JobService } from "../../services/API";
import { TokenStore } from "../../pages/authenticated-app";

import Loading from "../loading"

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
  "Number of Job Openings:": number;
  "cover_letter": boolean; 
  "viewed": boolean; 
  "count": number; 
}


const FullJob = ({jobId}: FullJobProp) => {
  const [details, setDetails] = useState({} as JobDetails);
  const [loading, setLoading] = useState(true);
  const [doesntExist, setDoesntExist] = useState(false);
  const token = useContext(TokenStore);
  useEffect(
    () => {
      if(token !== "" && jobId > 0){
        setLoading(true);
        setDoesntExist(false);
        JobService.getJob(token, jobId).then((data) => {
          // @ts-ignore
          setDetails(data);
          setLoading(false);
        }).catch((err) => {
          // @ts-ignore
          console.log(err);
          if(err && err.response && err.response.status === 404){
            setDoesntExist(true);
          }
        });
      }
    }, [jobId, token]);
  if(doesntExist){
    return (
      <div className="LoadingCard">
        <span>The job you are looking for does not exist</span>
      </div>
    )
  }
  else if(loading){
    return (
      <div className="LoadingCard">
        <Loading />
      </div>
    )
  } else {
    return (
      <div className="Card">
        <p className="pad big"><span className="title">{details["Job Title:"]}</span></p>
        <p>{details["Organization:"]}</p>
        <p className="pad">{details["Job - Country:"]}, {details["Job - City:"]}</p>
        <p className="pad">{details["Number of Job Openings:"]} {details["Number of Job Openings:"] > 1 ? 'openings' : 'opening'}</p>
        <p className="pad"><span className="title" style={{"color":"red"}}>{details["cover_letter"] === false ? "": "Cover Letter: Required\n"}</span></p>
        <p className="pad"><span className="title">Job Responsibilities: </span>{details["Job Responsibilities:"]}</p>
        <p className="pad"><span className="title">Job Summary: </span>{details["Job Summary:"]}</p>
      </div>
    );
  }
  
}

export default FullJob;
