import { CssRule, processCssRule } from './CssRule';
import { ResponsiveProps } from '../ResponsiveProps';

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

const trim = (s: string): string => s.split('\n').join('').split(' ').join('');

describe('processCssRule: regular props', () => {
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
    {
      args: ['height', (props): string => props.width],
      expected: 'full: xs;',
      props: {
        color: 'red',
        height: 'xs',
        width: 'full',
      },
      title: 'function key',
    },
    {
      args: ['height', (props): string => props.width, 'purple'],
      expected: 'full: purple;',
      props: {
        color: 'red',
        height: 'xs',
        width: 'full',
      },
      title: 'function key, string value',
    },
    {
      args: [
        'height',
        (props): string => props.width,
        (props): string => props.height + ' x2',
      ],
      expected: 'full: xs x2;',
      props: {
        color: 'red',
        height: 'xs',
        width: 'full',
      },
      title: 'function key and value',
    },
  ];

  testCases.forEach(({ args, expected, props, title }) => {
    test(title, () => {
      const result = processCssRule<ExampleProps>(
        args[0],
        args.length >= 1 ? args[1] : undefined,
        args.length >= 2 ? args[2] : undefined
      )(props);

      expect(trim(result)).toEqual(trim(expected));
    });
  });
});

describe('processCssRule: responsive props without responsive usage', () => {
  type ResponsiveExampleProps = ResponsiveProps<ExampleProps>;

  const testCases: TestCase<ResponsiveExampleProps>[] = [
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
    {
      args: ['height', (props): string => props.width as string],
      expected: 'full: xs;',
      props: {
        color: 'red',
        height: 'xs',
        width: 'full',
      },
      title: 'function key',
    },
    {
      args: ['height', (props): string => props.width as string, 'purple'],
      expected: 'full: purple;',
      props: {
        color: 'red',
        height: 'xs',
        width: 'full',
      },
      title: 'function key, string value',
    },
    {
      args: [
        'height',
        (props): string => props.width as string,
        (props): string => props.height + ' x2',
      ],
      expected: 'full: xs x2;',
      props: {
        color: 'red',
        height: 'xs',
        width: 'full',
      },
      title: 'function key and value',
    },
  ];

  testCases.forEach(({ args, expected, props, title }) => {
    test(title, () => {
      const result = processCssRule<ResponsiveExampleProps>(
        args[0],
        args.length >= 1 ? args[1] : undefined,
        args.length >= 2 ? args[2] : undefined
      )(props);

      expect(trim(result)).toEqual(trim(expected));
    });
  });
});

describe('processCssRule: responsive props with responsive usage', () => {
  type ResponsiveExampleProps = ResponsiveProps<ExampleProps>;

  const testCases: TestCase<ResponsiveExampleProps>[] = [
    {
      args: ['color'],
      expected: '',
      props: {
        height: {
          '_-200px': 'xs',
          '200px-_': 's',
        },
        width: 'full',
      },
      title: 'missing prop',
    },
    {
      args: ['height'],
      expected: `
        @media all and (max-width: 200px) { height: xs; }
        @media all and (min-width: 200px) { height: s; }
      `,
      props: {
        height: {
          '_-200px': 'xs',
          '200px-_': 's',
        },
        width: 'full',
      },
      title: 'two levels',
    },
    {
      args: ['height'],
      expected: `
        @media all and (max-width: 200px) { height: xs; }
        @media all and (min-width: 200px) and (max-width: 300px) { height: s; }
        @media all and (min-width: 300px) { height: m; }
      `,
      props: {
        height: {
          '_-200px': 'xs',
          '200px-300px': 's',
          '300px-_': 'm',
        },
        width: 'full',
      },
      title: 'three levels',
    },
  ];

  testCases.forEach(({ args, expected, props, title }) => {
    test(title, () => {
      const result = processCssRule<ResponsiveExampleProps>(
        args[0],
        args.length >= 1 ? args[1] : undefined,
        args.length >= 2 ? args[2] : undefined
      )(props);

      expect(trim(result)).toEqual(trim(expected));
    });
  });
});
