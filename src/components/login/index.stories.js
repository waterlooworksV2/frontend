import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

import Login from '../login'

export default {
  title: 'Login',
  component: Login,
};

export const DefaultLogin = () => <Login />;
