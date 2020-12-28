import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { cssRule, sizesObjectToCss } from '../../utils/CssRule/CssRule';
import { ResponsiveProps } from '../../utils/ResponsiveProps';
import { AlignCombinations, getAlignmentCss } from './AlignProp';
import { getColumnsRowsCss } from './ColumnsRowsProp';
import LayoutContext from './LayoutContext';

export interface BaseLayoutProps {
  align?: AlignCombinations;
  column?: boolean;
  columns?: string;
  full?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
  gap?: boolean | string;
  padding?: string;
  row?: boolean;
  rows?: string;
}

export type LayoutProps = ResponsiveProps<BaseLayoutProps>;

const StyledLayout = styled.div<LayoutProps>`
  display: grid;
  ${cssRule<LayoutProps>('padding')}

  ${/* align */ ''}
  ${getAlignmentCss}
  
  ${/* size */ ''}
  ${cssRule<LayoutProps>('full', 'height', '100%')}
  ${cssRule<LayoutProps>('full', 'width', '100%')}
  ${cssRule<LayoutProps>('fullHeight', 'height', '100%')}
  ${cssRule<LayoutProps>('fullWidth', 'width', '100%')}
  
  ${/* grid */ ''}
  ${cssRule<LayoutProps>('gap', 'grid-gap')}
  ${cssRule<LayoutProps>(
    ['column', 'grid-auto-flow', 'row'],
    ['row', 'grid-auto-flow', 'column']
  )}
  ${getColumnsRowsCss('columns')}
  ${getColumnsRowsCss('rows')}
`;

export const Layout: FC<LayoutProps> = ({
  children,
  gap: gapProp,
  ...rest
}) => {
  const layoutContext = useContext(LayoutContext);

  const gap = gapProp === true ? layoutContext.defaultGap : gapProp;

  return (
    <StyledLayout gap={gap} {...rest}>
      {children}
    </StyledLayout>
  );
};
