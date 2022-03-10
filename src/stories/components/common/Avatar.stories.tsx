import React from 'react';

import { ThemeProvider } from '@emotion/react';

import Avatar, { AvatarProps } from '../../../renderer/components/common/Avatar';
import theme from '../../../renderer/styles/theme';

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
