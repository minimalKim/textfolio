import React from 'react';

import { ThemeProvider } from '@emotion/react';

import theme from '../../../styles/theme';
import Card, { CardProps } from './Card';

export default {
  title: 'components/Card',
  component: Card,
};

export function Default(args: CardProps) {
  return (
    <ThemeProvider theme={theme}>
      <Card {...args} style={{ height: '180px' }}>
        This is a Card
      </Card>
    </ThemeProvider>
  );
}
