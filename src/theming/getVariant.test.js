import React from 'react';
import { expectExists, expectSnapshot, expectStyle, render } from '../testing';
import Button from '../components/Button';
import { ThemeRoot } from './ThemeContext';

const initialTheme = {
  current: {},
  variants: {
    components: {
      button: {
        primary: {
          padding: '15px 20px',
          typography: {
            color: 'red',
            size: '14px',
          },
        },
      },
    },
  },
};

describe('variant and prop both present', () => {
  describe('string value', () => {
    test('using same keys: props take priority', () => {
      const { component, getByText } = render(
        <ThemeRoot initialTheme={initialTheme}>
          <Button text="content" padding="5px 5px" variant="primary" />
        </ThemeRoot>
      );
      expectExists(component);
      expectSnapshot(component);
      expectStyle(component, 'padding', '5px 5px');

      const span = getByText('content');
      expectExists(span);
      expectStyle(span, 'color', 'red');
      expectStyle(span, 'font-size', '14px');
    });
  });

  describe('object value', () => {
    test('using different keys: object merged', () => {
      const { component, getByText } = render(
        <ThemeRoot initialTheme={initialTheme}>
          <Button
            text="content"
            typography={{ align: 'left' }}
            variant="primary"
          />
        </ThemeRoot>
      );
      expectExists(component);
      expectSnapshot(component);
      expectStyle(component, 'padding', '15px 20px');

      const span = getByText('content');
      expectExists(span);
      expectStyle(span, 'color', 'red');
      expectStyle(span, 'font-size', '14px');
      expectStyle(span, 'text-align', 'left');
    });

    test('using same keys: props take priority', () => {
      const { component, getByText } = render(
        <ThemeRoot initialTheme={initialTheme}>
          <Button
            text="content"
            typography={{ size: '5px' }}
            variant="primary"
          />
        </ThemeRoot>
      );
      expectExists(component);
      expectSnapshot(component);
      expectStyle(component, 'padding', '15px 20px');

      const span = getByText('content');
      expectExists(span);
      expectStyle(span, 'color', 'red');
      expectStyle(span, 'font-size', '5px');
    });
  });
});
