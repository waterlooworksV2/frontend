import React, { useState, useEffect, useContext, MouseEvent } from "react";
import {ContextMenuTrigger} from 'react-contextmenu';
import "./index.scss";

import { JobService } from "../../services/API";
import { TokenStore } from "../../apps/authenticated-app";

// @ts-ignore
import Loading from "../loading";

interface PreviewJobProp {
  jobId: number;
  onClick: () => {};
}

interface JobPreviewDetails {
  "Job Summary:": String;
  "Job Title:": String;
  "Organization:": String;
  "_id": String;
  "cover_letter": boolean;
}

const PreviewJob = ({jobId, onClick}: PreviewJobProp) => {
  const [details, setDetails] = useState({} as JobPreviewDetails);
  const [loading, setLoading] = useState(true);
  const [doesntExist, setDoesntExist] = useState(false);
  const token = useContext(TokenStore);
  useEffect(
    () => {
      if(token !== "" && jobId > 0){
        setLoading(true);
        setDoesntExist(false);
        JobService.getPreview(token, jobId).then((data) => {
          // @ts-ignore
          setDetails(data);
          setLoading(false);
        }).catch((err) => {
          // @ts-ignore
          console.log(err);
          if(err.response.status === 404){
            setDoesntExist(true);
          }
        });
      }
    }, [jobId, token]);

  if(doesntExist){
    return (
      <div className="PreviewLoadingCard">
        <span>This job does not exist</span>
      </div>
    )
  }
  else if(loading){
    return (
      <div className="PreviewLoadingCard">
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
        collect={(props) => props}
      >
        <div
          className={`PreviewCard ${details['cover_letter'] ? 'CoverLetter' : '' }`}
          onClick={onClick}
        >
          <p className="title">{details["Job Title:"]}, {details["Organization:"]}</p>
          <p>{details["Job Summary:"]}</p>
        </div>
      </ContextMenuTrigger>
    );
  }
  
}

export default PreviewJob;
