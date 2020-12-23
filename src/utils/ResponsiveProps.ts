import { SizeProp } from './Sizes';

export type ResponsiveProp<T> = T | SizeProp<T>;
export type ResponsiveProps<T, ResponsiveKeys = keyof T> = {
  [K in keyof T]: K extends ResponsiveKeys
    ? T[K] extends undefined
      ? ResponsiveProp<T[K]>
      : ResponsiveProp<NonNullable<T[K]>>
    : T[K];
};
