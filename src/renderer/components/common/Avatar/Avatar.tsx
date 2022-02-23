/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import ImageComponent from '../Image/Image';

export type AvatarProps = {
  src: string;
  alt: string;
  size?: number;
  threshold: number;
  shape: 'circle' | 'round' | 'square';
};

type AvatarWrapperProps = {
  size?: number;
  shape: 'circle' | 'round' | 'square';
};

const ShapeToCssValue = {
  circle: '50%',
  round: '4px',
  square: 0,
};

export default function Avatar({ threshold = 0.4, src, alt, size = 140, shape = 'circle' }: AvatarProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
  }, [src]);

  return (
    <AvatarWrapper size={size} shape={shape}>
      <ImageComponent
        src={src}
        alt={alt}
        width={size}
        height={size}
        threshold={threshold}
        mode='cover'
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </AvatarWrapper>
  );
}

const AvatarWrapper = styled.div<AvatarWrapperProps>`
  position: relative;
  display: inline-block;
  border: 1px solid #dadada;
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  overflow: hidden;
  height: ${({ size }) => (size ? `${size - 2}px` : undefined)};
  width: ${({ size }) => (size ? `${size - 2}px` : undefined)};
  background-color: #eee;

  > img {
    transition: opacity 0.2s ease-out;
  }
`;
