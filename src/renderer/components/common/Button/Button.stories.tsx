import React from 'react';

import { css } from '@emotion/core';
import { ThemeProvider } from '@emotion/react';

import theme from '../../../styles/theme';
import Button from './Button';

export default {
  title: 'components/Button', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Button, // 어떤 컴포넌트를 문서화 할지 명시
  argTypes: {
    theme: {},
  },
};

export function Default() {
  return (
    <ThemeProvider theme={theme}>
      <Button>Button</Button>
    </ThemeProvider>
  );
}

export function PrimaryButton() {
  return (
    <ThemeProvider theme={theme}>
      <Button>Primary</Button>
    </ThemeProvider>
  );
}

export function SecondaryButton() {
  return (
    <ThemeProvider theme={theme}>
      <Button colorTheme='secondary'>SECONDARY</Button>
    </ThemeProvider>
  );
}

export function TertiaryButton() {
  return (
    <ThemeProvider theme={theme}>
      <Button colorTheme='tertiary'>TERTIARY</Button>
    </ThemeProvider>
  );
}

export function Sizes() {
  return (
    <ThemeProvider theme={theme}>
      <div css={buttonWrapper}>
        <div>
          <div className='description'>Small</div>
          <Button size='sm'>BUTTON</Button>
        </div>
        <div>
          <div className='description'>Medium</div>
          <Button size='md'>BUTTON</Button>
        </div>
        <div>
          <div className='description'>Big</div>
          <Button size='lg'>BUTTON</Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export function Disabled() {
  return (
    <ThemeProvider theme={theme}>
      <div css={buttonWrapper}>
        <div>
          <Button disabled>PRIMARY</Button>
        </div>
        <div>
          <Button disabled colorTheme='secondary'>
            SECONDARY
          </Button>
        </div>
        <div>
          <Button disabled colorTheme='tertiary'>
            TERTIARY
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

const buttonWrapper = css`
  .description {
    margin-bottom: 0.5rem;
  }
  & > div + div {
    margin-top: 2rem;
  }
`;
