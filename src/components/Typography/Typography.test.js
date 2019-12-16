import React from 'react';
import { expectExists, expectSnapshot, render } from '../../utils/snapshot';
import Typography from './Typography';

test('Typography renders', () => {
  const { component } = render(<Typography>Content</Typography>);
  expectExists(component);
  expectSnapshot(component);
});

describe('Props', () => {
  [
    { prop: 'align', propValue: 'center', key: 'text-align' },
    {
      prop: 'bold',
      propValue: true,
      key: 'font-weight',
      value: 'bold',
    },
    { prop: 'color', propValue: '#123456' },
    { prop: 'font', propValue: 'arial', key: 'font-family' },
    {
      prop: 'italic',
      propValue: true,
      key: 'font-style',
      value: 'italic',
    },
    { prop: 'letterSpacing', propValue: '1em', key: 'letter-spacing' },
    { prop: 'lineHeight', propValue: '1em', key: 'line-height' },
    { prop: 'size', propValue: '20px', key: 'font-size' },
    { prop: 'transform', propValue: 'uppercase', key: 'text-transform' },
    { prop: 'weight', propValue: '200', key: 'font-weight' },
    { prop: 'weight', propValue: 300, key: 'font-weight' },
  ].forEach(testCase => {
    test(`${testCase.prop}`, () => {
      const { component } = render(
        <Typography {...{ [testCase.prop]: testCase.propValue }}>
          Content
        </Typography>
      );
      expectExists(component);
      expectSnapshot(component);
      expect(component).toHaveStyleRule(
        testCase.key ? testCase.key : testCase.prop,
        testCase.value ? testCase.value : `${testCase.propValue}`
      );
    });
  });
});

describe('Using variant', () => {
  const variant = {
    size: '6rem',
    font: '"Roboto","Helvetica","Arial",sans-serif',
    weight: 300,
    lineHeight: 1,
    letterSpacing: '-0.01562em',
  };

  test('no overrides', () => {
    const { component } = render(
      <Typography variant={variant}>Content</Typography>
    );
    expectExists(component);
    expectSnapshot(component);
    expect(component).toHaveStyleRule('line-height', '1');
  });

  test('with overrides', () => {
    const { component } = render(
      <Typography h1 lineHeight={4} variant={variant}>
        Content
      </Typography>
    );
    expectExists(component);
    expectSnapshot(component);
    expect(component).toHaveStyleRule('line-height', '4');
  });
});
