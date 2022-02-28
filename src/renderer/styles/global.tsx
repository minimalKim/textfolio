import React from 'react';

import { css, Global } from '@emotion/react';

const style = css`
  html,
  body,
  div,
  p,
  span,
  strong,
  b,
  em,
  iframe,
  pre,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  img,
  dl,
  dt,
  dd,
  fieldset,
  form,
  legend,
  label,
  table,
  caption,
  thead,
  tbody,
  tfoot,
  tr,
  th,
  td,
  ul,
  ol,
  li,
  a,
  input,
  select,
  textarea {
    margin: 0;
    padding: 0;
    border: 0 none;
  }
  body {
    background-color: #f7fafc;
    line-height: 1;
  }
  ul,
  ol,
  li {
    list-style: none;
  }
  em,
  address {
    font-style: normal;
  }
  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-style: solid;
    &::-ms-clear {
      display: none;
    }
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  img {
    border: 0 none;
    font-size: 0;
    line-height: 0;
  }
  sup {
    position: relative;
    top: 2px;
    font-size: 11px;
    line-height: 100%;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  caption {
    overflow: hidden;
    width: 0;
    height: 0;
    font-size: 0;
    line-height: 0;
  }
  th,
  td {
    vertical-align: middle; /* white-space: nowrap */
  }
  a {
    color: #171923;
    text-decoration: none;
    line-height: 1;
  }
  a:hover,
  a:focus,
  a:active {
    text-decoration: underline;
  }
  a:visited {
    color: #171923;
  }
  *,
  html {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  body {
    background-color: #f7fafc;
  }
`;

export default function GlobalStyle() {
  return <Global styles={style} />;
}
