import '@emotion/react';

export type FontSize = {
  xs: '0.75rem';
  sm: '0.875rem';
  md: '1rem';
  lg: '1.125rem';
  xl: '1.25rem';
  '2xl': '1.5rem';
  '3xl': '1.875rem';
  '4xl': '2.25rem';
  '5xl': '3rem';
  '6xl': '3.75rem';
  '7xl': '4.5rem';
  '8xl': '6rem';
  '9xl': '8rem';
};

export type Radius = {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
};

export type Space = {
  px: string;
  0.5: string;
  1: string;
  1.5: string;
  2: string;
  2.5: string;
  3: string;
  3.5: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  12: string;
  14: string;
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
  36: string;
  40: string;
  44: string;
  48: string;
  52: string;
  56: string;
  60: string;
  64: string;
  72: string;
  80: string;
  96: string;
};

export type Size = {
  max: string;
  min: string;
  full: string;
  '3xs': string;
  '2xs': string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
  '7xl': string;
  '8xl': string;
  container: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
};

declare module '@emotion/react' {
  export interface Theme {
    fontSize: FontSize;
    color: {
      gray: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      primary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
      };
      success: string;
      danger: string;
      info: string;
    };
    space: Space;
    radius: Radius;
    size: Size;
    mq: {
      laptop: string;
      tablet: string;
      mobile: string;
    };
  }
}
