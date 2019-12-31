import React, {useReducer} from 'react';

import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

import {TokenStore} from '../../App'
import Login from '../login'

export default {
  title: 'UnauthenticatedApp/Login',
  component: Login,
};


export const DefaultLogin = () => { 
  return <TokenStore.Provider value={action('LoginClick')}>
    <Login />
  </TokenStore.Provider>
}
