import * as Palette from "../palette";
import * as Colors from "../colors";
import { ThemeConstants } from "./constants";

const LIGHT = {
  [Palette.PRIMARY_BUTTON]: Colors.blue
};

const DARK = {
  [Palette.PRIMARY_BUTTON]: Colors.black
};

export default {
  [ThemeConstants.mode.values.light]: LIGHT,
  [ThemeConstants.mode.values.dark]: DARK
};