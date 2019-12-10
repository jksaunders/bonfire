import * as Palette from '../palette';
import * as Sizes from '../sizing';
import { ThemeConstants } from './constants';

const COMPACT = {
  [Palette.MARGINS]: Sizes.s
};

const COZY = {
  [Palette.MARGINS]: Sizes.m
};

export default {
  [ThemeConstants.layout.values.compact]: COMPACT,
  [ThemeConstants.layout.values.cozy]: COZY
};