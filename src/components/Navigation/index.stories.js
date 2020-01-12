import React from 'react';
import { action } from '@storybook/addon-actions';
import '@storybook/addon-console';
import Navbar from '../navbar'

export default {
  title: 'Navbar',
  component: Navbar,
};

export const Default = () => <Navbar />