import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { css } from '../../../utils/styling';
import Layout from '../Layout';

const propTypes = {
  children: PropTypes.node,
  filter: PropTypes.string,
  parentLayoutProps: PropTypes.shape(Layout.shape).isRequired,
  src: PropTypes.string.isRequired
};

const defaultProps = {
  children: null,
  filter: null
};

const Container = styled(Layout)`
  position: relative;
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -100;
  object-fit: cover;
  ${css('filter')}
`;

const VideoBackground = ({
  children,
  filter,
  parentLayoutProps,
  src
}) => (
  <Container {...parentLayoutProps}>
    <Video filter={filter} autoPlay muted loop>
      <source src={src} type="video/mp4" />
    </Video>
    {children}
  </Container>
);

VideoBackground.propTypes = propTypes;
VideoBackground.defaultProps = defaultProps;

export default VideoBackground;