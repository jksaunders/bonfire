import React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import Button from './Button';

export default {
  title: 'Components|Button',
  component: Button,
  decorators: [withKnobs],
};

export const ButtonStory = () => {
  return (
    <div>
      <div>
        {Object.keys(Button.CONSTANTS.VARIANT).map(variantKey => (
          <Button
            key={variantKey}
            text={variantKey.toLowerCase()}
            variant={variantKey}
            onClick={action('clicked')}
          />
        ))}
      </div>
      <div>
        {Object.keys(Button.CONSTANTS.VARIANT).map(variantKey => (
          <Button
            key={variantKey}
            text={`${variantKey.toLowerCase()} disabled`}
            variant={variantKey}
            onClick={action('clicked')}
          />
        ))}
      </div>
    </div>
  );
};

ButtonStory.story = {
  name: 'Button',
};
