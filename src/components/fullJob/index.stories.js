import React, {useState} from 'react';

import { action } from '@storybook/addon-actions';
import { TokenStore } from '../../pages/authenticated-app';
import { AuthService } from '../../services/API';

import FullJob from '../fullJob'
const { EMAIL, PASSWORD } = process.env

export default {
  title: 'AuthenticatedApp/FullJob',
  component: FullJob,
};

export const DefaultJob = () => { 
  const [token, setToken] = useState('');
  AuthService.login(EMAIL, PASSWORD).then((data) => {
    setToken(data);
  })
  return (<TokenStore.Provider value={token}>
    <FullJob jobId={114175}/>
  </TokenStore.Provider>);
}
