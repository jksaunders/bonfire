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
    if (isArray(args[0][0])) {
      throw new Error("`css()` takes in positional arguments, not an array of arguments: eg. `css([], [], [])`, not `css([[], [], []])`");
    }

    return props => {
      for (let i = 0; i < args.length; i += 1) {
        const result = processCssRule(args[i][0], args[i][1], args[i][2])(props);
        if (result != null) {
          return result;
        }
      }
      return null;
    };
  }
  return processCssRule(args[0], args[1], args[2]);
};

export const cssBackground = ({ background: backgroundProp }) => {
  if (backgroundProp == null) {
    return "";
  }

  if (typeof backgroundProp === "string") {
    if (backgroundProp[0] === "#" || backgroundProp.includes("hsl") || backgroundProp.includes("rgb")) {
      return `background-color: ${backgroundProp};`;
    }
  }

  return "";
};