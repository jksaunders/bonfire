import React from 'react';
import { expectExists, expectSnapshot, render } from '../../../utils/snapshot';
import VideoBackground from './VideoBackground';

const getVideoBackground = (props = {}) =>
  render(<VideoBackground {...props} />);

test('VideoBackground open', () => {
  const { component } = getVideoBackground({
    filter: 'opacity(70%)',
    muted: false,
    parentLayoutProps: { center: true, full: true },
    src:
      'https://upload.wikimedia.org/wikipedia/commons/6/60/Wikipedia_logo_puzzle_globe_spins_horizontally_and_vertically%2C_revealing_the_contents_of_all_of_its_puzzle_pieces_%284K_resolution%29_%28VP9%29.webm',
  });
  expectExists(component);
  expectSnapshot(component);
});
