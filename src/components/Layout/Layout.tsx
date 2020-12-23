import React, { FC } from 'react';
import styled from 'styled-components';
import { ResponsiveProps } from '../../utils/ResponsiveProps';
import { AlignCombinations } from './AlignProp';

interface BaseLayoutProps {
  align?: AlignCombinations;
  column?: boolean;
  row?: boolean;
}

export type LayoutProps = ResponsiveProps<BaseLayoutProps>;

const StyledLayout = styled.div<LayoutProps>``;

export const Layout: FC<LayoutProps> = ({ children, ...rest }) => (
  <StyledLayout {...rest}>{children}</StyledLayout>
);
