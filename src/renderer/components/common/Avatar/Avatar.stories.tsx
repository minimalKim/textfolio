import React from 'react';

import { ThemeProvider } from '@emotion/react';

import theme from '../../../styles/theme';
import Avatar, { AvatarProps } from './Avatar';

export default {
  title: 'components/Avatar',
  component: Avatar,
};

export function Default(args: AvatarProps) {
  return (
    <ThemeProvider theme={theme}>
      <Avatar {...args} size={140} src='https://picsum.photos/150' />
    </ThemeProvider>
  );
}
