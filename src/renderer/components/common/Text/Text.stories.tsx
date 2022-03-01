import React from 'react';

import { withKnobs, boolean, number } from '@storybook/addon-knobs';

import Text, { TextProps } from './Text';

export default {
  title: 'components/Text',
  component: Text,
  decorators: [withKnobs], // 애드온 적용
  argTypes: {
    size: { options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl'], control: { type: 'radio' } },
    strong: { control: 'boolean' },
    underline: { control: 'boolean' },
    delete: { control: 'boolean' },
    color: { control: 'color' },
  },
};

export function Default() {
  const size = number('size', 12);
  const strong = boolean('strong', false);

  return (
    <Text size={size} strong={strong}>
      Text
    </Text>
  );
}

export function Second(args: TextProps) {
  // eslint-disable-next-line react/destructuring-assignment
  return (
    <>
      <Text {...args}>text</Text>
      <Text {...args}>text</Text>
    </>
  );
}
