import React from 'react';

import { css, SerializedStyles, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

type InputSize = 'sm' | 'md' | 'lg';
type InputVariant = 'outline' | 'filled';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: InputSize;
  variant?: InputVariant;
  isError?: boolean;
};

export default function Input({ size = 'md', variant = 'outline', isError = false, ...rest }: InputProps) {
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
      background-color: ${theme.color.gray[100]};
      border-color: ${theme.color.gray[100]};
      &:hover {
        background-color: ${theme.color.gray[200]};
      }
      &:focus {
        background-color: white;
      }
    `,
  };

  const error =
    isError &&
    css`
      border: 1px solid ${theme.color.danger};
      outline: 1px solid ${theme.color.danger};
    `;

  return <DefaultInput css={[sizes[size], variants[variant], error]} {...rest} />;
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
