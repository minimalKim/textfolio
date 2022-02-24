import React from 'react';

import { css, Global } from '@emotion/react';

const style = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default function GlobalStyle() {
  return <Global styles={style} />;
}
