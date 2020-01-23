import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { css } from '../../../styling';
import Layout from '../Layout';

const propTypes = {
  children: PropTypes.node,
  filter: PropTypes.string,
  muted: PropTypes.bool,
  parentLayoutProps: PropTypes.shape(Layout.shape).isRequired,
  src: PropTypes.string.isRequired,
};

const defaultProps = {
  children: null,
  filter: null,
  muted: true,
};

const Container = styled(Layout)`
  position: relative;
`;

// eslint-disable-next-line react/prop-types
const MutableVideo = ({ className, src, type }) => (
  <div
    className={className}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: `
    <video
      autoplay
      loop
      muted
      playsinline
    >
      <source src="${src}" type=${type}>
    </video>
  `,
    }}
  />
);

const Video = styled(MutableVideo)`
  > video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -100;
    object-fit: cover;
    ${css('filter')}
  }
`;

const VideoBackground = ({ children, filter, parentLayoutProps, src }) => (
  <Container {...parentLayoutProps}>
    <Video filter={filter} src={src} type="video/mp4" />
    {children}
  </Container>
);

VideoBackground.propTypes = propTypes;
VideoBackground.defaultProps = defaultProps;

export default VideoBackground;
