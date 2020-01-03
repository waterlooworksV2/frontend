import React, { useState, useEffect } from 'react';
import FullJob from '../../components/fullJob'

const TokenStore = React.createContext('');

interface AuthenticatedAppProp {
  token: string;
}

const AuthenticatedApp = (props: AuthenticatedAppProp) => {
  const [state, setState] = useState(props);
  return (
    <TokenStore.Provider value={state.token}>
      <div className="AuthenticatedApp" style={{maxWidth: "40%"}}>
        <FullJob jobId={114175}/>
      </div>
    </TokenStore.Provider>
  );
}

export { AuthenticatedApp, TokenStore };