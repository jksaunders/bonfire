import React from 'react';
import styled from 'styled-components';

import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';

import Box from './Box';
import Typography, { MaterialVariants } from '../../Typography';

const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
`;

export default {
  title: 'Containers|Box',
  component: Box,
  decorators: [withKnobs],
};

export const BasicStory = () => {
  const elevation = number('Elevation', 0);
  const full = boolean('Full height and width?', false);
  const padding = text('Padding', '');

  return (
    <Box
      elevation={elevation}
      full={full}
      padding={padding !== '' ? padding : null}
    >
      <Content>
        <Typography variant={MaterialVariants.H2}>content1</Typography>
      </Content>
      <Content>
        <Typography variant={MaterialVariants.H2}>content2</Typography>
      </Content>
      <Content>
        <Typography variant={MaterialVariants.H2}>content3</Typography>
      </Content>
    </Box>
  );
};

BasicStory.story = {
  name: 'Basic',
};
