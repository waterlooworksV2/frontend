import React, {useState} from 'react';

import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

import {AuthenticatedApp} from '../authenticated-app'

import { AuthService } from '../../services/API';

const { EMAIL, PASSWORD } = process.env
export default {
  title: 'AuthenticatedApp',
  component: AuthenticatedApp,
};


export const PageTokenPassed = () => { 
  const [token, setToken] = useState('');
  AuthService.login(EMAIL, PASSWORD).then((data) => {
    setToken(data);
    console.log(token)
  })
  return <AuthenticatedApp token={token}/>
}

export const PageNoTokenPassed = () => { 
  return <AuthenticatedApp token={''}/>
}
