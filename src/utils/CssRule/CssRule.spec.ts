import { CssRule, processCssRule } from './CssRule';
// import { ResponsiveProps } from '../ResponsiveProps';

interface ExampleProps {
  color?: string;
  height: string;
  width: 'full' | 'minimum';
}

interface TestCase<T> {
  args: CssRule<T>;
  expected: string;
  props: T;
  title: string;
}

const testCases: TestCase<ExampleProps>[] = [
  {
    args: ['color'],
    expected: '',
    props: {
      height: 'xs',
      width: 'full',
    },
    title: 'missing prop',
  },
  {
    args: ['color'],
    expected: 'color: red;',
    props: {
      color: 'red',
      height: 'xs',
      width: 'full',
    },
    title: 'prop present',
  },
  {
    args: ['height', 'height-key'],
    expected: 'height-key: xs;',
    props: {
      color: 'red',
      height: 'xs',
      width: 'full',
    },
    title: 'string key',
  },
  {
    args: ['height', undefined, 'tall'],
    expected: 'height: tall;',
    props: {
      color: 'red',
      height: 'xs',
      width: 'full',
    },
    title: 'string value, no key',
  },
  {
    args: ['height', 'height-key', 'tall'],
    expected: 'height-key: tall;',
    props: {
      color: 'red',
      height: 'xs',
      width: 'full',
    },
    title: 'string key and value',
  },
];

describe('processCssRule: regular props', () => {
  testCases.forEach(({ args, expected, props, title }) => {
    test(title, () => {
      const result = processCssRule<ExampleProps>(
        args[0],
        args.length >= 1 ? args[1] : undefined,
        args.length >= 2 ? args[2] : undefined
      )(props);

      expect(result).toEqual(expected);
    });
  });
});

describe('processCssRule: responsive props', () => {
  // type ResponsiveExampleProps = ResponsiveProps<ExampleProps>;
});
