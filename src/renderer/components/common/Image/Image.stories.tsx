import React from 'react';

import { ThemeProvider } from '@emotion/react';

import theme from '../../../styles/theme';
import Image, { ImageProps } from './Image';

export default {
  title: 'components/Image',
  component: Image,
};

export function Default(args: ImageProps) {
  return (
    <ThemeProvider theme={theme}>
      <Image {...args} />
    </ThemeProvider>
  );
}
