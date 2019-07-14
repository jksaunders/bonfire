import * as Palette from "../palette";
import * as Colors from "../colors";
import { ThemeConstants } from "./constants";

const LIGHT = {
  [Palette.PRIMARY_BUTTON]: Colors.blue,
  [Palette.SECONDARY_BUTTON]: Colors.white,
  [Palette.PRIMARY_TEXT]: Colors.white,
  [Palette.SECONDARY_TEXT]: Colors.black,
  [Palette.H1]: Colors.black,
  [Palette.H2]: Colors.black,
  [Palette.H3]: Colors.black,
  [Palette.H4]: Colors.black,
  [Palette.H5]: Colors.black,
  [Palette.H6]: Colors.black,
  [Palette.SUBTITLE1]: Colors.lightGrey,
  [Palette.SUBTITLE2]: Colors.lightGrey,
  [Palette.BODY1]: Colors.black,
  [Palette.BODY2]: Colors.lightGrey,
  [Palette.CAPTION]: Colors.black,
  [Palette.BUTTON_TEXT]: Colors.black,
  [Palette.OVERLINE]: Colors.black
};

const DARK = {
  [Palette.PRIMARY_BUTTON]: Colors.black,
  [Palette.SECONDARY_BUTTON]: Colors.white,
  [Palette.PRIMARY_TEXT]: Colors.white,
  [Palette.SECONDARY_TEXT]: Colors.black,
  [Palette.H1]: Colors.black,
  [Palette.H2]: Colors.black,
  [Palette.H3]: Colors.black,
  [Palette.H4]: Colors.black,
  [Palette.H5]: Colors.black,
  [Palette.H6]: Colors.black,
  [Palette.SUBTITLE1]: Colors.lightGrey,
  [Palette.SUBTITLE2]: Colors.lightGrey,
  [Palette.BODY1]: Colors.black,
  [Palette.BODY2]: Colors.lightGrey,
  [Palette.CAPTION]: Colors.black,
  [Palette.BUTTON_TEXT]: Colors.black,
  [Palette.OVERLINE]: Colors.black
};

const GREEK = {
  [Palette.PRIMARY_BUTTON]: Colors.olive,
  [Palette.SECONDARY_BUTTON]: Colors.cotton,
  [Palette.PRIMARY_TEXT]: Colors.cotton,
  [Palette.SECONDARY_TEXT]: Colors.earth,
  [Palette.H1]: Colors.black,
  [Palette.H2]: Colors.black,
  [Palette.H3]: Colors.black,
  [Palette.H4]: Colors.black,
  [Palette.H5]: Colors.black,
  [Palette.H6]: Colors.black,
  [Palette.SUBTITLE1]: Colors.lightGrey,
  [Palette.SUBTITLE2]: Colors.lightGrey,
  [Palette.BODY1]: Colors.black,
  [Palette.BODY2]: Colors.lightGrey,
  [Palette.CAPTION]: Colors.black,
  [Palette.BUTTON_TEXT]: Colors.black,
  [Palette.OVERLINE]: Colors.black
};

export default {
  [ThemeConstants.mode.values.light]: LIGHT,
  [ThemeConstants.mode.values.dark]: DARK,
  [ThemeConstants.mode.values.greek]: GREEK,
};