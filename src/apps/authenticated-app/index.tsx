import React, {useState, useEffect, useContext, FormEvent} from 'react';
import {
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import './index.scss';

import { JobService } from '../../services/API';
import {TokenSetStore} from '../../App';

import Navbar from "../../components/navigation";
import JobsViewer from '../../components/jobsViewer';
import JobPage from '../../pages/jobPage';
import ListPage from "../../pages/listPage";
import SearchPage from "../../pages/searchPage";

const TokenStore = React.createContext('');

interface AuthenticatedAppProp {
  token: string;
}

const AuthenticatedApp = (props: AuthenticatedAppProp) => {

  const [state, setState] = useState(props);
  const [listOfJobIds, setListOfJobIds] = useState([0,0,0,0,0,0,0,0,0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [searchPage, setSearchPage] = useState<boolean>(false);
  const {token} = props;
  const dispatch = useContext(TokenSetStore);
  const location = useLocation();

  if(location.pathname == "/search"){
    if(searchPage !== true){
      setSearchPage(true)
    }
  } else {
    if(searchPage !== false){
      setSearchPage(false)
    }
  }

  const search = new URLSearchParams(location.search);
  useEffect(
    () => {
      if(search && search.has("page") && parseInt(search.get("page") as string) !== currentPage){
        setCurrentPage(parseInt(search.get("page") as string))
      }
    }, [])

  useEffect(
    () => {
      setState(props)
    }, [props]);
    
  const submit = (searchString: string, token: string, currentPage: number) => {
    if(token !== ''){
      setListOfJobIds([0,0,0,0,0,0,0,0,0])
      JobService.search(token, searchString, currentPage).then((data) => {
        // @ts-ignore
        setListOfJobIds(data.ids);
        // @ts-ignore
        setTotalPages(data.pages);
      }).catch((err) => {
        // @ts-ignore
        dispatch({type: 'update', token: ''})
        // @ts-ignore
        console.log(err);
      });
    }
  }

  useEffect(
    () => {
      submit(search.get("search") as string, token, currentPage)
    }, [token, currentPage, searchPage]);

  const onSubmitSearch = (searchString: string, e?: FormEvent) => {
    if(e){
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentPage(1);
    submit(searchString, token, currentPage)
  }

  return (
    <TokenStore.Provider value={state.token}>
      <Navbar onSubmitSearch={onSubmitSearch}/>
      <div className={"authenticated-app"}>
        <Switch>
          <Route path="/job/:jobId" component={JobPage} />
          <Route path="/lists/:listId">
            <ListPage />
          </Route>
          <Route path="/lists/" component={ListPage} />
          <Route path="/search">
            <JobsViewer
              listOfJobIds={listOfJobIds}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </Route>
          <Route path="/" >
              <JobsViewer
                listOfJobIds={listOfJobIds}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
          </Route>
        </Switch>
      </div>
    </TokenStore.Provider>
  );
}

export { AuthenticatedApp, TokenStore };