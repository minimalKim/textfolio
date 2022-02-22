import React from 'react';

import { css } from '@emotion/core';

import Button from './Button';

export default {
  title: 'components/Button', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Button, // 어떤 컴포넌트를 문서화 할지 명시
  argTypes: {
    theme: {},
  },
};

export const button = () => {
  return <Button>Button</Button>;
};

button.story = {
  name: 'Default',
};

export const primaryButton = () => {
  return <Button>Primary</Button>;
};

export const secondaryButton = () => {
  return <Button theme='secondary'>SECONDARY</Button>;
};

export const tertiaryButton = () => {
  return <Button theme='tertiary'>TERTIARY</Button>;
};

const buttonWrapper = css`
  .description {
    margin-bottom: 0.5rem;
  }
  & > div + div {
    margin-top: 2rem;
  }
`;

export const sizes = () => {
  return (
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
  );
};

export const disabled = () => {
  return (
    <div css={buttonWrapper}>
      <div>
        <Button disabled>PRIMARY</Button>
      </div>
      <div>
        <Button disabled theme='secondary'>
          SECONDARY
        </Button>
      </div>
      <div>
        <Button disabled theme='tertiary'>
          TERTIARY
        </Button>
      </div>
    </div>
  );
};
