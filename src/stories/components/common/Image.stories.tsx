/* eslint-disable react/destructuring-assignment */
import React from 'react';

import { ThemeProvider } from '@emotion/react';

import Image, { ImageProps } from '../../../renderer/components/common/Image';
import theme from '../../../renderer/styles/theme';

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

export function Lazy(args: ImageProps) {
  return (
    <ThemeProvider theme={theme}>
      {Array.from(new Array(20), (_, k) => k).map((i) => (
        <Image key={i} {...args} lazy threshold={0.5} block />
      ))}
    </ThemeProvider>
  );
}
