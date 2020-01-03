import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from '../../containers/Layout';
import TextField from './TextField';
import { TypographyContext, TrelloVariants } from '../../Typography';

export default {
  title: 'Inputs|TextField',
  component: TextField,
  decorators: [withKnobs],
};

export const TextFieldStory = () => {
  return (
    // eslint-disable-next-line no-console
    <TextField placeholder="Text field" onSubmit={() => console.log('Done!')} />
  );
};

TextFieldStory.story = {
  name: 'Text Field',
};

export const Styled = () => (
  <TypographyContext.Provider value={TrelloVariants.Body}>
    <Layout maxWidth="50%" useTypography>
      <TextField placeholder="Text field" />
    </Layout>
  </TypographyContext.Provider>
);
