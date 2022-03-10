import React from 'react';

import { ThemeProvider, useTheme } from '@emotion/react';

import Card, { CardProps } from '../../../renderer/components/common/Card';
import theme from '../../../renderer/styles/theme';

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
