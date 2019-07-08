import theme from "styled-theming";
import themes from "./themes";

const MODES = [
  "light",
  "dark"
];

const themeKeyMap = {
  mode: MODES
};

const getThemedValue = (value, themeKey = "mode") => theme(themeKey, themeKeyMap[themeKey].reduce((acc, cur) => ({ ...acc, [cur]: themes[cur][value] }), {}));

export default getThemedValue;