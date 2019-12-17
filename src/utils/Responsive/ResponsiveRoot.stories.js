import React, { useContext } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import ResponsiveRoot, { ResponsiveSizesContext } from './ResponsiveRoot';

export default {
  title: 'Utils|ResponsiveRoot',
  component: ResponsiveRoot,
  decorators: [withKnobs],
};

const Content = () => {
  const { windowSize, ...rest } = useContext(ResponsiveSizesContext);
  return <div>{Object.entries(rest).join(' ')}</div>;
};

export const ResponsiveRootStory = () => (
  <ResponsiveRoot
    presets={{
      short: {
        height: {
          max: 400,
        },
      },
      wide: {
        width: {
          min: 500,
        },
      },
    }}
  >
    <Content />
  </ResponsiveRoot>
);

ResponsiveRootStory.story = {
  name: 'Responsive Root',
};
