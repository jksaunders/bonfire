import modes from './modes';
import layouts from './layouts';
import { ThemeConstants as CONSTANTS } from './constants';

export const ThemeConstants = CONSTANTS;

export default {
  [CONSTANTS.mode.key]: modes,
  [CONSTANTS.layout.key]: layouts
};