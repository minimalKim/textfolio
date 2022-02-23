/* eslint-disable no-unused-expressions */
import React, { useRef, useState, useEffect } from 'react';

import { css } from '@emotion/react';

export type ImageProps = {
  src: string;
  alt: string;
  placeholder?: string;
  width: number;
  height: number;
  threshold?: number;
  lazy?: boolean;
  mode?: 'cover' | 'fill' | 'contain';
  block?: boolean;
  style: any;
};

// 컴포넌트가 새로 생성되어도 재생성 되지 않도록 전역적으로 작성
let observer: IntersectionObserver | null = null;
const LOAD_IMG_EVENT_TYPE = 'loadImage';

const onIntersection = (entries: any[], io: { unobserve: (arg0: any) => void }) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
    }
  });
};

export default function Image({
  src = `https://picsum.photos/150`,
  alt,
  width,
  height,
  placeholder = `https://via.placeholder.com/150`,
  threshold = 0.3,
  lazy,
  mode = 'cover',
  block,
  style: styleProps,
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!lazy) {
      setLoaded(true);
    }

    const handleLoadImage = () => setLoaded(true);
    const imageEl = imgRef.current as unknown as HTMLImageElement;
    imageEl && imageEl.addEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);

    return () => {
      imageEl && imageEl.removeEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
    };
  }, [lazy]);

  useEffect(() => {
    if (!lazy) return;
    if (!observer) {
      observer = new IntersectionObserver(onIntersection, { threshold });
    }
    imgRef.current && observer.observe(imgRef.current);
  }, [lazy, threshold]);

  const style = css`
    display: ${block && 'block'};
    width: ${width && `${width}px`};
    height: ${height && `${height}px`};
    object-fit: ${mode};
    ${styleProps};
  `;
  return <img ref={imgRef} src={loaded ? src : placeholder} alt={alt} css={style} />;
}
