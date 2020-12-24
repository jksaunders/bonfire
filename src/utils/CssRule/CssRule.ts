type PropsToString<T> = (props: T) => string;
type StringOrPropsFunction<T> = string | PropsToString<T>;
export type CssRule<T> = [
  keyof T,
  StringOrPropsFunction<T>?,
  StringOrPropsFunction<T>?
];
type CssRuleArgs<T> = CssRule<T> | CssRule<T>[];

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

  return `@media all and ${min} ${min && max && 'and'} ${max} {
    ${content}
  }`;
};

export function processCssRule<T>(
  prop: keyof T,
  keyArg?: StringOrPropsFunction<T>,
  valueArg?: StringOrPropsFunction<T>
): (props?: T) => string {
  return (props?: T): string => {
    if (props == null || !prop || props[prop] == null) {
      return '';
    }

    const sizes: string[] = [];

    if (typeof props[prop] !== 'object') {
      sizes.push('_-_');
    } else {
      Object.keys(props[prop]).forEach((key) => {
        sizes.push(key);
      });
    }

    let result = '';

    sizes.forEach((size) => {
      let key;
      let value;

      if (!keyArg) {
        key = prop;
      } else if (typeof keyArg === 'string') {
        key = keyArg;
      } else if (typeof keyArg === 'function') {
        key = keyArg(props);
      }

      if (!valueArg) {
        const propValue = props[prop];
        if (typeof propValue === 'object') {
          value = ((propValue as unknown) as Record<string, unknown>)[size];
        } else {
          value = propValue;
        }
      } else if (typeof valueArg === 'string') {
        value = valueArg;
      } else if (typeof valueArg === 'function') {
        value = valueArg(props);
      }

      const [min, max] = size.split('-');
      const sizeResult = mediaQuery({ min, max }, `${key}: ${value};`);

      result += `\n${sizeResult}`;
    });

    return result;
  };
}

export function cssRule<T>(...args: CssRuleArgs<T>): (props?: T) => string {
  return (): string => `${args.length}`;
}
