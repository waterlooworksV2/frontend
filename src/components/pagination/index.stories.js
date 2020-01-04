import React, {useState} from 'react';

import { action } from '@storybook/addon-actions';
import { TokenStore } from '../../pages/authenticated-app';
import { AuthService } from '../../services/API';

import PreviewJob from '../previewJob'
const { EMAIL, PASSWORD } = process.env

export default {
  title: 'AuthenticatedApp/PreviewJob',
  component: PreviewJob,
};

export const DefaultJob = () => { 
  const [token, setToken] = useState('');
  AuthService.login(EMAIL, PASSWORD).then((data) => {
    setToken(data);
  })
  return (<TokenStore.Provider value={token}>
    <PreviewJob jobId={114175}/>
  </TokenStore.Provider>);
}

export const CoverLetterJob = () => { 
  const [token, setToken] = useState('');
  AuthService.login(EMAIL, PASSWORD).then((data) => {
    setToken(data);
  })
  return (<TokenStore.Provider value={token}>
    <PreviewJob jobId={108787}/>
  </TokenStore.Provider>);
}

export const JobDoesntExist = () => { 
  const [token, setToken] = useState('');
  AuthService.login(EMAIL, PASSWORD).then((data) => {
    setToken(data);
  })
  return (<TokenStore.Provider value={token}>
    <PreviewJob jobId={0}/>
  </TokenStore.Provider>);
}
