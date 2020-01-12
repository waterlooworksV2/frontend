import React, {useContext, useEffect, useState} from "react";
import {useParams, useHistory} from 'react-router-dom';
import "./index.scss";

import Back from "../../components/BackButton";
import ListPreview, {ListType} from "../../components/listPreview"
import {ListService} from "../../services/API";
import {TokenStore} from "../../apps/authenticated-app";

const ListPage = () => {
  const history = useHistory();
  const token = useContext(TokenStore);
  const {listId} = useParams();

  const [lists, setLists] = useState([{loading: true}, {loading: true}] as ListType[]);
  const [loading, setLoading] = useState(true);
  useEffect(
    () => {
      if(token !== ""){
        setLoading(true);
        ListService.getLists(token, true).then((data) => {
          console.log(data)
          // @ts-ignore
          setLists(data.lists)
          setLoading(false);
        }).catch((err: any) => {
          console.log(err);
        })
      }
    }, [token]);

  if(listId){
    return <div>
      {listId}
    </div>
  }
  return (
    <div className={"listPage"}>
      <Back history={history} />
      <div className={"listPreviews"}>
        {
          lists.map((list, index) => {
            return <ListPreview
              key={index}
              name={list.name}
              jobIDs={list.jobIDs}
              description={list.description}
              _id={list._id}
              loading={loading}
            />
          })
        }
        </div>
    </div>
  )
}

export default ListPage;