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
