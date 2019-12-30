import React, { useState, useEffect, useReducer } from 'react';

import AuthenticatedApp from './pages/authenticated-app'
import UnAuthenticatedApp from './pages/unauthenticated-app' 

const TokenStore = React.createContext({});

function tokenReducer(
  state: {token: string}, 
  action: {type: string, token: string}
) {
  console.log(state, action);
  switch (action.type) {
    case 'update':
      return {token: action.token};
    default:
      throw new Error();
  }
}

// Now, we can set only the properties we really need
const App = () => {
  let [state, dispatch] = useReducer(tokenReducer, {token: ''});
  useEffect(() => {
    console.log(state)
  });
  return <TokenStore.Provider value={dispatch}>
  {(state.token || state.token !== '') ? AuthenticatedApp(state.token): <UnAuthenticatedApp/>}
  </TokenStore.Provider>
}

export {TokenStore, App};

