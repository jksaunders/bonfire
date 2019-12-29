import React from 'react';
import { expectExists, expectSnapshot, render } from '../../../testing';
import Dialog from './Dialog';

const getDialog = (props = {}) =>
  render(<Dialog {...props}>test-dialog</Dialog>);

test('Dialog closed', () => {
  const { container } = getDialog({ open: false });
  expectSnapshot(container);
});

test('Dialog open', () => {
  const { getByText } = getDialog({ open: true });
  const component = getByText('test-dialog');
  expectExists(component);
  expectSnapshot(component);
});
