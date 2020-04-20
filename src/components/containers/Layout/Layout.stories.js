import React from 'react';
import styled from 'styled-components';

import { boolean, text, withKnobs } from '@storybook/addon-knobs';

import Layout from './Layout';
import Typography, {
  TypographyContext,
  MaterialVariants,
  TrelloVariants,
} from '../../Typography';

const StoryWrapper = styled.div`
  background-color: lightblue;
  height: ${(props) => props.size};
  width: ${(props) => props.size};
`;

const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
`;

export default {
  title: 'Containers|Layout',
  component: Layout,
  decorators: [withKnobs],
};

export const BasicStory = () => {
  const align = text('Alignment', '');
  const centered = boolean('Centered?', false);
  const containerSize = text('Size of container', '500px');
  const columns = text('Columns', '');
  const full = boolean('Full height and width?', false);
  const gap = text('Gap', '');
  const horizontalAlignment = text('Horizontal alignment', '');
  const rows = text('Rows', '');
  const padding = text('Padding', '');
  const verticalAlignment = text('Vertical alignment', '');

  return (
    <StoryWrapper size={containerSize}>
      <Layout
        align={align}
        centered={centered}
        columns={columns !== '' ? columns : null}
        full={full}
        gap={gap !== '' ? gap : null}
        horizontalAlignment={
          horizontalAlignment !== '' ? horizontalAlignment : null
        }
        padding={padding !== '' ? padding : null}
        rows={rows !== '' ? rows : null}
        verticalAlignment={verticalAlignment !== '' ? verticalAlignment : null}
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
      </Layout>
    </StoryWrapper>
  );
};

BasicStory.story = {
  name: 'Basic',
};

export const TrelloStory = () => (
  <Layout
    background="#0079bf"
    height="100vh"
    gap="5px"
    rows="max-content max-content auto"
    width="100vw"
  >
    <TypographyContext.Provider value={TrelloVariants.Body}>
      <Layout columns="max-content auto max-content" padding="5px">
        <Layout
          columns="max-content max-content minmax(max-content, 200px)"
          gap="5px"
        >
          {['home', 'boards', 'search'].map((t) => (
            <Layout
              key={t}
              background="hsla(0, 0%, 100%, 0.3)"
              borderRadius="3px"
              padding="5px"
              useTypography
            >
              {t}
            </Layout>
          ))}
        </Layout>
        <Layout centered useTypography>
          logo
        </Layout>
        <Layout useTypography>right buttons</Layout>
      </Layout>
      <Layout useTypography>board header</Layout>
      <Layout
        columns="272px"
        flow="column"
        gap="10px"
        padding="10px"
        overflowX="auto"
      >
        {[
          'To-Do',
          'Projects',
          'Bookmarks',
          'Recipes',
          'To-Do 2',
          'Projects 2',
          'Bookmarks 2',
          'Recipes 2',
        ].map((t) => (
          <Layout
            key={t}
            background="#ebecf0"
            borderRadius="3px"
            gap="10px"
            padding="10px"
            rows="max-content"
          >
            <Layout padding="10px" useTypography>
              {t}
            </Layout>
            {[1, 2, 3, 4, 5].map((n) => (
              <Layout key={n} background="#FFFFFF" padding="10px" useTypography>
                To do
                {n}
              </Layout>
            ))}
          </Layout>
        ))}
      </Layout>
    </TypographyContext.Provider>
  </Layout>
);

TrelloStory.story = {
  name: 'Trello',
};
