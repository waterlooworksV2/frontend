import React, {useState, useEffect, useContext, MouseEvent} from "react";
import {ContextMenuTrigger} from 'react-contextmenu';
import "./index.scss";

import { JobService } from "../../services/API";
import { TokenStore } from "../../apps/authenticated-app";

// @ts-ignore
import Loading from "../loading";
import close from "../../assets/icons/close.svg";

interface PreviewJobProp {
  jobId: number;
  onClick: () => {};
  remove?: (jobId: number, e: MouseEvent) => void;
}

interface JobPreviewDetails {
  "Job Summary:": String;
  "Job Title:": String;
  "Organization:": String;
  "_id": String;
  "cover_letter": boolean;
  "color": string;
}

const PreviewJob = ({jobId, onClick, remove}: PreviewJobProp) => {
  const [details, setDetails] = useState({} as JobPreviewDetails);
  const [loading, setLoading] = useState(true);
  const [doesntExist, setDoesntExist] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
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
      } else if (jobId < 0) {
        setDoesntExist(true);
      }
    }, [jobId, token]);


  const showWarning = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setShowDeleteWarning(true);
    e.stopPropagation();
  }

  const hideWarning = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowDeleteWarning(false);
    e.stopPropagation();
  }

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
  } else if(showDeleteWarning && remove){
    return (
      <div className={"PreviewCard"} style={{borderTop: `2px solid ${details["color"]}`}}>
        <div className={"delete-confirmation"}>
          <p>Are you sure?</p>
          <button onClick={(e) => remove(jobId, e)}>Yes</button>
          <button onClick={(e) => hideWarning(e)}>No</button>
        </div>
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
        collect={(props) => props}
      >
        <div
          className={`PreviewCard ${details['cover_letter'] ? 'CoverLetter' : '' }`}
          onClick={onClick}
          style={{borderTop: `2px solid ${details["color"]}`}}
        >
          <p className="job-title title">{details["Job Title:"]}, {details["Organization:"]}</p>
          {
            remove &&
            <img
              className={"close-button"}
              alt="close button"
              src={close}
              onClick={(e) => showWarning(e)}
            />
          }
          <p>{details["Job Summary:"]}</p>
        </div>
      </ContextMenuTrigger>
    );
  }
  
}

export default PreviewJob;
