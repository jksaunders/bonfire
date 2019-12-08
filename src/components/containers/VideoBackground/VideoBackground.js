import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { css } from "../../../utils/styling";

const propTypes = {
  children: PropTypes.node,
  filter: PropTypes.string,
  src: PropTypes.string.isRequired
};

const defaultProps = {
  children: null,
  filter: null
};

const Container = styled.div`
  height: max-content;
  position: relative;
  width: max-content;
`;

const ChildrenWrapper = styled.div`
  background: hsla(0,0%,0%,.2);
  height: max-content;
  width: max-content;
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -100;
  object-fit: cover;
  ${css("filter")}
`;

const VideoBackground = ({
  children,
  filter,
  src
}) => (
  <Container>
    <Video filter={filter} autoPlay muted loop>
      <source src={src} type="video/mp4" />
    </Video>
    <ChildrenWrapper>
      {children}
    </ChildrenWrapper>
  </Container>
);

VideoBackground.propTypes = propTypes;
VideoBackground.defaultProps = defaultProps;

export default VideoBackground;