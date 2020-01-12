import React, {useState, useEffect, useContext} from 'react';
import {
  Switch,
  Route,
  useHistory,
  BrowserRouter as Router, useParams
} from "react-router-dom";
import './index.scss';

import { JobService } from '../../services/API';
import {TokenSetStore} from '../../App';

import FullJob from '../../components/fullJob'
import PreviewJob from '../../components/previewJob'
import Pagination from '../../components/pagination';
import ContextModal from '../../components/contextModal';
import JobsViewer from '../../components/jobsViewer';
import JobPage from '../../pages/jobPage';
import ListPage from "../../pages/listPage";

const TokenStore = React.createContext('');

interface AuthenticatedAppProp {
  token: string;
}

const AuthenticatedApp = (props: AuthenticatedAppProp) => {

  const [state, setState] = useState(props);
  const [listOfJobIds, setListOfJobIds] = useState([-1, -1, -1, -1, -1, -1, -1]);
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
      if(token !== ''){
        setListOfJobIds([-1, -1, -1, -1, -1, -1, -1])
        JobService.search(token, '', currentPage).then((data) => {
          // @ts-ignore
          setListOfJobIds(data.ids);
          // @ts-ignore
          setTotalPages(data.pages)
        }).catch((err) => {
          // @ts-ignore
          dispatch({type: 'update', token: ''})
          // @ts-ignore
          console.log(err);
        });
      }
    }, [token, currentPage]);

  return (
    <TokenStore.Provider value={state.token}>
      <Switch>
        <Route path="/job/:jobId" component={JobPage} />
        <Route path="/lists/:listId" component={ListPage} />
        <Route path="/lists/" component={ListPage} />

        <Route path="/" >
          <JobsViewer
            listOfJobIds={listOfJobIds}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </Route>
      </Switch>
    </TokenStore.Provider>
  );
}

export { AuthenticatedApp, TokenStore };