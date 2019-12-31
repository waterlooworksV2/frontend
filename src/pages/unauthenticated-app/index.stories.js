import React, {useReducer} from 'react';

import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

import {TokenStore} from '../../App'
import UnauthenticatedApp from '../unauthenticated-app'


export default {
  title: 'UnauthenticatedApp',
  component: UnauthenticatedApp,
};


export const Page = () => { 
  return <TokenStore.Provider value={action('LoginClick')}>
    <UnauthenticatedApp /> 
  </TokenStore.Provider>
}
