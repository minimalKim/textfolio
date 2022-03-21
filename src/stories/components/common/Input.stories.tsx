/* eslint-disable import/no-named-as-default-member */
import React from 'react';

import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';

import Input, { InputProps } from '../../../renderer/components/common/Input';
import theme from '../../../renderer/styles/theme';

export default {
  title: 'components/Input',
  component: Input,
};

export function Default(args: InputProps) {
  return (
    <ThemeProvider theme={theme}>
      <Input {...args} />
    </ThemeProvider>
  );
}

export function Size(args: InputProps) {
  return (
    <ThemeProvider theme={theme}>
      <FlexBox>
        <Input {...args} size='sm' placeholder='sm' />
        <Input {...args} size='md' placeholder='md' />
        <Input {...args} size='lg' placeholder='lg' />
      </FlexBox>
    </ThemeProvider>
  );
}

export function Variant(args: InputProps) {
  return (
    <ThemeProvider theme={theme}>
      <FlexBox>
        <Input {...args} size='md' variant='outline' placeholder='Outline' />
        <Input {...args} size='md' variant='filled' placeholder='Filled' />
      </FlexBox>
    </ThemeProvider>
  );
}

export function Error(args: InputProps) {
  return (
    <ThemeProvider theme={theme}>
      <FlexBox>
        <Input {...args} size='md' />
        <Input {...args} size='md' placeholder='Error' isError />
      </FlexBox>
    </ThemeProvider>
  );
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.size['2xs']};
  & > input + input {
    margin-top: 2rem;
  }
`;
