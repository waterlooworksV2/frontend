import React from 'react';
import './index.scss';

import {Link} from "react-router-dom";

// @ts-ignore
import Loading from '../loading';

export interface MiniJobPreview {
  "Job Title:": string;
  "Organization": string;
  "_id": string;
}

export interface ListType {
  name?: String;
  jobIDs?: number[] | MiniJobPreview[];
  owner?: String;
  description?: String;
  _id?: String;
  loading?: boolean;
}

// @ts-ignore
export default function ListPreview({name, description, jobIDs, owner, _id, loading}: ListType) {
  if(loading){
      return (
        <div className={"listPreview"}>
          <Loading />
        </div>
      )
  }
  return (
    <Link to={`/lists/${_id}`} >
      <div className={"listPreview"}>
        <p className={"title"}>{name}</p>
        <p className={"title"}>{description}</p>
        <div>
          {jobIDs && jobIDs.length > 0 ?
            <p className={"title"}>Jobs in list: </p> :
            <p className={"title"}>No Jobs in this list</p>
          }
          {/*
    // @ts-ignore */}
          {jobIDs && jobIDs.map((job, index) => {
            return (
              <p key={index}>{job["Job Title:"]}, {job["Organization:"]}</p>
            )
          })}
        </div>
      </div>
    </Link>
  );
}

export {ListPreview};
