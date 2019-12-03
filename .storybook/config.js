import { addParameters, configure } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

configure(require.context("../src/", true, /\.stories\.js$/), module);

addParameters({
  viewPort: { viewPorts: INITIAL_VIEWPORTS }
});