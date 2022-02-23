import React from 'react';

import { css, useTheme } from '@emotion/react';

export type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  mode: 'cover' | 'fill' | 'contain';
};

export default function Image({
  src = `https://picsum.photos/150`,
  alt,
  width,
  height,
  mode = 'cover',
}: ImageProps) {
  const style = css`
    width: ${width}px;
    height: ${height}px;
    object-fit: ${mode};
  `;
  return <img src={src} alt={alt} css={style} />;
}
