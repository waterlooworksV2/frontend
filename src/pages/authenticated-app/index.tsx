import React, { useState } from 'react';

const AuthenticatedApp = (token: String) => {
  return (
    <div className="AuthenticatedApp" style={{maxWidth: "40%"}}>
      <p style={{maxWidth: "80%", wordBreak: "break-word"}}>Logged in {token}</p>
    </div>
  );
}

export default AuthenticatedApp;