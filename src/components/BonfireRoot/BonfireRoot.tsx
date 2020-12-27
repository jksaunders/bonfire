import React, { FC } from 'react';
import LayoutContext, { LayoutContextProps } from '../Layout/LayoutContext';

interface BonfireRootProps {
  layout?: LayoutContextProps;
}
export const BonfireRoot: FC<BonfireRootProps> = ({
  children,
  layout = {},
}) => (
  <LayoutContext.Provider value={layout}>{children}</LayoutContext.Provider>
);
