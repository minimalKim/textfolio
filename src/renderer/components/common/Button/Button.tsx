import React from 'react';

import { css } from '@emotion/core';

type ButtonProps = {
  children: React.ReactNode;
  theme?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button({ children, theme = 'primary', size = 'md', width, disabled = false, onClick }: ButtonProps) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button css={[style, themes[theme], sizes[size], { width }]} disabled={disabled} onClick={onClick}>
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
  padding: 0 1rem;
  border-radius: 0.25rem;
  line-height: 1;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
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
  `,
  secondary: css`
    background: #e9ecef;
    color: #343a40;
    &:hover:enabled {
      background: #f1f3f5;
    }
    &:active:enabled {
      background: #dee2e6;
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
