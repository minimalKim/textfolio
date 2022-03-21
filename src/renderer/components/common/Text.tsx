/* eslint-disable no-param-reassign */
import React, { PropsWithChildren } from 'react';

import { useTheme } from '@emotion/react';

export type TextProps = PropsWithChildren<{
  size?: number | string;
  block?: boolean;
  paragraph?: boolean;
  strong?: boolean;
  underline?: boolean;
  delete?: boolean;
  mark?: boolean;
  code?: boolean;
  color?: string;
  style?: React.CSSProperties;
}>;

export default function Text({
  children,
  size,
  block,
  paragraph,
  strong,
  underline,
  delete: del,
  mark,
  code,
  color = '#171923',
  style,
}: TextProps) {
  // eslint-disable-next-line no-nested-ternary
  const Tag = block ? 'div' : paragraph ? 'p' : 'span';
  const theme = useTheme();

  // eslint-disable-next-line default-case
  switch (size) {
    case 'xs':
      size = '0.75rem';
      break;
    case 'sm':
      size = '0.875rem';
      break;
    case 'md':
      size = '1rem';
      break;
    case 'lg':
      size = '1.125rem';
      break;
    case 'xl':
      size = '1.25rem';
      break;
    case '2xl':
      size = '1.5rem';
      break;
    case '3xl':
      size = '1.875rem';
      break;
  }

  const fontStyle = {
    fontWeight: strong ? 'bold' : undefined,
    fontSize: size,
    textDecoration: underline ? 'underline' : undefined,
    color: color === 'danger' ? theme.color.danger : undefined,
  };

  if (del) {
    children = <del>{children}</del>;
  }

  if (mark) {
    children = <mark>{children}</mark>;
  }

  if (code) {
    children = <code>{children}</code>;
  }

  // eslint-disable-next-line consistent-return
  return <Tag style={{ ...fontStyle, ...style }}>{children}</Tag>;
}
