type PropsToString<T> = (props: T) => string;
type StringOrPropsFunction<T> = string | PropsToString<T>;
type StringOrNullOrPropsFunction<T> = string | null | PropsToString<T>;
export type CssRule<T> = [
  keyof T,
  StringOrNullOrPropsFunction<T>?,
  StringOrPropsFunction<T>?
];

export interface MinMax {
  max: string;
  min: string;
}

export const mediaQuery = (minMax: MinMax, content: string): string => {
  if (minMax.max === '_' && minMax.min === '_') {
    return content;
  }

  const min = minMax.min === '_' ? '' : `(min-width: ${minMax.min})`;
  const max = minMax.max === '_' ? '' : `(max-width: ${minMax.max})`;

  return `@media all and ${min}${min && max && ' and '}${max} {
    ${content}
  }`;
};

export function sizesObjectToCss(
  obj: unknown,
  mappingFunction: (value: string, key?: string) => string
): string {
  if (!obj) {
    return '';
  }

  const sizes: string[] = [];

  const isObject = typeof obj === 'object';

  if (isObject) {
    Object.keys(obj as Record<string, unknown>).forEach((key) => {
      sizes.push(key);
    });
  } else {
    sizes.push('_-_');
  }

  let result = '';

  sizes.forEach((size) => {
    const content = mappingFunction(
      isObject
        ? ((obj as Record<string, unknown>)[size] as string)
        : (obj as string),
      size
    );
    const [min, max] = size.split('-');
    const sizeResult = mediaQuery({ min, max }, content);

    result += `\n${sizeResult}`;
  });

  return result;
}

export function processCssRule<T>(
  prop: keyof T,
  keyArg?: StringOrNullOrPropsFunction<T>,
  valueArg?: StringOrPropsFunction<T>
): (props?: T) => string {
  return (props?: T): string => {
    if (props == null || !prop || props[prop] == null) {
      return '';
    }

    return sizesObjectToCss(props[prop], (sizeValue) => {
      let key;
      let value;

      if (keyArg === undefined) {
        key = prop;
      } else if (typeof keyArg === 'string') {
        key = keyArg;
      } else if (typeof keyArg === 'function') {
        key = keyArg(props);
      }

      if (!valueArg) {
        const propValue = props[prop];
        if (typeof propValue === 'object') {
          value = sizeValue;
        } else {
          value = propValue;
        }
      } else if (typeof valueArg === 'string') {
        value = valueArg;
      } else if (typeof valueArg === 'function') {
        value = valueArg(props);
      }

      const content = key === null ? `${value}` : `${key}: ${value};`;
      return content;
    });
  };
}

/**
 * Use in styled-components template tags, eg. styled.div`
 *  ${cssRule('margin')}
 * `
 *
 * It automatically handles regular values as well as responsive values passed in
 * via `responsiveProps`.
 *
 * Given one argument, `cssRule` will fetch the given prop name, use it as the css key, and
 * make the value of the prop equal to the value of the key
 *
 * eg. `cssRule('margin') -> margin: <value of props['margin']>
 *
 * Given two arguments, `cssRule` will fetch the given prop name, use the second argument as
 * the css key, and make the value of the prop equal to the value of the key
 *
 * eg. `cssRule('gap', 'grid-gap')` -> grid-gap: <value of props['gap']>
 *
 * You can also pass in a function to base the key on other props
 *
 * eg. `cssRule('gap', (props) => props['anotherValue'])` -> <value of props['anotherValue']: <value of props['gap']>
 *
 * Given three arguments, `cssRule` will fetch the given prop name, use the second argument as
 * the css key, and use the third value to calculate the value
 *
 * eg. `cssRule('gap', 'grid-gap', (props) => props['anotherValue'])` -> grid-gap: <value of props['anotherValue']>
 *
 * Passing in a non-function will force that value to be used regardless of the prop value. This is useful
 * for boolean props
 *
 * eg. `cssRule('centered', 'text-align', 'center')
 *
 * You can also use multiple rules and only the first matched rule will be used.
 *
 * eg. `cssRule(['centered', 'text-align', 'center'], ['textAlign', 'text-align'])`
 */
export type CssRuleArgs<T> = CssRule<T> | CssRule<T>[];

export function cssRule<T>(...args: CssRuleArgs<T>): (props?: T) => string {
  if (!Array.isArray(args[0])) {
    const argsArguments = args as CssRule<T>;
    return processCssRule(argsArguments[0], argsArguments[1], argsArguments[2]);
  }

  if (Array.isArray(args[0][0])) {
    throw new Error(
      '`css()` takes in positional arguments, not an array of arguments: eg. `css([], [], [])`, not `css([[], [], []])`'
    );
  }

  const argsList = args as CssRule<T>[];

  return (props): string => {
    for (let i = 0; i < args.length; i += 1) {
      const result = processCssRule(
        argsList[i][0],
        argsList[i][1],
        argsList[i][2]
      )(props);
      if (result !== '') {
        return result;
      }
    }
    return '';
  };
}
