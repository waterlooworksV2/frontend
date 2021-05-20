import React, {useContext, useEffect, useState} from 'react';
import { ContextMenu, SubMenu, MenuItem } from 'react-contextmenu';
import Clipboard from 'react-clipboard.js';

import './index.scss';

// @ts-ignore
import Loading from '../loading';
import LoadingSpinner from "../loadingSpinner";
import {ListService} from "../../services/API";
import {TokenStore} from "../../apps/authenticated-app";
import {ListType} from "../listPreview"

interface ContextModalType {
  listPage?: boolean
}

export interface CreateListResponseType {
  list: ListType;
}

// @ts-ignore
export default function ContextModal({listPage}: ContextModalType) {
  const token = useContext(TokenStore);
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([] as ListType[]);
  const [listLoading, setListLoading] = useState({index: 0, loading: false})
  const [listDone, setListDone] = useState({index: 0, done: 0})
  const [clipboardVal, setClipboardVal] = useState('');
  const [showListDetails, setShowListDetails] = useState(false);
  const [listName, setListName] = useState('');
  const [jobID, setJobID] = useState("");
  
  useEffect(
    () => {
      if(token !== ""){
        setLoading(false);
        ListService.getLists(token).then((data) => {
          // @ts-ignore
          setLists(data.lists)
        }).catch((err: any) => {
          console.log(err);
        })
      }
    }, [token]);

  const addJobToList = (index: number, listId: String, jobId: number) => {
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
    if(listDone.done !== 0){
      const timer = setTimeout(() => setListDone({index: -1, done: 0}), 1000);
      return () => clearTimeout(timer);
    }
  }, [listDone]);
  
  const restoreCreateListState = () => {
    setShowListDetails(false);
    setListName("");
    setJobID("");
  }

  const createList = (name: string, description: string) => {
    if(token !== ""){
      ListService.createNewList(token, name, description).then((data) => {
        // @ts-ignore
        setLists([...lists, data.list])
        restoreCreateListState();
      }).catch((err: any) => {
        console.log(err)
      })
    }
  }
  
  const onShowContextMenu = (e: any) => {
    setClipboardVal(`${window.location.host}/${e.detail.data.path}`);
    setJobID(String(e.detail.data.jobId));
  }
  console.log(lists)
  if(loading){
      return (
        <ContextMenu className={"ContextModal"} id="some_unique_identifier">
          <Loading />
        </ContextMenu>
      )
    }
    return (
      <div>
        <ContextMenu 
        id="some_unique_identifier"
         // @ts-ignore
         collect={props => props}
         onShow={onShowContextMenu}
         onHide={e => restoreCreateListState()}
       >
          <SubMenu title={"Add to List"}>
            {lists.map((list, index) => {
              console.log(list);
              const {_id} = list;
              return (
                <MenuItem 
                  preventClose={true} key={index}
                  // @ts-ignore
                  onClick={(e, data, target) => addJobToList(index, _id, data.jobId)}
                >
                  <div className="lists">
                    <span>{list.name}</span>
                    {listLoading.index === index && listLoading.loading && <LoadingSpinner/>}
                    <span>
                      {listDone.index === index && listDone.done > 0 && '✅'}
                      {listDone.index === index && listDone.done < 0 && '❌'}
                      {
                        // @ts-ignore
                        list && list.jobIDs && list.jobIDs.includes(jobID) && '✅'
                      }
                    </span>
                  </div>
                </MenuItem>
              )
            })}
            <MenuItem 
              preventClose={true}
              onClick={(e, data, target) => setShowListDetails(true)}
            >
              {showListDetails ?
                <div className={"list-details"}>
                  <label>
                    Enter list name
                    <input value={listName} onChange={(e) => setListName(e.target.value)}/>
                    <button type={"submit"} onClick={() => createList(listName, '')}>
                      Submit
                    </button>
                  </label>
                </div>

                :
                "Create"}
            </MenuItem>
          </SubMenu>
          {
            document.queryCommandSupported('copy') &&
            <>
              <MenuItem divider/>
              <MenuItem>
                <Clipboard component="div" data-clipboard-text={clipboardVal}>
                  Share
                </Clipboard>
              </MenuItem>
            </>
          }
        </ContextMenu>
      </div>


    );
}

export {ContextModal};
