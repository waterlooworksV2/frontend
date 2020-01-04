import React, {useReducer} from 'react';

import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

import {TokenSetStore} from '../../App'
import Login from '../login'

export default {
  title: 'UnauthenticatedApp/Login',
  component: Login,
};


export const DefaultLogin = () => { 
  return <TokenSetStore.Provider value={action('LoginClick')}>
    <Login />
  </TokenSetStore.Provider>
}
