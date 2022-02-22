import React from 'react';

import { css } from '@emotion/core';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

const style = css`
  outline: none;
  border: none;
  box-sizing: border-box;
  height: 2rem;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  background: #f36031;
  color: white;
  border-radius: 0.25rem;
  line-height: 1;
  font-weight: 600;
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  &:hover {
    background: #f1531f;
  }
  &:active {
    background: #e6410c;
  }
`;

function Button({ children, onClick }: ButtonProps) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button css={style} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
