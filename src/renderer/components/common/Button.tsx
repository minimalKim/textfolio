// /** @jsxImportSource @emotion/react */
import React, { PropsWithChildren } from 'react';

import { css, SerializedStyles, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

type ButtonColorTheme = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    colorTheme?: ButtonColorTheme;
    size?: ButtonSize;
    style?: React.CSSProperties;
    link?: boolean;
  }>;

function Button({
  children,
  colorTheme = 'primary',
  size = 'md',
  link,
  style: styleProps,
  ...rest
}: ButtonProps) {
  const theme = useTheme();

  const colorThemes: Record<ButtonColorTheme, SerializedStyles> = {
    primary: css`
      background-color: ${theme.color.primary[500]};
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
      background-color: ${theme.color.gray[100]};
      color: ${theme.color.gray[500]};
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
      color: ${theme.color.primary[500]};
      &:hover:enabled {
        background: ${theme.color.primary[50]};
      }
      &:active:enabled {
        background: ${theme.color.primary[100]};
      }
    `,
  };

  const sizes: Record<ButtonSize, SerializedStyles> = {
    sm: css`
      height: 1.75rem;
      font-size: ${theme.fontSize.xs};
      padding: 0 0.5rem;
      border-radius: ${theme.radius.sm};
    `,
    md: css`
      height: 2.6rem;
      font-size: ${theme.fontSize.md};
      padding: 0 1rem;
      border-radius: ${theme.radius.md};
    `,
    lg: css`
      height: 3.2rem;
      font-size: ${theme.fontSize.lg};
      padding: 0 1.5rem;
      border-radius: ${theme.radius.lg};
    `,
  };

  const linkStyle = link
    ? css`
        height: none;
        height: fit-content;
        padding: 0;
        &:hover:enabled {
          background: transparent;
          color: ${theme.color.primary[600]};
        }
        &:active:enabled {
          background: transparent;
          color: ${theme.color.primary[700]};
        }
      `
    : undefined;

  return (
    // eslint-disable-next-line react/button-has-type
    <DefaultButton css={[colorThemes[colorTheme], sizes[size], linkStyle]} style={styleProps} {...rest}>
      {children}
    </DefaultButton>
  );
}

const DefaultButton = styled.button`
  outline: none;
  border: none;
  box-sizing: border-box;
  height: 2rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  padding: ${({ theme }) => theme.fontSize.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  line-height: 1;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-out;
  cursor: pointer;
  outline: 4px solid transparent;

  &:disabled {
    cursor: not-allowed;
    background: #d4d4d4;
    color: white;
  }
`;

export default Button;
