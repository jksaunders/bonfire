import styledTheme from "styled-theming";
import themes, { ThemeConstants } from "./themes";

const themeKeyMap = {
  [ThemeConstants.mode.key]: Object.keys(ThemeConstants.mode.values),
  [ThemeConstants.layout.key]: Object.keys(ThemeConstants.layout.values),
  [ThemeConstants.zoom.key]: Object.keys(ThemeConstants.zoom.values)
};

export const theme = (value, themeKey) => {
  const themesForValue = {};
  themeKeyMap[themeKey].forEach((option) => {
    themesForValue[option] = themes[themeKey][option][value];
  });
  return styledTheme(themeKey, themesForValue);
};

export const themeVariant = (
  propName,
  themeVariantKey,
  variantsMap,
  themeKey
) => props => theme(variantsMap[props[propName]][themeVariantKey], themeKey);