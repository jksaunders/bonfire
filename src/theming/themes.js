import * as colors from "./colors";
import * as palette from "./palette";

const LIGHT = {
  [palette.PRIMARY_BUTTON]: colors.blue
};

const DARK = {
  [palette.PRIMARY_BUTTON]: colors.black
};

const themes = {
  light: LIGHT,
  dark: DARK
};

export default themes;