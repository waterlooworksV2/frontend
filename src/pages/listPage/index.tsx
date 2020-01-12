import React, {MouseEvent, useContext, useEffect, useState} from "react";
import {useParams, useHistory} from 'react-router-dom';
import "./index.scss";

import Back from "../../components/backButton";
import ListPreview, {ListType} from "../../components/listPreview"
import {ListService} from "../../services/API";
import {TokenStore} from "../../apps/authenticated-app";
import Loading from "../../components/loading";
import JobsViewer from "../../components/jobsViewer";

const ListPage = () => {
  const history = useHistory();
  const token = useContext(TokenStore);
  const {listId} = useParams();

  const [lists, setLists] = useState([{loading: true}, {loading: true}] as ListType[]);
  const [listOfJobIds, setListOfJobIds] = useState([0,0,0,0,0,0,0,0]);

  const [loading, setLoading] = useState(true);
  useEffect(
    () => {
      if(token !== ""){
        setLoading(true);
        ListService.getLists(token, true).then((data) => {
          // @ts-ignore
          setLists(data.lists)
          setLoading(false);
        }).catch((err: any) => {
          console.log(err);
        })
      }
    }, [token]);

  useEffect(
    () => {
      if(token !== ""){
        setLoading(true);
        ListService.getListPreview(token, listId, false).then((data) => {
          // @ts-ignore
          setListOfJobIds(data.jobIDs)
          setLoading(false);
        }).catch((err: any) => {
          console.log(err);
        })
      }
    }, [listId]);

  const removeJobFromList = (listId: string | undefined, jobId: number, e: MouseEvent) => {
    e.preventDefault();
    if(token !== "" || !listId) {
      ListService.removeJobFromList(token, listId as string, jobId).then((data) => {
        setListOfJobIds(listOfJobIds.filter(l => l !== jobId))
      }).catch((err: any) => {
        console.log(err)
      })
    }
  }

  if(listId){
    return <div>
      {loading && <Loading />}
      <JobsViewer
        listOfJobIds={listOfJobIds}
        listId={listId}
        remove={(jobId, e) => removeJobFromList(listId, jobId, e)}
      />
    </div>
  }
  return (
    <div className={"listPage"}>
      <Back history={history} />
      <div className={"listPreviews"}>
        {
          lists.map((list, index) => {
            return <ListPreview
              key={list._id}
              name={list.name}
              jobIDs={list.jobIDs}
              description={list.description}
              _id={list._id}
              loading={loading}
              setDelete={() => {
                setLists(lists.filter(l => l._id !== list._id))
              }}
            />
          })
        }
        </div>
    </div>
  )
}

export default ListPage;