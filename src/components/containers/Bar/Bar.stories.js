import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { select, withKnobs } from '@storybook/addon-knobs';

import { ThemeConstants } from '../../../theming';
import Bar from './Bar';
import Typography, { MaterialVariants } from '../../Typography';

const StoryWrapper = styled.div``;

const StyledBar = styled(Bar)`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  padding: 32px;
`;

export default {
  title: 'Containers|Bar',
  component: Bar,
  decorators: [withKnobs],
};

export const BarStory = () => {
  const themeMode = select(
    'Theme Mode',
    Object.keys(ThemeConstants.mode.values),
    Object.keys(ThemeConstants.mode.values)[0]
  );
  const themeLayout = select(
    'Theme Layout',
    Object.keys(ThemeConstants.layout.values),
    Object.keys(ThemeConstants.layout.values)[0]
  );
  const theme = { mode: themeMode, layout: themeLayout };

  return (
    <ThemeProvider theme={theme}>
      <StoryWrapper>
        <StyledBar backgroundUrl="https://images.unsplash.com/photo-1497906539264-eb74442e37a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80">
          <Content>
            <Typography variant={MaterialVariants.H2}>bar content</Typography>
          </Content>
        </StyledBar>
        <StyledBar>
          <Content>
            <Typography variant={MaterialVariants.H2}>bar content</Typography>
          </Content>
        </StyledBar>
        <StyledBar backgroundUrl="https://images.unsplash.com/photo-1497906539264-eb74442e37a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80">
          <Content>
            <Typography variant={MaterialVariants.H2}>bar content</Typography>
          </Content>
        </StyledBar>
      </StoryWrapper>
    </ThemeProvider>
  );
};

BarStory.story = {
  name: 'with text',
};
