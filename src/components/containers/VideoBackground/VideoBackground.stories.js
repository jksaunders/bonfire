import React from "react";
import styled from "styled-components";
import {
  text,
  withKnobs
} from "@storybook/addon-knobs";
import Layout from "../Layout";
import VideoBackground from "./VideoBackground";

export default {
  title: "Containers|Video Background",
  component: VideoBackground,
  decorators: [withKnobs]
};

const Content = styled.div`
  height: ${props => props.height};
  width: ${props => props.width};
`;

export const Basic = () => {
  const heightOfContent = text("Height of content", "200px");
  const widthOfContent = text("Width of content", "200px");
  const filter = text("Filter", "opacity(60%)");

  return (
    <VideoBackground
      filter={filter}
      parentLayoutProps={{ center: true, full: true }}
      src="https://upload.wikimedia.org/wikipedia/commons/6/60/Wikipedia_logo_puzzle_globe_spins_horizontally_and_vertically%2C_revealing_the_contents_of_all_of_its_puzzle_pieces_%284K_resolution%29_%28VP9%29.webm"
    >
      <Content height={heightOfContent} width={widthOfContent}>
        <Layout centered full background="hsla(0,0%,0%,.2)" height="max-content" width="max-content">
          Hi!
        </Layout>
      </Content>
    </VideoBackground>
  );
};