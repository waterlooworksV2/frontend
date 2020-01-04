import React, { useState, useEffect, useReducer } from 'react';

import { AuthenticatedApp } from './pages/authenticated-app'
import UnAuthenticatedApp from './pages/unauthenticated-app' 

const TokenSetStore = React.createContext({});

function tokenReducer(
  state: {token: string}, 
  action: {type: string, token: string}
) {
  console.log(state, action);
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
    if(window.localStorage && state.token !== localStorage.getItem('theme')){
      if(localStorage.getItem('theme') !== null){
        dispatch({type: 'update', token: String(localStorage.getItem('theme'))})
      }
    }
  }, [])

  useEffect(()=>{
    if(window.localStorage){
      localStorage.setItem('theme', state.token);
    }
  },[state.token])

  let authenticatedApp = <AuthenticatedApp token={state.token} />
  
  return <TokenSetStore.Provider value={dispatch}>
  {(state.token || state.token !== '') ? authenticatedApp : <UnAuthenticatedApp/>}
  </TokenSetStore.Provider>
}

export {TokenSetStore, App, tokenReducer};

