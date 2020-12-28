import { sizesObjectToCss } from '../../utils/CssRule/CssRule';
import { LayoutProps } from './Layout';

export const getColumnsRowsCss = (direction: 'columns' | 'rows') => (
  props: LayoutProps
): string => {
  return sizesObjectToCss(props[direction], (value) => {
    const key =
      value.includes(' ') || value.includes('repeat')
        ? `grid-template-${direction}`
        : `grid-auto-${direction}`;
    return `${key}: ${value};`;
  });
};
