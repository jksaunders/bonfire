import styledTheme from "styled-theming";
import themes from "./themes";

const MODES = [
  "light",
  "dark"
];

// const LAYOUTS = [
//   "compact",
//   "cozy"
// ];

// const ZOOM = [
//   "normal",
//   "big",
//   "bigger"
// ];

// export const THEME_CONSTANTS = {
//   mode: "mode",
//   layout: "layout",
//   zoom: "zoom"
// };

const themeKeyMap = {
  mode: MODES
};

export const theme = (value, themeKey) => {
  const themesForValue = {};
  themeKeyMap[themeKey].forEach((option) => {
    themesForValue[option] = themes[themeKey][option][value];
  });
  return styledTheme(themeKey, themesForValue);
};