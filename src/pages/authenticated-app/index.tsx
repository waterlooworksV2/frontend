import React, {useState, useEffect, useContext} from 'react';
import './index.scss';

import { JobService } from "../../services/API";
import {TokenSetStore} from "../../App";

import FullJob from '../../components/fullJob'
import PreviewJob from '../../components/previewJob'
import Pagination from "../../components/pagination";


const TokenStore = React.createContext('');

interface AuthenticatedAppProp {
  token: string;
}

const AuthenticatedApp = (props: AuthenticatedAppProp) => {
  const [state, setState] = useState(props);
  const [listOfJobIds, setListOfJobIds] = useState([-1, -1, -1, -1, -1, -1, -1]);
  const [activeJobId, setActiveJobId] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const {token} = props;
  const dispatch = useContext(TokenSetStore)

  useEffect(
    () => {
      setState(props)
    }, [props]);

  useEffect(
    () => {
      if(token !== ""){
        JobService.search(token, '', currentPage).then((data) => {
          // @ts-ignore
          setListOfJobIds(data.ids);
          // @ts-ignore
          setActiveJobId(data.ids[0]);
          // @ts-ignore
          setTotalPages(data.pages)
        }).catch((err) => {
          // @ts-ignore
          console.log(err);
        });
      }
    }, [token, currentPage]);

  // @ts-ignore
  // @ts-ignore
  return (
    <TokenStore.Provider value={state.token}>
      <div className="AuthenticatedApp">
        <div className="left">
          <div className="previews">
            {listOfJobIds.map((jobId, i) => {
              // @ts-ignore
              return <PreviewJob key={i} jobId={jobId} onClick={() => setActiveJobId(jobId)}/>
            })}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            // @ts-ignore
            onClickPage={(page) => setCurrentPage(page)}
          />
        </div>
        <div className="right">
          <FullJob jobId={activeJobId}/>
        </div>
      </div>
    </TokenStore.Provider>
  );
}

export { AuthenticatedApp, TokenStore };