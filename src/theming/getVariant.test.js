import React from 'react';
import { expectExists, expectSnapshot, expectStyle, render } from '../testing';
import Button from '../components/Button';
import { ThemeRoot } from './ThemeContext';

describe('variant and prop both present', () => {
  test('using different keys: object merged', () => {
    const { component, getByText } = render(
      <ThemeRoot
        initialTheme={{
          current: {
            mode: 'light',
          },
          variants: {
            components: {
              button: {
                primary: {
                  typography: {
                    size: '14px',
                  },
                },
              },
            },
          },
        }}
      >
        <Button
          text="content"
          typography={{ color: 'red' }}
          variant="primary"
        />
      </ThemeRoot>
    );
    expectExists(component);
    expectSnapshot(component);

    const span = getByText('content');
    expectExists(span);
    expectStyle(span, 'color', 'red');
    expectStyle(span, 'font-size', '14px');
  });

  test('using same keys: props take priority', () => {
    const { component, getByText } = render(
      <ThemeRoot
        initialTheme={{
          current: {
            mode: 'light',
          },
          variants: {
            components: {
              button: {
                primary: {
                  typography: {
                    color: 'red',
                    size: '14px',
                  },
                },
              },
            },
          },
        }}
      >
        <Button text="content" typography={{ size: '5px' }} variant="primary" />
      </ThemeRoot>
    );
    expectExists(component);
    expectSnapshot(component);

    const span = getByText('content');
    expectExists(span);
    expectStyle(span, 'color', 'red');
    expectStyle(span, 'font-size', '5px');
  });
});
