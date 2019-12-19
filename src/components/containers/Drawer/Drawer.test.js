import React from 'react';
import { expectExists, expectSnapshot, render } from '../../../testing';
import Drawer from './Drawer';

const getDrawer = (props = {}) => render(<Drawer {...props} />);

test('Drawer closed', () => {
  const { component } = getDrawer({ open: false });
  expect(component).toBe(null);
  expectSnapshot(component);
});

test('Drawer open', () => {
  const { getByRole } = getDrawer({ open: true });
  const component = getByRole('presentation');
  expectExists(component);
  expectSnapshot(component);
});
