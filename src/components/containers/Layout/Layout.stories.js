import React from "react";
import styled from "styled-components";

import { storiesOf } from "@storybook/react";
import {
  boolean,
  select,
  text,
  withKnobs
} from "@storybook/addon-knobs";

import Layout from "./Layout";
import Typography from "../../Typography";

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
    const containerSize = text("Size of container", "500px");
    const flexWrapReverse = boolean("Reverse flex-wrap?", false);
    const orientation = select("Orientation", Object.values(Layout.CONSTANTS.ORIENTATION), Object.values(Layout.CONSTANTS.ORIENTATION)[0]);
    const horizontalAlignment = select("Horizontal Alignment", Layout.CONSTANTS.JUSTIFY_CONTENT_ALIGN_ITEMS_KEYS, "normal");
    const verticalAlignment = select("Vertical Alignment", Layout.CONSTANTS.JUSTIFY_CONTENT_ALIGN_ITEMS_KEYS, "normal");

    return (
      <StoryWrapper size={containerSize}>
        <Layout
          flexWrapReverse={flexWrapReverse}
          horizontalAlignment={horizontalAlignment}
          orientation={orientation}
          verticalAlignment={verticalAlignment}
        >
          <Content><Typography.H2>content1</Typography.H2></Content>
          <Content><Typography.H2>content2</Typography.H2></Content>
          <Content><Typography.H2>content3</Typography.H2></Content>
        </Layout>
      </StoryWrapper>
    );
  }).add("nested", () => {
    const containerSize = text("Size of container", "500px");
    const flexWrapReverse = boolean("Reverse flex-wrap?", false);
    const varyingFlexValues = boolean("Varying flex values?", false);
    const orientation = select("Orientation", Object.values(Layout.CONSTANTS.ORIENTATION), Object.values(Layout.CONSTANTS.ORIENTATION)[0]);
    const horizontalAlignment = select("Horizontal Alignment", Layout.CONSTANTS.JUSTIFY_CONTENT_ALIGN_ITEMS_KEYS, "normal");
    const verticalAlignment = select("Vertical Alignment", Layout.CONSTANTS.JUSTIFY_CONTENT_ALIGN_ITEMS_KEYS, "normal");
    const linesAlignment = select("Lines Alignment", Layout.CONSTANTS.JUSTIFY_CONTENT_ALIGN_ITEMS_KEYS, "stretch");

    return (
      <StoryWrapper size={containerSize}>
        <Layout
          childrenFlex={varyingFlexValues ? i => (i === 0 ? 0 : 1) : 1}
          childrenMargin={Layout.CONSTANTS.SPACING.LARGE}
          flexWrapReverse={flexWrapReverse}
          fullHeightWidth
          horizontalAlignment={horizontalAlignment}
          linesAlignment={linesAlignment}
          orientation={orientation}
          padding={Layout.CONSTANTS.SPACING.LARGE}
          verticalAlignment={verticalAlignment}
        >
          <Content><Typography.H2>content1</Typography.H2></Content>
          <Layout orientation={Layout.CONSTANTS.ORIENTATION.VERTICAL}>
            <Content><Typography.H2>content2</Typography.H2></Content>
            <Content><Typography.H2>content3</Typography.H2></Content>
          </Layout>
        </Layout>
      </StoryWrapper>
    );
  });