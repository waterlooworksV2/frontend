import React, { useState, useEffect, useContext } from "react";
import {useHistory} from "react-router-dom";
import "./index.scss";
import { JobService } from "../../services/API";
import { TokenStore } from "../../apps/authenticated-app";


import Loading from "../loading"
import {ContextMenuTrigger} from "react-contextmenu";

interface FullJobProp {
  jobId: number;
  onClick?: () => void;
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
  "color": string;
}


const FullJob = ({jobId, onClick}: FullJobProp) => {
  const [details, setDetails] = useState({} as JobDetails);
  const [loading, setLoading] = useState(true);
  const [doesntExist, setDoesntExist] = useState(false);
  const history = useHistory();
  const token = useContext(TokenStore);
  
  const search = new URLSearchParams(window.location.search);
  useEffect(
    () => {
      if( 
          search 
          && search.has("job") 
          && parseInt(search.get("job") as string) !== jobId 
          && jobId !== 0 
      ){
        search.set("job", String(jobId))
        history.push(`?${search.toString()}`)
      }
    }, [jobId]);
  
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
      } else if (jobId < 0){
        setDoesntExist(true);
      }
    }, [jobId, token]);
  
  if(doesntExist){
    return (
      <div className="LoadingCard" onClick={onClick}>
        <span>The job you are looking for does not exist</span>
      </div>
    )
  }
  else if(loading){
    return (
      <div className="LoadingCard" onClick={onClick}>
        <Loading />
      </div>
    )
  } else {
    return (
      <ContextMenuTrigger
        id="some_unique_identifier"
        holdToDisplay={500}
        // @ts-ignore
        jobId={jobId}
        path={`job/${jobId}`}
        // @ts-ignore
        share={true}
        collect={(props) => props}
      >
        <div 
          className="Card" 
          onClick={onClick}
          style={{borderTop: `2px solid ${details["color"]}`}}
        >
          <p className="pad big"><span className="title">{details["Job Title:"]}</span></p>
          <p>{details["Organization:"]}</p>
          <p className="pad">{details["Job - Country:"]}, {details["Job - City:"].join(", ")}</p>
          <p className="pad">{details["Number of Job Openings:"]} {details["Number of Job Openings:"] > 1 ? 'openings' : 'opening'}</p>
          <p className="pad"><span className="title" style={{"color":"red"}}>{details["cover_letter"] === false ? "": "Cover Letter: Required\n"}</span></p>
          <p className="pad"><span className="title">Job Responsibilities: </span>{details["Job Responsibilities:"]}</p>
          <p className="pad"><span className="title">Job Summary: </span>{details["Job Summary:"]}</p>
          <p className="pad"><span className="title">Job Requirements: </span>{details["Required Skills:"]}</p>
        </div>
      </ContextMenuTrigger>
    );
  }
  
}

export default FullJob;
