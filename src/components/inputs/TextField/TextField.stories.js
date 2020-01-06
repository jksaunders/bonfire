import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Layout from '../../containers/Layout';
import TextField from './TextField';
import { TypographyContext, TrelloVariants } from '../../Typography';

export default {
  title: 'Inputs|TextField',
  component: TextField,
  decorators: [withKnobs],
};

export const TextFieldStory = () => {
  const error = text('Error', '');
  const label = text('Label', '');
  const placeholder = text('Placeholder', '');

  return (
    <TextField
      error={error === '' ? null : error}
      label={label === '' ? null : label}
      placeholder={placeholder === '' ? null : placeholder}
      // eslint-disable-next-line no-console
      onSubmit={() => console.log('Done!')}
    />
  );
};

TextFieldStory.story = {
  name: 'Text Field',
};

export const Styled = () => {
  const error = text('Error', '');
  const label = text('Label', '');
  const placeholder = text('Placeholder', '');

  return (
    <TypographyContext.Provider value={TrelloVariants.Body}>
      <Layout maxWidth="50%" useTypography>
        <TextField
          error={error === '' ? null : error}
          label={label === '' ? null : label}
          placeholder={placeholder === '' ? null : placeholder}
        />
      </Layout>
    </TypographyContext.Provider>
  );
};
