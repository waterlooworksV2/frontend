import React, {useReducer} from 'react';

import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

import {TokenSetStore} from '../../App'
import UnauthenticatedApp from '../unauthenticated-app'


export default {
  title: 'UnauthenticatedApp',
  component: UnauthenticatedApp,
};


export const Page = () => { 
  return <TokenSetStore.Provider value={action('LoginClick')}>
    <UnauthenticatedApp /> 
  </TokenSetStore.Provider>
}
