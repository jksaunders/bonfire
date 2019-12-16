import React from 'react';
import PropTypes from 'prop-types';
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

  get minimum() {
    if (this.privateValue._ != null) {
      return this.privateValue._;
    }
    const firstKeyThatStartsAtMinimum = Object.keys(this.privateValue).find(
      k => k.charAt(0) === '_'
    );
    return this.privateValue[firstKeyThatStartsAtMinimum];
  }

  size(key) {
    if (key === '_') {
      return this.minimum;
    }
    return this.privateValue[key];
  }
}

export const CssRuleType = type =>
  PropTypes.oneOfType([type, PropTypes.instanceOf(Sizes)]);

export const reconcileMediaQueries = styles => {
  if (styles.indexOf('@media') < 0) {
    return styles;
  }

  const mediaQueries = {};
  let noMediaQueriesString = '';

  const states = {
    INSIDE_MEDIA: 'INSIDE_MEDIA',
    INSIDE_MEDIA_SIGNATURE: 'INSIDE_MEDIA_SIGNATURE',
    OUTSIDE_MEDIA: 'OUTSIDE_MEDIA',
  };

  let state = states.OUTSIDE_MEDIA;
  let checkpoint = 0;
  let currentMedia = '';

  for (let i = 0; i < styles.length; i += 1) {
    if (
      i + 6 < styles.length &&
      styles.substring(i, i + 6) === '@media' &&
      state === states.OUTSIDE_MEDIA
    ) {
      noMediaQueriesString += `\n${styles.substring(checkpoint, i).trim()}`;
      state = states.INSIDE_MEDIA_SIGNATURE;
      checkpoint = i;
    } else if (
      styles.charAt(i) === '{' &&
      state === states.INSIDE_MEDIA_SIGNATURE
    ) {
      state = states.INSIDE_MEDIA;
      currentMedia = styles.substring(checkpoint, i).trim();
      checkpoint = i + 1;
    } else if (styles.charAt(i) === '}' && state === states.INSIDE_MEDIA) {
      if (!mediaQueries[currentMedia]) {
        mediaQueries[currentMedia] = styles.substring(checkpoint, i).trim();
      } else {
        mediaQueries[currentMedia] += `\n${styles
          .substring(checkpoint, i)
          .trim()}`;
      }
      state = states.OUTSIDE_MEDIA;
      checkpoint = i + 1;
    }
  }

  noMediaQueriesString += `\n${styles.substring(checkpoint).trim()}`;
  noMediaQueriesString = noMediaQueriesString.trim();

  let result = noMediaQueriesString;
  Object.keys(mediaQueries).forEach(k => {
    result += `\n${k} {\n${mediaQueries[k]}\n}`;
  });

  result = result.trim();

  return result;
};

export const responsiveCss = value => new Sizes(value);

export const processResponsiveCss = (input, transform) => {
  if (input == null) {
    return '';
  }

  if (input instanceof Sizes) {
    let result = '';
    Object.keys(input.value).forEach(k => {
      if (k === '_') {
        result = `${result}\n${
          transform != null ? transform(input.value[k]) : input.value[k]
        }`;
      }

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
      result = `${result}\n${signature} { ${
        transform != null ? transform(input.value[k]) : input.value[k]
      } }`;
    });
    return result.substring(1);
  }

  if (transform == null) {
    return input;
  }
  return transform(input);
};

const getPropsForTransform = (size, props) => {
  const sizedProps = {};
  Object.keys(props).forEach(k => {
    if (props[k] instanceof Sizes) {
      const matchingMediaQuery = props[k].size(size);
      if (matchingMediaQuery) {
        sizedProps[k] = props[k].size(size);
      } else if (props[k].size('_') != null) {
        sizedProps[k] = props[k].minimum;
      }
    } else {
      sizedProps[k] = props[k];
    }
  });
  return sizedProps;
};

export const processCssRule = (prop, key, calculateValue) => props => {
  if (props == null || prop == null || !props[prop]) {
    return '';
  }

  const sizes =
    props[prop] instanceof Sizes ? props[prop].value : { _: props[prop] };

  let result = '';
  const appendResult = add => {
    result = `${result}\n${add}`;
  };

  const getResult = k => {
    const calculatedKey =
      typeof key === 'function' ? key(getPropsForTransform(k, props)) : key;
    const cssKey = calculatedKey || prop;

    let value = null;
    if (calculateValue != null) {
      if (typeof calculateValue === 'string') {
        value = calculateValue;
      } else if (typeof calculateValue === 'function') {
        value = calculateValue(getPropsForTransform(k, props));
      }
    }
    return `${cssKey}: ${value != null ? value : sizes[k]};`;
  };

  Object.keys(sizes).forEach(k => {
    if (k === '_') {
      appendResult(getResult(k));
      return;
    }

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
    appendResult(`${signature} { ${getResult(k)} }`);
  });

  return result.substring(1);
};

export const css = (...args) => {
  if (isArray(args[0])) {
    if (isArray(args[0][0])) {
      throw new Error(
        '`css()` takes in positional arguments, not an array of arguments: eg. `css([], [], [])`, not `css([[], [], []])`'
      );
    }

    return props => {
      for (let i = 0; i < args.length; i += 1) {
        const result = processCssRule(
          args[i][0],
          args[i][1],
          args[i][2]
        )(props);
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
    if (
      backgroundProp[0] === '#' ||
      backgroundProp.includes('hsl') ||
      backgroundProp.includes('rgb')
    ) {
      return `background-color: ${backgroundProp};`;
    }
  }

  return '';
};
