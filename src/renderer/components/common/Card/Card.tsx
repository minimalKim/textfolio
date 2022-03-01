import React, { PropsWithChildren } from 'react';

import { css, useTheme } from '@emotion/react';

import { Radius, Size, Space } from '../../../styles/emotion';

export type CardProps = React.HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    radius?: keyof Radius;
    padding?: keyof Space;
    maxW?: keyof Size;
    bgColor?: string;
  }>;

export default function Card({
  children,
  radius = 'lg',
  padding = 6,
  bgColor,
  maxW = 'sm',
  ...rest
}: CardProps) {
  const theme = useTheme();

  const style = css`
    border-radius: ${theme.radius[radius]};
    padding: ${theme.space[padding]};
    background-color: ${bgColor || theme.color.gray[50]};
    max-width: ${theme.size[maxW]};
  `;

  return (
    <div css={style} {...rest}>
      {children}
    </div>
  );
}
