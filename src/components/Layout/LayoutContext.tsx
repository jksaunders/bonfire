import { createContext } from 'react';

export interface LayoutContextProps {
  defaultGap?: string;
}

const LayoutContext = createContext<LayoutContextProps>({});

export default LayoutContext;
