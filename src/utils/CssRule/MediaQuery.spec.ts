import { mediaQuery, MinMax } from './CssRule';

interface TestCase {
  expected: string;
  minMax: MinMax;
  title: string;
}

const content = `
  color: red;
  height: 80px;
`;

const trim = (s: string): string => s.split('\n').join('').split(' ').join('');

const testCases: TestCase[] = [
  {
    expected: content,
    minMax: { max: '_', min: '_' },
    title: 'no min/max',
  },
  {
    expected: `@media all and (min-width: 280px) { ${content} }`,
    minMax: { max: '_', min: '280px' },
    title: 'min',
  },
  {
    expected: `@media all and (max-width: 380px) { ${content} }`,
    minMax: { max: '380px', min: '_' },
    title: 'max',
  },
  {
    expected: `@media all and (min-width: 280px) and (max-width: 380px) { ${content} }`,
    minMax: { max: '380px', min: '280px' },
    title: 'min + max',
  },
];

describe('`mediaQuery` tests', () => {
  testCases.forEach(({ expected, minMax, title }) => {
    test(title, () => {
      const result = mediaQuery(minMax, content);
      expect(trim(result)).toEqual(trim(expected));
    });
  });
});
