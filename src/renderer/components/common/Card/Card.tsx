import React, { ReactNode } from 'react';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { Radius, Size, Space } from '../../../styles/emotion';

export type CardProps = {
  children: React.ReactNode;
  radius?: keyof Radius;
  padding?: keyof Space;
  maxW?: keyof Size;
  bgColor?: string;
  style: any;
};

export default function Card({
  children,
  radius = 'lg',
  padding = 6,
  bgColor,
  maxW = 'sm',
  style: _style,
}: CardProps) {
  const theme = useTheme();

  const style = css`
    border-radius: ${theme.radius[radius]};
    padding: ${theme.space[padding]};
    background-color: ${bgColor || theme.color.gray[50]};
    max-width: ${theme.size[maxW]};
    display: flex;
    justify-content: center;
  `;

  return (
    <div css={style} style={{ ..._style }}>
      {children}
    </div>
  );
}
