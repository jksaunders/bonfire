import React from 'react';
import { expectExists, expectSnapshot, render } from '../../../testing';
import TextField from './TextField';

const getTextField = (props = {}, children) =>
  render(<TextField {...props}>{children}</TextField>);

test('renders', () => {
  const { component } = getTextField();
  expectExists(component);
  expectSnapshot(component);
});
