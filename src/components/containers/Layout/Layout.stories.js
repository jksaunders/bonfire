import React from "react";
import styled from "styled-components";

import { storiesOf } from "@storybook/react";
import {
  boolean,
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
          <Content><Typography.H2>content1</Typography.H2></Content>
          <Content><Typography.H2>content2</Typography.H2></Content>
          <Content><Typography.H2>content3</Typography.H2></Content>
        </Layout>
      </StoryWrapper>
    );
  });