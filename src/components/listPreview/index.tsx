import React, {useContext, useState, MouseEvent} from 'react';
import './index.scss';

import {Link} from "react-router-dom";

// @ts-ignore
import Loading from '../loading';
import close from "../../assets/icons/close.svg";

import {ListService} from '../../services/API';
import {TokenStore} from "../../apps/authenticated-app";

export interface MiniJobPreview {
  "Job Title:": string;
  "Organization": string;
  "_id": string;
}

export interface ListType {
  name?: string;
  jobIDs?: string[] | MiniJobPreview[];
  owner?: String;
  description?: String;
  _id?: string;
  loading?: boolean;
  setDelete: () => void
}

// @ts-ignore
export default function ListPreview({
  name,
  description,
  jobIDs,
  owner,
  _id,
  loading,
  setDelete,
}: ListType) {
  const token = useContext(TokenStore);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const deleteList = (listId: String | undefined, e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(token !== "" || !listId) {
      ListService.deleteList(token, listId as string).then((data) => {
        setDelete()
      }).catch((err: any) => {
        console.log(err)
      })
    }
  }

  const showWarning = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setShowDeleteWarning(true);
  }

  const hideWarning = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowDeleteWarning(false);
  }
  if(loading || !_id){
      return (
        <div className={"listPreview loading"}>
          <Loading />
        </div>
      )
  } else if(showDeleteWarning){
    return (
      <div className={"listPreview"}>
        <div className={"delete-confirmation"}>
          <p>Are you sure?</p>
          <button onClick={(e) => deleteList(_id, e)}>Yes</button>
          <button onClick={(e) => hideWarning(e)}>No</button>
        </div>
      </div>
    )
  }
  if(jobIDs && jobIDs.length > 0){
    return (
      <Link to={`/lists/${_id}`} >
        <div className={"listPreview"}>
        <span className={"close-button"}>
          <p className={"title"}>{name}</p>
          <img alt="close button" src={close} onClick={(e) => showWarning(e)}/>
        </span>
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
    )
  } else {
    return (
        <div className={"listPreview"}>
        <span className={"close-button"}>
          <p className={"title"}>{name}</p>
          <img alt="close button" src={close} onClick={(e) => showWarning(e)}/>
        </span>
          <p className={"title"}>{description}</p>
          <div>
            {jobIDs && jobIDs.length > 0 ?
              <p className={"title"}>Jobs in list: </p> :
              <p className={"title"}>Empty list</p>
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
    )
  }

}

export {ListPreview};
