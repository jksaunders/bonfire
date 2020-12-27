import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { cssRule } from '../../utils/CssRule/CssRule';
import { ResponsiveProps } from '../../utils/ResponsiveProps';
import { AlignCombinations, getAlignmentCss } from './AlignProp';
import LayoutContext from './LayoutContext';

export interface BaseLayoutProps {
  align?: AlignCombinations;
  column?: boolean;
  full?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
  gap?: boolean | string;
  row?: boolean;
}

export type LayoutProps = ResponsiveProps<BaseLayoutProps>;

const StyledLayout = styled.div<LayoutProps>`
  display: grid;

  ${/* align */ ''}
  ${cssRule<LayoutProps>('align', null, (props) =>
    typeof props.align === 'string' ? getAlignmentCss(props.align) : ''
  )}

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
