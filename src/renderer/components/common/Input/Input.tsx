import React from 'react';

import { css, SerializedStyles, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

type InputSize = 'sm' | 'md' | 'lg';
type InputVariant = 'outline' | 'filled';

export type InputProps = {
  type?: React.HTMLInputTypeAttribute;
  size?: InputSize;
  variant?: InputVariant;
  placeholder?: string;
  isError?: boolean;
  style?: React.CSSProperties;
};

export default function Input({
  type = 'text',
  size = 'md',
  variant = 'outline',
  placeholder,
  isError = false,
  style,
}: InputProps) {
  const theme = useTheme();

  const sizes: Record<InputSize, SerializedStyles> = {
    sm: css`
      border-radius: ${theme.radius.sm};
      padding: ${`${theme.space[1.5]} ${theme.space[2.5]}`};
      font-size: ${theme.fontSize.sm};
    `,
    md: css`
      border-radius: ${theme.radius.md};
      padding: ${`${theme.space[2]} ${theme.space[3]}`};
      font-size: ${theme.fontSize.md};
    `,
    lg: css`
      border-radius: ${theme.radius.md};
      padding: ${`${theme.space[3]} ${theme.space[4]}`};
      font-size: ${theme.fontSize.lg};
    `,
  };

  const variants: Record<InputVariant, SerializedStyles> = {
    outline: css`
      border-color: ${theme.color.gray[300]};
      &:hover {
        border-color: ${theme.color.gray[400]};
      }
    `,
    filled: css`
      background-color: ${theme.color.gray[50]};
      border-color: ${theme.color.gray[50]};

      &:hover {
        background-color: ${theme.color.gray[100]};
      }

      &:focus {
        background-color: white;
      }
    `,
  };

  const error =
    isError &&
    css`
      border: 2px solid ${theme.color.danger};
    `;

  return (
    <DefaultInput
      type={type}
      placeholder={placeholder}
      css={[sizes[size], variants[variant], error]}
      style={style}
    />
  );
}

const DefaultInput = styled.input`
  outline: 2px solid transparent;
  border-width: 1px;
  border-style: solid;
  transition: all 0.2s ease-out;
  &::placeholder {
    color: ${({ theme }) => theme.color.gray[400]};
  }
  &:focus {
    outline: 2px solid ${({ theme }) => theme.color.info};
  }
`;
