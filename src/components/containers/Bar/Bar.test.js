import React from 'react';
import {
  expectExists,
  expectSnapshot,
  render
} from '../../../utils/snapshot';
import Bar from './Bar';

const getBar = (props = {}) => render(<Bar {...props} />);

test('Bar renders', () => {
  const { component } = getBar();
  expectExists(component);
  expectSnapshot(component);
});