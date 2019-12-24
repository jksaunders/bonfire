import React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeRoot } from '../../theming';

import Button from './Button';
import { MaterialVariants } from '../Typography';

export default {
  title: 'Components|Button',
  component: Button,
  decorators: [withKnobs],
};

export const ButtonStory = () => {
  return (
    <div>
      <Button text="Button" onClick={action('clicked')} />
      <Button text="disabled" onClick={action('clicked disabled')} disabled />
    </div>
  );
};

ButtonStory.story = {
  name: 'Button',
};

export const ThemedButtonStory = () => {
  return (
    <ThemeRoot
      initialTheme={{
        current: {
          mode: 'light',
        },
        variants: {
          components: {
            button: {
              primary: {
                typography: MaterialVariants.ButtonText,
                borderRadius: '0.25em',
              },
              secondary: {
                typography: MaterialVariants.ButtonText,
                borderRadius: '0.75em',
              },
            },
          },
        },
      }}
    >
      <Button
        text="Primary"
        onClick={action('clicked primary')}
        variant="primary"
      />
      <Button
        text="Secondary"
        onClick={action('clicked secondary')}
        variant="secondary"
      />
    </ThemeRoot>
  );
};

ButtonStory.story = {
  name: 'Button',
};
