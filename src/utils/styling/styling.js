import React from 'react';
import { isArray } from 'util';

export const ResponsizeSizesContext = React.createContext({});

// exported for tests
export class Sizes {
  constructor(value) {
    this.privateValue = value;
  }

  get value() {
    return this.privateValue;
  }
}

export const responsiveCss = (value) => new Sizes(value);

export const processResponsiveCss = (input, transform) => {
  if (input == null) {
    return '';
  }

  if (input instanceof Sizes) {
    let result = '';
    Object.keys(input.value).forEach(k => {
      const split = k.split('-');
      const min = split[0] !== '_' ? split[0] : null;
      const max = split[1] !== '_' ? split[1] : null;
      let signature = '@media all and';
      if (min) {
        signature += ` (min-width: ${split[0]})`;
      }
      if (max) {
        signature += `${min ? ' and' : ''} (max-width: ${split[1]})`;
      }
      result = `${result}\n${signature} { ${transform != null ? transform(input.value[k]) : input.value[k]} }`;
    });
    return result.substring(1);
  }

  if (transform == null) {
    return input;
  }
  return transform(input);
};

// export const responsive = (map = {}) => {

// };

const processCssRule = (prop, key, calculateValue) => (props) => {
  if (props == null || prop == null || !props[prop]) {
    return '';
  }

  const cssKey = key || prop;
  let value;
  if (typeof calculateValue === 'string') {
    value = calculateValue;
  } else if (typeof calculateValue === 'function') {
    value = calculateValue(props);
  } else {
    value = props[prop];
  }

  if (value instanceof Sizes) {
    return processResponsiveCss(value, (v) => `${cssKey}: ${v};`);
  }

  return `${cssKey}: ${value};`;
};

export const css = (...args) => {
  if (isArray(args[0])) {
    if (isArray(args[0][0])) {
      throw new Error('`css()` takes in positional arguments, not an array of arguments: eg. `css([], [], [])`, not `css([[], [], []])`');
    }

    return props => {
      for (let i = 0; i < args.length; i += 1) {
        const result = processCssRule(args[i][0], args[i][1], args[i][2])(props);
        if (result !== '') {
          return result;
        }
      }
      return '';
    };
  }
  return processCssRule(args[0], args[1], args[2]);
};

export const cssBackground = ({ background: backgroundProp }) => {
  if (backgroundProp == null) {
    return '';
  }

  if (typeof backgroundProp === 'string') {
    if (backgroundProp[0] === '#' || backgroundProp.includes('hsl') || backgroundProp.includes('rgb')) {
      return `background-color: ${backgroundProp};`;
    }
  }

  return '';
};