import { isArray } from "util";

const processCssRule = (prop, key, calculateValue) => (props) => {
  if (props == null || prop == null || !props[prop]) {
    return null;
  }

  const cssKey = key || prop;
  let value;
  if (typeof calculateValue === "string") {
    value = calculateValue;
  } else if (typeof calculateValue === "function") {
    value = calculateValue(props);
  } else {
    value = props[prop];
  }

  return `${cssKey}: ${value};`;
};

export const css = (...args) => {
  if (isArray(args[0])) {
    const array = args[0];
    return props => {
      for (let i = 0; i < array.length; i += 1) {
        const result = processCssRule(array[i][0], array[i][1], array[i][2])(props);
        if (result != null) {
          return result;
        }
      }
      return null;
    };
  }
  return processCssRule(args[0], args[1], args[2]);
};