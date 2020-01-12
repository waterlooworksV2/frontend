import React, {useContext, useEffect, useState} from 'react';
import { ContextMenu, SubMenu, MenuItem } from 'react-contextmenu';

import './index.scss';

// @ts-ignore
import Loading from '../loading';
import LoadingSpinner from "../loadingSpinner";
import {ListService} from "../../services/API";
import {TokenStore} from "../../apps/authenticated-app";
import {ListType} from "../listPreview"

interface ContextModalType {
  jobId?: number;
}

// @ts-ignore
export default function ContextModal(props: ContextModalType) {
  const token = useContext(TokenStore);
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([] as ListType[]);
  const [listLoading, setListLoading] = useState({index: 0, loading: false})
  const [listDone, setListDone] = useState({index: 0, done: 0})

  useEffect(
    () => {
      if(token !== ""){
        setLoading(false);
        ListService.getLists(token).then((data) => {
          console.log(data)
          // @ts-ignore
          setLists(data.lists)
        }).catch((err: any) => {
          console.log(err);
        })
      }
    }, [token]);

  const addJobToList = (index: number, listId: String, jobId: String) => {
    setListLoading({index: index, loading: true})
    if(token !== ""){
      ListService.addJobToList(
        token,
        jobId,
        listId
      ).then((data) => {
        setListLoading({index: -1, loading: false})
        setListDone({index: index, done: 1});
      }).catch((err: any) => {
        setListLoading({index: -1, loading: false})
        setListDone({index: index, done: -1});
      })
    }
  }

  useEffect(() => {
    if(listDone.done != 0){
      const timer = setTimeout(() => setListDone({index: -1, done: 0}), 1000);
      return () => clearTimeout(timer);
    }
  }, [listDone]);

  if(loading){
      return (
        <ContextMenu className={"ContextModal"} id="some_unique_identifier">
          <Loading />
        </ContextMenu>
      )
    }
    return (
      <ContextMenu id="some_unique_identifier">
        <MenuItem disabled>
          Add to List
        </MenuItem>
        <MenuItem divider />
        {lists.map((list, index) => {
          const {_id} = list;
          return (
            // @ts-ignore
            <MenuItem preventClose={true} key={index} onClick={(e, data, target) => addJobToList(index, _id, data.jobId)}>
              <div>
                <span>{list.name}</span>
                {listLoading.index === index && listLoading.loading && <LoadingSpinner/>}
                <span>
                  {listDone.index === index && listDone.done > 0 && '✅'}
                  {listDone.index === index && listDone.done < 0 && '❌'}
                </span>
              </div>
            </MenuItem>
          )
        })}
      </ContextMenu>
    );
}

export {ContextModal};
