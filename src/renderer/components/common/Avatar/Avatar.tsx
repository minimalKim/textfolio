/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import ImageComponent from '../Image/Image';

export type AvatarProps = AvatarWrapperProps & {
  src?: string;
  alt: string;
  threshold: number;
};

type AvatarWrapperProps = {
  size?: number;
  shape: 'circle' | 'round' | 'square';
  style?: React.CSSProperties;
};

const ShapeToCssValue = {
  circle: '50%',
  round: '4px',
  square: 0,
};

export default function Avatar({
  threshold = 0.4,
  src = `https://picsum.photos/150`,
  alt,
  size = 140,
  shape = 'circle',
  style,
}: AvatarProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    const handleImgSrcLoad = () => setLoaded(true);
    image.src = src;
    image.addEventListener('load', handleImgSrcLoad);

    return () => {
      image.removeEventListener('load', handleImgSrcLoad);
    };
  }, [src]);

  return (
    <AvatarWrapper size={size} shape={shape} style={style}>
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
  ${({ style }) => ({ ...style })}

  > img {
    transition: opacity 0.2s ease-out;
  }
`;
