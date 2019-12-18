import { isArray } from 'util';
import Sizes from './Sizes';

/**
 * Use this in your files that are using responsive-props-enabled components
 *
 * eg. <SomeComponent height="50px" background={responsiveCss({
 *  "_-200px": "blue",
 *  "200px-_": "red"
 * })} />
 */
export const responsiveCss = value => new Sizes(value);

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

/**
 * Exported only for tests
 */
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

/**
 * Use in styled-components template tags, eg. styled.div`
 *  ${css('margin')}
 * `
 *
 * It automatically handles regular values as well as responsive values passed in
 * via `responsiveCss`.
 *
 * Given one argument, `css` will fetch the given prop name, use it as the css key, and
 * make the value of the prop equal to the value of the key
 *
 * eg. `css('margin') -> margin: <value of props['margin']>
 *
 * Given two arguments, `css` will fetch the given prop name, use the second argument as
 * the css key, and make the value of the prop equal to the value of the key
 *
 * eg. `css('gap', 'grid-gap')` -> grid-gap: <value of props['gap']>
 *
 * You can also pass in a function to base the key on other props
 *
 * eg. `css('gap', (props) => props['anotherValue'])` -> <value of props['anotherValue']: <value of props['gap']>
 *
 * Given three arguments, `css` will fetch the given prop name, use the second argument as
 * the css key, and use the third value to calculate the value
 *
 * eg. `css('gap', 'grid-gap', (props) => props['anotherValue'])` -> grid-gap: <value of props['anotherValue']>
 *
 * Passing in a non-function will force that value to be used regardless of the prop value. This is useful
 * for boolean props
 *
 * eg. `css('centered', 'text-align', 'center')
 *
 * You can also use multiple rules and only the first matched rule will be used.
 *
 * eg. `css(['centered', 'text-align', 'center'], ['textAlign', 'text-align'])`
 */
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
