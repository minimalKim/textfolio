/* eslint-disable no-param-reassign */
import React from 'react';

export type TextProps = {
  children: React.ReactNode;
  size?: number | string;
  block?: boolean;
  paragraph?: boolean;
  strong?: boolean;
  underline?: boolean;
  delete?: boolean;
  mark?: boolean;
  code?: boolean;
  color?: string;
};

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
}: TextProps) {
  // eslint-disable-next-line no-nested-ternary
  const Tag = block ? 'div' : paragraph ? 'p' : 'span';

  // eslint-disable-next-line default-case
  switch (size) {
    case 'sm':
      size = '14px';
      break;
    case 'md':
      size = '16px';
      break;
    case 'lg':
      size = '18px';
      break;
    case 'xl':
      size = '20px';
      break;
    case '2xl':
      size = '24px';
      break;
    case '3xl':
      size = '30px';
      break;
  }

  const fontStyle = {
    fontWeight: strong ? 'bold' : undefined,
    fontSize: size,
    textDecoration: underline ? 'underline' : undefined,
    color,
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
  return <Tag style={{ ...fontStyle }}>{children}</Tag>;
}
