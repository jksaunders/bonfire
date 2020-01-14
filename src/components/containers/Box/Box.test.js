import React from 'react';
import { expectExists, expectSnapshot, render } from '../../../testing';
import Box from './Box';

const getBox = (props = {}, children) =>
  render(<Box {...props}>{children}</Box>);

test('renders', () => {
  const { component } = getBox({ component: 'input' });
  expectExists(component);
  expectSnapshot(component);
});

describe('positioning', () => {
  test('position', () => {
    const { component } = getBox({ position: 'relative' });
    expectExists(component);
    expectSnapshot(component);
    expect(component).toHaveStyleRule('position', 'relative');
  });

  test('absolute', () => {
    const { component } = getBox({ absolute: true });
    expectExists(component);
    expectSnapshot(component);
    expect(component).toHaveStyleRule('position', 'absolute');
  });

  test('top 2', () => {
    const { component } = getBox({
      absolute: true,
      absoluteAnchor: true,
    });
    expectExists(component);
    expectSnapshot(component);
    expect(component).toHaveStyleRule('position', 'absolute');
  });

  test('all 3', () => {
    const { component } = getBox({
      absolute: true,
      absoluteAnchor: true,
      position: 'unset',
    });
    expectExists(component);
    expectSnapshot(component);
    expect(component).toHaveStyleRule('position', 'absolute');
  });
});
