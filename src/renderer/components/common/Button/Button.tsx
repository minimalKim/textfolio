// /** @jsxImportSource @emotion/react */
import React, { PropsWithChildren } from 'react';

import { css } from '@emotion/react';

type ButtonProps = PropsWithChildren<{
  theme?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}>;

function Button({
  children,
  theme = 'primary',
  size = 'md',
  width,
  disabled = false,
  onClick,
  style: styleProps,
}: ButtonProps) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      css={[style, themes[theme], sizes[size], { width }]}
      disabled={disabled}
      onClick={onClick}
      style={styleProps}
    >
      {children}
    </button>
  );
}

const style = css`
  outline: none;
  border: none;
  box-sizing: border-box;
  height: 2rem;
  font-size: 0.875rem;
  padding: 0.875rem;
  border-radius: 0.4rem;
  line-height: 1;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-out;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background: #d4d4d4;
    color: white;
  }
`;

const themes = {
  primary: css`
    background: #f36031;
    color: white;
    &:hover:enabled {
      background: #f1531f;
    }
    &:active:enabled {
      background: #e6410c;
    }
    &:focus {
      outline: 4px solid rgba(243, 96, 49, 0.2);
    }
  `,
  secondary: css`
    background: #edf2f7;
    color: #718096;
    &:hover:enabled {
      background: #e2e8f0;
    }
    &:active:enabled {
      background: #cbd5e0;
    }
    &:focus {
      outline: 4px solid rgba(203, 213, 224, 0.2);
    }
  `,
  tertiary: css`
    background: none;
    color: #20c997;
    &:hover:enabled {
      background: #e6fcf5;
    }
    &:active:enabled {
      background: #c3fae8;
    }
  `,
};

const sizes = {
  sm: css`
    height: 1.75rem;
    font-size: 0.75rem;
    padding: 0 0.875rem;
  `,
  md: css`
    height: 2.5rem;
    font-size: 1rem;
    padding: 0 1rem;
  `,
  lg: css`
    height: 3rem;
    font-size: 1.125rem;
    padding: 0 1.5rem;
  `,
};

export default Button;
