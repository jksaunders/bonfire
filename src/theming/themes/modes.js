import * as Palette from "../palette";
import * as Colors from "../colors";
import { ThemeConstants } from "./constants";

const LIGHT = {
  [Palette.PRIMARY_BUTTON]: Colors.blue,
  [Palette.SECONDARY_BUTTON]: Colors.white,
  [Palette.PRIMARY_TEXT]: Colors.white,
  [Palette.SECONDARY_TEXT]: Colors.black,
};

const DARK = {
  [Palette.PRIMARY_BUTTON]: Colors.black,
  [Palette.SECONDARY_BUTTON]: Colors.white,
  [Palette.PRIMARY_TEXT]: Colors.white,
  [Palette.SECONDARY_TEXT]: Colors.black,
};

const GREEK = {
  [Palette.PRIMARY_BUTTON]: Colors.olive,
  [Palette.SECONDARY_BUTTON]: Colors.cotton,
  [Palette.PRIMARY_TEXT]: Colors.earth,
  [Palette.SECONDARY_TEXT]: Colors.earth,
};

export default {
  [ThemeConstants.mode.values.light]: LIGHT,
  [ThemeConstants.mode.values.dark]: DARK,
  [ThemeConstants.mode.values.greek]: GREEK,
};