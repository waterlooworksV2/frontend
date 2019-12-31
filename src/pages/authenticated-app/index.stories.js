import React, {useReducer} from 'react';

import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

import AuthenticatedApp from '../authenticated-app'

import {TokenStore} from '../../App'


export default {
  title: 'AuthenticatedApp',
  component: AuthenticatedApp,
};


export const PageTokenPassed = () => { 
  return AuthenticatedApp('tokensample' + '1234567890')
}

export const PageNoTokenPassed = () => { 
  return AuthenticatedApp()
}
