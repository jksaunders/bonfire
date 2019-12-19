import React from 'react';
import { expectExists, expectSnapshot, render } from '../../testing';
import Header from './Header';

const getHeader = (props = {}) => render(<Header {...props} />);

test('Header renders', () => {
  const { component } = getHeader();
  expectExists(component);
  expectSnapshot(component);
});
