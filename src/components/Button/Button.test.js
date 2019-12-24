import React from 'react';
import {
  expectExists,
  expectSnapshot,
  expectStyle,
  render,
} from '../../testing';
import Button from './Button';

const getButton = (props = {}) => render(<Button {...props} />);
const buttonText = 'Test text';

test('`Button` renders', () => {
  const { component } = getButton({ text: 'Test text' });
  expectExists(component);
  expectSnapshot(component);
});

describe('`Button styles', () => {
  [
    { prop: 'background', key: 'background-color', value: '#ff0000' },
    { prop: 'borderRadius', key: 'border-radius', value: '1px' },
    { prop: 'borderStyle', key: 'border-style', value: 'solid' },
    { prop: 'borderWidth', key: 'border-width', value: '2px' },
    { prop: 'padding', value: '10px' },
  ].forEach(testCase => {
    test(`Prop: ${testCase.prop} has value ${testCase.value}`, () => {
      const { component } = getButton({
        text: buttonText,
        [testCase.prop]: testCase.value,
      });
      expectExists(component);
      expectSnapshot(component);
      expectStyle(component, testCase.key || testCase.prop, testCase.value);
    });
  });
});

describe('`Typography` styles', () => {
  [
    { prop: 'color', value: '#ff0000' },
    { prop: 'size', key: 'font-size', value: '14px' },
  ].forEach(testCase => {
    test(`Prop: ${testCase.prop} has value ${testCase.value}`, () => {
      const { component, queryByText } = getButton({
        text: buttonText,
        typography: {
          [testCase.prop]: testCase.value,
        },
      });
      expectExists(component);
      expectSnapshot(component);

      const typography = queryByText(buttonText);
      expectExists(typography);
      expectSnapshot(typography);
      expectStyle(typography, testCase.key || testCase.prop, testCase.value);
    });
  });
});
