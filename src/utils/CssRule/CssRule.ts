type PropsToString<T> = (props: T) => string;
type StringOrPropsFunction<T> = string | PropsToString<T>;
export type CssRule<T> = [
  keyof T,
  StringOrPropsFunction<T>?,
  StringOrPropsFunction<T>?
];
type CssRuleArgs<T> = CssRule<T> | CssRule<T>[];

export function processCssRule<T>(
  prop: keyof T,
  keyArg?: StringOrPropsFunction<T>,
  valueArg?: StringOrPropsFunction<T>
): (props?: T) => string {
  return (props?: T): string => {
    if (props == null || !prop || props[prop] == null) {
      return '';
    }

    let key;
    let value;

    if (!keyArg) {
      key = prop;
    } else if (typeof keyArg === 'string') {
      key = keyArg;
    }

    if (!valueArg) {
      value = props[prop];
    } else if (typeof valueArg === 'string') {
      value = valueArg;
    }

    return `${key}: ${value};`;
  };
}

export function cssRule<T>(...args: CssRuleArgs<T>): (props?: T) => string {
  return (): string => `${args.length}`;
}
