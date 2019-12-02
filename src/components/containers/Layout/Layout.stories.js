import React from "react";
import styled from "styled-components";

import { storiesOf } from "@storybook/react";
import {
  boolean,
  text,
  withKnobs
} from "@storybook/addon-knobs";

import Layout from "./Layout";
import Typography, { MaterialVariants, TrelloVariants } from "../../Typography";

const StoryWrapper = styled.div`
  background-color: lightblue;
  height: ${props => props.size};
  width: ${props => props.size};
`;

const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
`;

storiesOf("Layout", module)
  .addDecorator(withKnobs)
  .add("basic", () => {
    const centered = boolean("Centered?", false);
    const containerSize = text("Size of container", "500px");
    const columns = text("Columns", "");
    const gap = text("Gap", "");
    const horizontalAlignment = text("Horizontal alignment", "");
    const rows = text("Rows", "");
    const padding = text("Padding", "");
    const verticalAlignment = text("Vertical alignment", "");

    return (
      <StoryWrapper size={containerSize}>
        <Layout
          centered={centered}
          rows={rows !== "" ? rows : null}
          columns={columns !== "" ? columns : null}
          gap={gap !== "" ? gap : null}
          horizontalAlignment={horizontalAlignment !== "" ? horizontalAlignment : null}
          padding={padding !== "" ? padding : null}
          verticalAlignment={verticalAlignment !== "" ? verticalAlignment : null}
        >
          <Content><Typography variant={MaterialVariants.H2}>content1</Typography></Content>
          <Content><Typography variant={MaterialVariants.H2}>content2</Typography></Content>
          <Content><Typography variant={MaterialVariants.H2}>content3</Typography></Content>
        </Layout>
      </StoryWrapper>
    );
  })
  .add("Trello", () => (
    <Layout
      background="#0079bf"
      height="100vh"
      gap="5px"
      rows="max-content max-content auto"
      width="100vw"
    >
      <Layout columns="max-content auto max-content" padding="5px">
        <Layout columns="max-content max-content minmax(max-content, 200px)" gap="5px">
          { ["home", "boards", "search"].map(t => (
            <Layout key={t} background="hsla(0, 0%, 100%, 0.3)" borderRadius="3px" padding="5px">
              <Typography variant={TrelloVariants.Body}>
                {t}
              </Typography>
            </Layout>
          ))}
        </Layout>
        <Layout centered>logo</Layout>
        <Layout>right buttons</Layout>
      </Layout>
      <Layout>
        <Typography variant={TrelloVariants.Body}>
          board header
        </Typography>
      </Layout>
      <Layout columns="272px" flow="column" gap="10px" padding="10px" overflowX="auto">
        { ["To-Do", "Projects", "Bookmarks", "Recipes", "To-Do 2", "Projects 2", "Bookmarks 2", "Recipes 2"].map(t => (
          <Layout key={t} background="#ebecf0" borderRadius="3px" gap="10px" padding="10px" rows="max-content">
            <Layout padding="10px">
              <Typography variant={TrelloVariants.Body}>
                {t}
              </Typography>
            </Layout>
            { [1, 2, 3, 4, 5].map(n => (
              <Layout key={n} background="#FFFFFF" padding="10px">
                <Typography variant={TrelloVariants.Body}>
                  To do
                  {n}
                </Typography>
              </Layout>
            ))}
          </Layout>
        ))}
      </Layout>
    </Layout>
  ));