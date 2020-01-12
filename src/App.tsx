import React, { useEffect, useReducer } from 'react';
import {BrowserRouter as Router} from "react-router-dom";

import {AuthenticatedApp} from './apps/authenticated-app';
import UnAuthenticatedApp from './apps/unauthenticated-app';

const TokenSetStore = React.createContext({});

function tokenReducer(
  state: {token: string}, 
  action: {type: string, token: string}
) {
  switch (action.type) {
    case 'update':
      return {token: action.token};
    default:
      return {token: action.token}
  }
}

const App = () => {
  let [state, dispatch] = useReducer(tokenReducer, {token: ''});

  useEffect(() => {
    if(window.localStorage && state.token !== localStorage.getItem('token')){
      if(localStorage.getItem('token') !== null){
        dispatch({type: 'update', token: String(localStorage.getItem('token'))})
      }
    }
  }, [])

  useEffect(()=>{
    if(window.localStorage){
      localStorage.setItem('token', state.token);
    }
  },[state.token])

  let authenticatedApp =  (
    <Router>
      <AuthenticatedApp token={state.token} />
    </Router>
  )
  
  return <TokenSetStore.Provider value={dispatch}>
  {(state.token || state.token !== '') ? authenticatedApp : <UnAuthenticatedApp/>}
  </TokenSetStore.Provider>
}

export {TokenSetStore, App, tokenReducer};

